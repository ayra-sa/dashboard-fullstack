import React, { FC, SelectHTMLAttributes } from 'react'

interface OptionProps {
    value: string
    name: string
}

interface DropdownProps extends SelectHTMLAttributes<HTMLSelectElement> {
    id: string
    label: string
    options: OptionProps[]
}

const Dropdown: FC<DropdownProps> = ({id, label, options, ...props}) => {
  return (
    <div className="flex flex-col gap-y-2">
      <label htmlFor={id}>{label}</label>
      <select {...props} id={id} className="border p-3 rounded-md">
        <option value="">Select</option>
        {options.map((option, id) => (
            <option value={option.value} key={id}>{option.name}</option>
        ))}
      </select>
    </div>
  )
}

export default Dropdown