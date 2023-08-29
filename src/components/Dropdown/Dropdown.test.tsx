import React from 'react'
import { render, fireEvent, screen } from '@testing-library/react'
import Dropdown from './Dropdown'

const mockOptions = [
  { value: 'option1', label: 'Option 1' },
  { value: 'option2', label: 'Option 2' },
  { value: 'option3', label: 'Option 3' }
]

test('renders label and options correctly', () => {
  render(
    <Dropdown
      label="Select an option"
      options={mockOptions}
      onChange={() => {}}
      currentValue="option2"
    />
  )

  const labelElement = screen.getByLabelText('Select an option')
  expect(labelElement).toBeInTheDocument()

  mockOptions.forEach(option => {
    const optionElement = screen.getByText(option.label)
    expect(optionElement).toBeInTheDocument()
  })
})

test('handles onChange event correctly', () => {
  const mockOnChange = jest.fn()
  render(
    <Dropdown
      label="Select an option"
      options={mockOptions}
      onChange={mockOnChange}
      currentValue="option2"
    />
  )

  const selectElement = screen.getByLabelText('Select an option')
  fireEvent.change(selectElement, { target: { value: 'option3' } })

  expect(mockOnChange).toHaveBeenCalledWith('option3')
})
