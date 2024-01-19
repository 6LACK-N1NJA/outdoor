'use client'

import ProductCard from './ProductCard'
import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'
import Spinner from '@component/Spinner'
import KnowMore from './KnowMore'

export default function ComparingProducts({ products }) {
  const { selectedProducts } = useContext(SelectedProductsContext)
  if (!products[0].modelName) return <Spinner />
  return (
    <section >
    <div className='flex flex-row align-middle mt-4 mb-5'>
        <h2 className='text-2xl'>Selected products</h2>
        <KnowMore>
            Here is the text of measurements and charts 
        </KnowMore>
    </div>
    <div className="flex flex-row align-middle justify-around">
       {selectedProducts.map((product) => (
           <ProductCard key={product.modelName} product={product} />
       ))}
    </div>
    </section>
  )
}
