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
      className={`${index === 0 && 'font-bold'} ${
        isSelected ? ' bg-lime-100 hover:bg-opacity-50' : 'hover:bg-orange-200'
      } border-b-2 border-gray-100 py-4 px-6 hover:cursor-pointer`}
      onClick={clickHandler}
    >
      {`${index + 1}. ${product.brand} - ${product.modelName}`}
    </li>
  )
}
