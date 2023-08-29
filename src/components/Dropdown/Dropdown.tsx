import { useState } from 'react'
import styles from './Dropdown.module.css'
import { DropdownProps } from 'shared/types'

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
    <div className="dropdown">
      <label htmlFor="select-el" className={styles.combo_label}>
        {label}
      </label>
      <div className={styles.combo}>
        <select
          id="select-el"
          onChange={handleOnChange}
          value={selectedValue}
          className={styles.combo}
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
