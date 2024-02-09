export default function KnowMore({ children }) {
    return (
        <details className="z-40">
            <summary className='hover:cursor-pointer text-xs text-zinc-700 list-none list-t pl-2 pt-3'>👉 <span className="rounded-2xl  p-0.5 hover:bg-amber-100 hover:bg-opacity-50s">Know more</span> 👇</summary>
            <div className='z-40 rounded-md p-4 absolute bg-lime-600 text-neutral-200'>
                {children.split('. ').map((string, index) => <p key={`know_${index}_${string.slice(0, 7)}`}>{string}</p>)}
            </div>
        </details>
    )
}
