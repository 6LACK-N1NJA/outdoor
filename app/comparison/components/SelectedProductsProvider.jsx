'use client'
import { compact, uniq } from 'lodash';
import { createContext, useEffect, useState } from 'react'

export const SelectedProductsContext = createContext()

export default function SelectedProductsProvider({ rankedProductList, children }) {
  const getTopOfProducts = (rankedProductList) => (compact(
    [rankedProductList[0]?.products[0], rankedProductList[1]?.products[0], rankedProductList[2]?.products[0]]
  ));
  const [selectedProducts, setSelecetedProducts] = useState(getTopOfProducts(rankedProductList));
  useEffect(() => {
    setSelecetedProducts(getTopOfProducts(rankedProductList))
  }, [rankedProductList]);
  return (
    <SelectedProductsContext.Provider value={{ selectedProducts, setSelecetedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  )
}
