import React from 'react'
import FilterSLot from './FilterSlot'
import KnowMore from './KnowMore'
import Link from 'next/link'


export default function ExpandedFilters({ comparisonsList, slug, filters, searchParams, emoTitle, description }) {
  const filterKeys = Object.keys(filters);
  return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className='mb-5 text-2xl'>{emoTitle}</h1>
            <KnowMore>{description}</KnowMore>
        </div>
        <div className='flex flex-col lg:flex-row justify-around'>
                <div className='jalousie-content-opacity '>
                  <h4 className='text-lg font-semibold'>Other comparisons</h4>
                  {comparisonsList.filter((c) => c.slug !== slug).map(({ title, slug }) => <p className='hover:text-orange-500 hover:underline' key={`${slug}_filter`}>
                    <Link href={`/gear-comparison/${slug}`} title={title}>
                        {title}
                    </Link>
                  </p>)}
                </div>
                
            {filterKeys.map((key) => 
            <div   key={`filt_${key}`}  className="max-h-36 flex flex-col">
            <h4 className="font-semibold text-lg">{filters[key].title}</h4>
            <div className=" border-slate-100 border-spacing-1 rounded-md p-2 border-solid border-2 overflow-y-auto flex flex-col">
            <FilterSLot
                field={key}
                values={filters[key].filterValues} 
                selectedValues={searchParams[key] || []}
            />
            </div>    
        </div>
              )}
        </div>
    </>
  )
}
