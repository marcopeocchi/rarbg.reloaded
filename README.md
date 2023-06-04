# RarBG.reloaded

![](https://i.ibb.co/f9ngHbJ/localhost-3000.png)

## Requirements

- RarBG sqlite dump (magnet link publicly available) (I will not provide any link)
- Redis server
- Go 1.20

## Build

```sh
# backend
go build -o rarbg-api cmd/api/main.go

REDIS_ADDR=localhost \
REDIS_PASS=superpassword \
REDIS_DB=0 \
./rarbg-api

# frotnend
cd web
pnpm install
pnpm build
pnpm start
```

## Technologies used

**Backend**
- Go
- Gorm
- SQLite

**Frontend**
- Next.js
- TypeScript