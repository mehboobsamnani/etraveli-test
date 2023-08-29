import { useMemo } from 'react'
import { IFilmDetail } from 'shared/types'
import Ratings from '../Ratings'
import Pill from 'components/Pill'

interface MovieDetailProps {
  episode?: IFilmDetail
}

const FilmDetails: React.FC<MovieDetailProps> = ({ episode }) => {
  const { title, opening_crawl, poster, director, ratings = [] } = episode || {}

  const totalScore = useMemo(() => {
    if (!ratings.length) {
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
    <div className="filmDetails">
      {!episode ? (
        <p>Select Episode from the list to view detail.</p>
      ) : (
        <>
          <h2>{title}</h2>
          <div>
            <img
              src={poster || 'https://placehold.co/151x230'}
              alt={title}
              className="poster"
            />
            <p>{opening_crawl}</p>
          </div>
          <p className="clear-both">Directed By: {director}</p>
          <div
            style={{ display: 'flex' }}
            data-testid="score"
            data-score={totalScore}
          >
            Average Rating: {totalScore && <Ratings score={totalScore} />}
          </div>
          <div className="meta-critics">
            {ratings.map(rating => (
              <Pill
                key={rating.Source}
                text={`${rating.Source}: ${rating.Value}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  )
}

export default FilmDetails
