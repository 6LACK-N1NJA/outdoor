import React from 'react'
import KnowMore from './KnowMore'

export default function CollapsedFilters({ emoTitle, mainText, description }) {
  return (
    <>
        <div className='flex flex-row justify-center'>
            <h1 className=' text-2xl'>{emoTitle}</h1>
            <KnowMore>{description}</KnowMore>
        </div>
        <p className=' text-slate-600 text-sm py-2 px-3'>
            {mainText}
        </p>
    </>
  )
}
