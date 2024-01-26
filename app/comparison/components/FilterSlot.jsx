export default function FilterSLot({ title, values, selectHandler, selectedValues }) {
    console.log(selectedValues)
    return(
        <div className=" bg-amber-200  overflow-y-auto max-h-32 flex flex-col">
            <h4>{title}</h4>
            {values.map((value) => {
                const name = `name_${value}`;
                return(
                <span key={`key_${name}`}>
                    <input onChange={selectHandler(value)} checked={selectedValues?.includes(value)} type="checkbox" id={name} />
                    <label htmlFor={name}>{value}</label>
                </span>
                )
            })}
        </div>
    )
}
