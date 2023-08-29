import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import SearchFilter from './SearchFilter'

describe('SearchFilter Component', () => {
  it('should render with provided search term', () => {
    const searchTerm = 'Star Wars'
    const setSearchTerm = jest.fn()

    render(
      <SearchFilter searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
    )

    const inputElement = screen.getByPlaceholderText(
      'Search by title'
    ) as HTMLInputElement
    expect(inputElement).toBeInTheDocument()
    expect(inputElement.value).toBe(searchTerm)
  })

  it('should call setSearchTerm on input change', () => {
    const setSearchTerm = jest.fn()

    render(<SearchFilter searchTerm="" setSearchTerm={setSearchTerm} />)

    const inputElement = screen.getByPlaceholderText('Search by title')
    const newSearchTerm = 'Harry Potter'

    fireEvent.change(inputElement, { target: { value: newSearchTerm } })

    expect(setSearchTerm).toHaveBeenCalledTimes(1)
    expect(setSearchTerm).toHaveBeenCalledWith(newSearchTerm)
  })
})
