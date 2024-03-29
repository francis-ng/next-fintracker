'use client'
import { Select, SelectItem } from "@nextui-org/react"

interface YearFilterProps {
  years: number[]
}

function YearFilter({years}: YearFilterProps) {
  return (
    <Select
      label='Filter year'
      className='max-w-xs'
    >
      { years.map((year) => <SelectItem key={year} textValue={`${year}`}>{year}</SelectItem>)}
    </Select>
  )
}

export default YearFilter;