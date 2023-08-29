import React from 'react'
import { render, screen } from '@testing-library/react'
import PageLoader from './PageLoader'

test('renders the PageLoader component', () => {
  render(<PageLoader />)
  const containerElement = screen.getByTestId('loader-container')
  const loaderElement = screen.getByTestId('loader')

  expect(containerElement).toBeInTheDocument()
  expect(loaderElement).toBeInTheDocument()
})
