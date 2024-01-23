'use client'
// <figure>//
import Image from 'next/image'
import Link from 'next/link'
import NeedleChart from './NeedleChart'
import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'

export default function ProductCard({ product, productCardConfig }) {
    const { setSelecetedProducts, selectedProducts } = useContext(SelectedProductsContext)
    const closeButtonClickHandler = () => {
        if (selectedProducts.length <= 1) return;
        setSelecetedProducts(selectedProducts.filter(({ modelName }) => modelName !== product.modelName ))
    }
  return (
    <article className="relative bg-stone-100 bg-opacity-0 rounded-3xl border-2 border-solid border-opacity-30 border-gray-300 p-6 shadow-xl flex flex-col flex-growth justify-around" >
       <figure className=' overflow-hidden'>
        <Image className='object-contain z-0' src={product.image} fill alt={product.modelName} />
      </figure>
      <div className='flex flex-row'>
      <div className='rounded-lg z-10 mix-blend-lighten bg-white bg-opacity-0 hover:bg-opacity-80 cursor-default hover:mix-blend-normal'>
      <h3 className='text-lg'>{`${product.brand} - ${product.modelName}`}</h3>
      <figcaption className=" h-30 flex align-middle  text-sm  text-zinc-70">
        <div className="pt-4">
            <p><b>{`Estimated Price: ${product.priceUsd}$`}</b></p>
          <span>{`Rating: ${product.rating} | `}</span>
          <span>
            {`Rating Ratio: ${Math.ceil((product.ratingRatio * 100) / product.max?.ratingRatio)}`}
          </span>
          {productCardConfig?.customParameters.map(({ fieldName, title, isBoolean }) => {
            if (isBoolean && product[fieldName] === 'TRUE') {
              return <p key={`params_${title}`}>{title}</p>
            } else if (!isBoolean && product[fieldName] && product[fieldName] !== 'null') {
              return <p key={`params_${title}`}>{`${title}: ${product[fieldName]}`}</p>
            } else {
              return null;
            }
          })}
        </div>
      </figcaption>
      <figure className="flex text-sm text-center">
        {productCardConfig.customPieCharts.map(({ fieldName, title }) => (
          <NeedleChart
            key={`pie_${fieldName}`}
            value={product[fieldName] * 180 / product.max[fieldName]}
            title={title}
          />
        ))}
      </figure>
      </div>
      </div>
      <button className="z-10 self-center w-2/3 h-12 rounded-xl border-2 border-solid border-slate-800 bg-lime-500 bg-opacity-60 p-2 hover:cursor-pointer hover:bg-orange-600 hover:bg-opacity-90">
        <Link target="_blank" href={product.link}>
          <b>{`${product.emoji} Check on Amazon ${product.emoji}`}</b>
        </Link>
      </button>
      <button onClick={closeButtonClickHandler} name='close' className='hover:text-slate-400 text-lg absolute top-5 right-8 z-20'>x</button>
    </article>
  )
}
