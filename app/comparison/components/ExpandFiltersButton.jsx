'use client'

export default function ExpandFiltersButton({ isExpanded, setIsExpanded }) {
  return (
    <button 
    className='border-x-2 border-t-2 text-sm text-zinc-400 rounded-t-md px-2 mx-10 mt-2 text-center hover:bg-zinc-100 hover:bg-opacity-50' 
    onClick={() => setIsExpanded(!isExpanded)}>
      {isExpanded ? '▴ Colapse Filters ▴' : '▾ Expand Filters ▾'}
  </button>
  )
}
