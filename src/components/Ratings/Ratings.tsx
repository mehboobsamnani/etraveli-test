import full from 'assets/images/full.png'
import half from 'assets/images/half.png'

const Ratings = ({ score }: { score: number }) => {
  const fixedScore = parseFloat(score.toFixed(1))
  const fullStars = Math.floor(fixedScore)
  const hasHalfStar = score - fullStars >= 0.5

  return (
    <div className="rating">
      {[...Array(fullStars)].map((_, index) => (
        <img key={index} src={full} alt="Full Star" />
      ))}
      {hasHalfStar && <img src={half} alt="Half Star" />}
    </div>
  )
}

export default Ratings
