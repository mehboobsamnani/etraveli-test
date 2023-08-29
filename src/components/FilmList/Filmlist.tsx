import { IFilmDetail } from 'shared/types'

interface FilmListProps {
  films: IFilmDetail[]
  onClick: (film: IFilmDetail) => void
  selectedFilm?: IFilmDetail
}

const FilmList: React.FC<FilmListProps> = ({
  films,
  onClick,
  selectedFilm
}) => {
  return (
    <div className="filmList" data-testid="filmList">
      {!!films.length &&
        films.map((film: IFilmDetail) => (
          <div
            className={
              selectedFilm?.episode_id === film.episode_id ? 'active' : ''
            }
            onClick={() => onClick(film)}
            key={film.title}
            data-testid="film"
          >
            <span>Episode {film.episode_id}</span>
            <span>{film.title}</span>
            <span>{film.release_date}</span>
          </div>
        ))}
    </div>
  )
}

export default FilmList
