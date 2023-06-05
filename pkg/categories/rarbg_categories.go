package categories

type Category int

const (
	Movies Category = iota
	XXX
	TV
	Games
	Music
	Software
)

func (c Category) String() string {
	switch c {
	case Movies:
		return "movies"
	case XXX:
		return "xxx"
	case TV:
		return "tv"
	case Music:
		return "music"
	case Software:
		return "software"
	case Games:
		return "games"
	}
	return ""
}
