'use client'

import { createContext, useState } from 'react'

export const SelectedProductsContext = createContext()

export default function SelectedProductsProvider({ initialState, children }) {
  const [selectedProducts, setSelecetedProducts] = useState(initialState)
  return (
    <SelectedProductsContext.Provider value={{ selectedProducts, setSelecetedProducts }}>
      {children}
    </SelectedProductsContext.Provider>
  )
}
