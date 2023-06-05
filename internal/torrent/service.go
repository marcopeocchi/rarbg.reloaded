package torrent

import (
	"context"

	"github.com/marcopeocchi/rarbgreloaded/internal/domain"
)

type Service struct {
	repository domain.TorrentRepository
}

func (s *Service) FindByName(ctx context.Context, name string, page int, asc bool) (domain.TorrentResponse, error) {
	torrents, count, err := s.repository.FindByName(ctx, name, page, asc)
	if err != nil {
		return domain.TorrentResponse{}, err
	}

	return domain.TorrentResponse{
		Data:     torrents,
		Page:     page,
		Pages:    int(float64(count/domain.PAGE_SIZE)) + 1,
		PageSize: domain.PAGE_SIZE,
	}, err
}

func (s *Service) FindByCategory(ctx context.Context, category string, page int, asc bool) (domain.TorrentResponse, error) {
	torrents, count, err := s.repository.FindByCategory(ctx, category, page, asc)
	return domain.TorrentResponse{
		Data:     torrents,
		Page:     page,
		Pages:    int(float64(count/domain.PAGE_SIZE)) + 1,
		PageSize: domain.PAGE_SIZE,
	}, err
}
