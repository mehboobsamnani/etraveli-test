import React from 'react'
import { render, screen } from '@testing-library/react'
import Pill from './Pill'

describe('Ratings', () => {
  it('renders the provided text', () => {
    render(<Pill text="Test Text" />)
    const pillElement = screen.getByText('Test Text')
    expect(pillElement).toBeInTheDocument()
  })
})
