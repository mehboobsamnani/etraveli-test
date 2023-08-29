import { useMemo } from 'react'
import { IFilmDetail } from 'shared/types'
import { romanize } from 'shared/helpers'
import Ratings from '../Ratings'
import Pill from 'components/Pill'
import styles from "./FilmDetails.module.css"

interface MetaDetails {
  ratings: Rating[]
  poster: string
}
interface Rating {
  Source: string
  Value: string
}
interface MovieDetailProps {
  film?: IFilmDetail
  metaDetails: MetaDetails
}

const FilmDetails: React.FC<MovieDetailProps> = ({ film , metaDetails  }) => {
  const { title, opening_crawl,  director  } = film || {}

  const { ratings = [], poster} = metaDetails

  const totalScore = useMemo(() => {
    if (ratings && !ratings.length) {
      return 0
    }

    const score = ratings.reduce((sum, { Value: rating = '' }) => {
      if (rating.includes('%') || rating.includes('/100')) {
        sum += parseFloat(rating) / 10
      } else if (rating.includes('/10')) {
        sum += parseFloat(rating)
      }
      return sum
    }, 0)

    return score / ratings.length
  }, [ratings])

  return (
    <div className={styles.filmDetails} >
      {!film ? (
        <p>Select Film from the list to view detail.</p>
      ) : (
        <div data-testid="filmDetail">
          <h2>{`Episode ${romanize(film?.episode_id)}`} - {title}</h2>
          <div>
            <img
              src={poster || 'https://placehold.co/151x230'}
              alt={title}
              className={styles.poster}
            />
            <p>{opening_crawl}</p>
          </div>
          <p className="clear-both">Directed By: {director}</p>
          { !!totalScore &&  
          <div
            style={{ display: 'flex' }}
            data-testid="score"
            data-score={totalScore}
          >
            Average Rating: {<Ratings score={totalScore} />}
          </div> }
          <div className={styles.meta_critics}>
            {ratings.map(rating => (
              <Pill
                key={rating.Source}
                text={`${rating.Source}: ${rating.Value}`}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  )
}

export default FilmDetails
