package main

import (
	"context"
	"fmt"
	"net/http"
	"os"
	"os/signal"
	"strconv"
	"syscall"
	"time"

	"github.com/glebarez/sqlite"
	"github.com/go-chi/chi/v5"
	"github.com/go-chi/chi/v5/middleware"
	"github.com/marcopeocchi/rarbgreloaded/internal/torrent"
	"github.com/marcopeocchi/rarbgreloaded/pkg/middlewares"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

func main() {
	logger, err := zap.NewProduction()
	if err != nil {
		panic(err)
	}

	db, err := gorm.Open(sqlite.Open("rarbg.sqlite"), &gorm.Config{})
	if err != nil {
		logger.Fatal("error", zap.Error(err))
	}

	redisDBIndex, err := strconv.Atoi(os.Getenv("REDIS_DB"))
	if err != nil {
		logger.Fatal("error", zap.Error(err))
	}

	rdb := redis.NewClient(&redis.Options{
		Addr:     os.Getenv("REDIS_ADDR"),
		Password: os.Getenv("REDIS_PASS"),
		DB:       redisDBIndex,
	})

	tc := torrent.Container(db, rdb, logger.Sugar())

	r := chi.NewRouter()
	r.Use(middleware.Logger)

	r.Route("/api", func(r chi.Router) {
		r.Use(middlewares.CORS)
		r.Get("/name/{name}", tc.FindByName())
	})

	server := &http.Server{
		Addr:    ":8080",
		Handler: r,
	}

	go gracefulShutdown(server, rdb, logger)
	server.ListenAndServe()
}

func gracefulShutdown(s *http.Server, rdb *redis.Client, logger *zap.Logger) {
	ctx, stop := signal.NotifyContext(context.Background(),
		os.Interrupt,
		syscall.SIGTERM,
		syscall.SIGQUIT,
	)

	go func() {
		<-ctx.Done()
		fmt.Println()
		fmt.Println("shutdown signal received")

		ctxTimeout, cancel := context.WithTimeout(
			context.Background(),
			5*time.Second,
		)

		defer func() {
			logger.Sync()
			rdb.Close()
			stop()
			cancel()
			fmt.Println("shutdown completed")
		}()

		s.Shutdown(ctxTimeout)
	}()
}
