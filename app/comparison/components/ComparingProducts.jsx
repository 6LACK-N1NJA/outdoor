'use client'

import ProductCard from './ProductCard'
import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'
import Spinner from '@component/Spinner'
import KnowMore from './KnowMore'

export default function ComparingProducts({ products, productCardConfig }) {
  const { selectedProducts } = useContext(SelectedProductsContext)
  if (!products[0]?.modelName) return <h3 className=' text-center text-lg mt-7 font-semibold'>Ooops... There is no product for such filtering criterias</h3>
  return (
    <section >
    <div className='flex flex-row align-middle mt-4 mb-5'>
        <h2 className='text-2xl'>Selected products</h2>
        <KnowMore>
            <p>Here is the text of measurements and charts </p> 
            <p>Here is the text of measurements and charts </p> 
            <p>Here is the text of measurements and charts </p> 
            <p>Here is the text of measurements and charts </p> 
            <p>Here is the text of measurements and charts </p> 
            <p>Here is the text of measurements and charts </p> 
        </KnowMore>
    </div>
    <div className="flex flex-col lg:flex-row align-middle justify-around">
       {selectedProducts.map((product) => (
           <ProductCard key={product.modelName} product={product} productCardConfig={productCardConfig} />
       ))}
    </div>
    </section>
  )
}
