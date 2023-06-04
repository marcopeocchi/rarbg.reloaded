package torrent

import (
	"sync"

	"github.com/marcopeocchi/rarbgreloaded/internal/domain"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

var (
	repository *Repository
	service    *Service
	handler    *Handler

	repositoryOnce sync.Once
	serviceOnce    sync.Once
	handlerOnce    sync.Once
)

func ProvideRepository(db *gorm.DB, rdb *redis.Client, logger *zap.SugaredLogger) *Repository {
	repositoryOnce.Do(func() {
		repository = &Repository{
			db:     db,
			rdb:    rdb,
			logger: logger,
		}
	})
	return repository
}

func ProvideService(repo domain.TorrentRepository) *Service {
	serviceOnce.Do(func() {
		service = &Service{
			repository: repo,
		}
	})
	return service
}

func ProvideHandler(svc domain.TorrentService) *Handler {
	handlerOnce.Do(func() {
		handler = &Handler{
			service: svc,
		}
	})
	return handler
}
