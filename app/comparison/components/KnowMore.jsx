export default function KnowMore({ children }) {
    return (
        <details className=" z-20">
            <summary className='hover:cursor-pointer text-xs text-zinc-700 list-none list-t pl-2 pt-3'>👉 <span className="rounded-2xl  p-0.5 hover:bg-amber-100 hover:bg-opacity-50s">Know more</span> 👇</summary>
            <p className='rounded-sm p-4 absolute bg-slate-800 text-neutral-200'>{children}</p>
        </details>
    )
}
