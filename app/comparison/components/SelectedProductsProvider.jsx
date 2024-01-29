'use client'
import { compact, uniq } from 'lodash';
import { createContext, useEffect, useState } from 'react'

export const SelectedProductsContext = createContext()

export default function SelectedProductsProvider({ rankedProductList, children }) {
  // This function will only work with fixed number (3) of selected product
  const getTopOfProducts = (rankedProductList) => (compact(
    [rankedProductList[0]?.products[0], rankedProductList[1]?.products[0], rankedProductList[2]?.products[0]]
    .filter((p, i, arr) => p?.modelName !== arr[i + 1]?.modelName && p?.modelName !== arr[i + 2]?.modelName)
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
