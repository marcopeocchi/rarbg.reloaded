package torrent

import (
	"bytes"
	"context"
	"encoding/base64"
	"encoding/gob"
	"fmt"
	"time"

	"github.com/marcopeocchi/rarbgreloaded/internal/domain"
	"github.com/marcopeocchi/rarbgreloaded/pkg/categories"
	"github.com/redis/go-redis/v9"
	"go.uber.org/zap"
	"gorm.io/gorm"
)

const (
	ttl             = time.Minute * 30
	countCachingKey = "torrents-count"
)

type Repository struct {
	db     *gorm.DB
	rdb    *redis.Client
	logger *zap.SugaredLogger
}

func (r *Repository) FindByName(ctx context.Context, name string, page int, asc bool) (*[]domain.Torrent, int64, error) {
	var (
		all    = new([]domain.Torrent)
		offset = (page - 1) * domain.PAGE_SIZE
		count  int64
	)

	cachingKey := base64.StdEncoding.EncodeToString([]byte(
		fmt.Sprintf("%s-%d", name, page),
	))

	cachedCount, countErr := r.rdb.Get(ctx, countCachingKey).Int64()
	if countErr != nil {
		cached, err := r.rdb.Get(ctx, cachingKey).Bytes()
		if err == nil && len(cached) > 0 {
			err := gob.NewDecoder(bytes.NewReader(cached)).Decode(&all)
			if err != nil {
				r.logger.Errorw("gob decoding", "error", err)
			}
			return all, cachedCount, nil
		}
	}

	err := r.db.WithContext(ctx).
		Table("items").
		Where("title LIKE ?", "%"+name+"%").
		Count(&count).Error

	if err != nil {
		return nil, count, err
	}

	err = r.db.WithContext(ctx).
		Table("items").
		Where("title LIKE ?", "%"+name+"%").
		Limit(domain.PAGE_SIZE).
		Offset(offset).
		Order("id DESC").
		Find(all).Error

	if err != nil {
		return nil, count, err
	}

	var b bytes.Buffer
	err = gob.NewEncoder(&b).Encode(all)
	if err != nil {
		r.logger.Errorw("gob encoding", "error", err)
	}

	err = r.rdb.SetNX(ctx, cachingKey, b.Bytes(), ttl).Err()
	if err != nil {
		r.logger.Errorw("redis cache error", "error", err)
	}

	err = r.rdb.SetNX(ctx, countCachingKey, count, ttl).Err()
	if err != nil {
		r.logger.Errorw("redis cache error", "error", err)
	}

	return all, count, nil
}

func (r *Repository) FindByCategory(
	ctx context.Context,
	category categories.Category,
	page int,
	asc bool,
) (*[]domain.Torrent, int64, error) {
	return new([]domain.Torrent), 0, nil
}
