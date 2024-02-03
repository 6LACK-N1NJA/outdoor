'use client'

import { useSearchParams, usePathname, useRouter } from "next/navigation";

export default function FilterSLot({ field, values, selectedValues }) {
    const { replace } = useRouter();
    const searchParams = useSearchParams();
    const pathname = usePathname();
    const params = new URLSearchParams(searchParams);
    const selectHandler = (fieldName) => (value) => (e) => {
        const { checked } = e.target;
        const currentValues = params.getAll(fieldName)[0]?.split(',') || [];
        if (checked) {
          currentValues.push(value)
          params.set(fieldName, currentValues);
        } else {
          const filteredValues = currentValues.filter((v) => v !== value);
          params.delete(fieldName);
          if (filteredValues.length > 0) {
            params.set(fieldName, filteredValues);
          }
        }
        replace(`${pathname}?${params.toString()}`);
      }
    return(
        <>
            {values.map((value) => {
                    const name = `name_${value}`;
                    return(
                        <span  key={`key_${name}`}>
                            <input className=" cursor-pointer" onChange={selectHandler(field)(value)} checked={selectedValues?.includes(value)} type="checkbox" id={name} />
                            <label className="cursor-pointer ml-2 mr-3" htmlFor={name}>{value}</label>
                        </span>
                    )
                })}
        </>
    )
}
