'use client'

import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'

export default function RankingRow({ product, index, classString }) {
  const { setSelecetedProducts, selectedProducts } = useContext(SelectedProductsContext)
  const isSelected = !!selectedProducts.find((p) => p.modelName === product.modelName)
  const clickHandler = () => {
    if (!isSelected) setSelecetedProducts([product, ...selectedProducts.slice(0, 2)])
  }
  return (
    <li
      className={`${
        isSelected ? ' bg-lime-100 ' : 'hover:bg-pink-100'
      } border-b-2 p-4 hover:cursor-pointer`}
      onClick={clickHandler}
    >
      {`${index + 1}. ${product.brand} - ${product.modelName}`}
    </li>
  )
}
