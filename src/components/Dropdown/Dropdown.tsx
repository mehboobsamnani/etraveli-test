import { useState } from 'react'
import { DropdownProps } from 'shared/types'
import styles from "./Dropdown.module.css"

const Dropdown = ({
  label,
  options,
  onChange,
  currentValue
}: DropdownProps) => {
  const [selectedValue, setSelectedValue] = useState<string>(currentValue)

  const handleOnChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const { value } = e.target
    setSelectedValue(value)
    onChange(value)
  }
  return (
    <div className={styles.dropdown}>
      <label htmlFor="select-el" >
        {label}
      </label>
      <div >
        <select
          id="select-el"
          onChange={handleOnChange}
          value={selectedValue}
        >
          {options.map(({ value, label }) => (
            <option value={value} key={value}>
              {label}
            </option>
          ))}
        </select>
      </div>
    </div>
  )
}

export default Dropdown
