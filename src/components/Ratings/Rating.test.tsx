import { render, screen } from '@testing-library/react'
import Ratings from './Ratings'

describe('Ratings', () => {
  it('renders correct number of full stars', () => {
    render(<Ratings score={4.8} />)
    const fullStars = screen.getAllByAltText('Full Star')
    expect(fullStars).toHaveLength(4) // 4 full stars for score 4.8
  })

  it('renders half star for score with decimal .5', () => {
    render(<Ratings score={3.5} />)
    const halfStar = screen.getByAltText('Half Star')
    expect(halfStar).toBeInTheDocument()
  })

  it('does not render half star for score without decimal .5', () => {
    ;<Ratings score={3.3} />
    const halfStar = screen.queryByAltText('Half Star')
    expect(halfStar).toBeNull()
  })
})
