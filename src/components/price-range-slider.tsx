"use client"

import React, { useState } from "react"
import * as Slider from "@radix-ui/react-slider"

interface PriceRangeSliderProps {
  min: number
  max: number
  onChange: (values: [number, number]) => void
}

export function PriceRangeSlider({ min, max, onChange }: PriceRangeSliderProps) {
  const [values, setValues] = useState<[number, number]>([min, max])

  const handleChange = (newValues: number[]) => {
    setValues(newValues as [number, number])
    onChange(newValues as [number, number])
  }

  return (
    <div className="w-full max-w-sm">
      <Slider.Root
        className="relative flex items-center select-none touch-none w-full h-5"
        value={values}
        onValueChange={handleChange}
        min={min}
        max={max}
        step={1}
      >
        <Slider.Track className="bg-slate-200 relative grow rounded-full h-[3px]">
          <Slider.Range className="absolute bg-primary rounded-full h-full" />
        </Slider.Track>
        <Slider.Thumb
          className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Min price"
        />
        <Slider.Thumb
          className="block w-5 h-5 bg-primary shadow-md rounded-full hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-primary"
          aria-label="Max price"
        />
      </Slider.Root>
      <div className="flex justify-between mt-2">
        <span>${values[0]}</span>
        <span>${values[1]}</span>
      </div>
    </div>
  )
}

