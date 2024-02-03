'use client'
import React, { useState, useEffect } from 'react'
import { useRouter, usePathname, useSearchParams } from 'next/navigation'

export default function Filters({ selectedFields, expandedFilters, collapsedFilters }) {
  const { replace } = useRouter();
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const params = new URLSearchParams(searchParams);

  useEffect(() => {
    if (selectedFields.length > 0) {
      selectedFields.forEach(({ fieldName, selectedValue }) => {
        const currentValues = params.getAll(fieldName);
        currentValues.push(selectedValue);
        params.set(fieldName, currentValues);
      })
      replace(`${pathname}?${params.toString()}`);
    }
  }, [])
  const [isExpanded, setIsExpanded] = useState(false)
  const ExpandedButton = () =>
  <div className='flex flex-col justify-end items-center'>
            <button 
    className='border-x-2 border-t-2 text-sm text-zinc-600 rounded-t-md px-2 mx-10 mt-2 text-center hover:bg-zinc-100 hover:bg-opacity-50' 
    onClick={() => setIsExpanded(!isExpanded)}>
      {isExpanded ? '▴ Colapse Filters ▴' : '▾ Expand Filters ▾'}
  </button>
        </div>
  ;
  return (
    <>
      <section className={`${!isExpanded ? 'hidden' : ''} z-40 rounded-b-lg border-2 sticky bg-opacity-10 border-t-white bg-stone-200 shadow-lg h-100`}>
       {expandedFilters}
       <ExpandedButton/>
      </section>
      <section
      className={`${isExpanded ? 'hidden' : ''} z-40 rounded-b-lg border-2 sticky bg-opacity-10 border-t-white bg-stone-100 shadow-sm`}
    >
         {collapsedFilters}
        <ExpandedButton/>
      </section>
    </>
  )
}
