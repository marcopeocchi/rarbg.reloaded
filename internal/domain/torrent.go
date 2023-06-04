package domain

import (
	"context"
	"net/http"

	"github.com/marcopeocchi/rarbgreloaded/pkg/categories"
)

const (
	PAGE_SIZE = 50
)

type Torrent struct {
	Id            uint   `json:"id"`
	Hash          string `json:"hash"`
	Title         string `json:"title"`
	Size          int64  `json:"size"`
	Category      string `json:"category" gorm:"column:cat"`
	CreatedAt     string `json:"created_at" gorm:"column:dt"`
	ImdbId        string `json:"ImbdId" gorm:"column:imdb"`
	RarbgId       string `json:"rarbg_id" gorm:"column:ext_id"`
	ThumbnailURL  string `json:"thumbnail_url"`
	ScreenshotURL string `json:"screenshot_url"`
	NFO           string `json:"nfo"`
}

type TorrentResponse struct {
	Data     *[]Torrent `json:"data"`
	Page     int        `json:"page"`
	Pages    int        `json:"pages"`
	PageSize int        `json:"page_size"`
}

type TorrentRepository interface {
	FindByName(ctx context.Context, name string, page int, asc bool) (*[]Torrent, int64, error)
	FindByCategory(ctx context.Context, category categories.Category, page int, asc bool) (*[]Torrent, int64, error)
}

type TorrentService interface {
	FindByName(ctx context.Context, name string, page int, asc bool) (TorrentResponse, error)
	FindByCategory(ctx context.Context, category categories.Category, page int, asc bool) (TorrentResponse, error)
}

type TorrentHandler interface {
	FindByName() http.HandlerFunc
	FindByCategory() http.HandlerFunc
}
