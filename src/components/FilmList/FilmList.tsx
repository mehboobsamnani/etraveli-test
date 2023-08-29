import { IFilmDetail } from 'shared/types'
import styles from "./FilmList.module.css"

interface FilmListProps {
  films: IFilmDetail[]
  onClick: (film: IFilmDetail) => void
  selectedFilm: IFilmDetail | null
}

const FilmList: React.FC<FilmListProps> = ({
  films,
  onClick,
  selectedFilm
}) => {


  return (
    <div className={styles.filmList} data-testid="filmList">
      {!!films.length &&
        films.map((film: IFilmDetail) => (
          <div
            className={
              `${styles.film} ${selectedFilm?.episode_id === film.episode_id ? styles.active : ''}`
            }
            onClick={() => onClick(film)}
            key={film.title}
            data-testid="film"
          >
            <span>Episode {film.episode_id}</span>
            <span>{film.title}</span>
            <span className={styles.release_date}>{film.release_date}</span>
          </div>
        ))}
    </div>
  )
}

export default FilmList
