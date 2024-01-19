'use client'
// <figure>//
import Image from 'next/image'
import Link from 'next/link'
import NeedleChart from './NeedleChart'
import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'

export default function ProductCard({ product }) {
    const { setSelecetedProducts, selectedProducts } = useContext(SelectedProductsContext)
    const closeButtonClickHandler = () => {
        if (selectedProducts.length <= 1) return;
        setSelecetedProducts(selectedProducts.filter(({ modelName }) => modelName !== product.modelName ))
    }
  return (
    <article className="relative bg-stone-100 bg-opacity-0 rounded-3xl border-2 border-solid border-opacity-30 border-gray-300 p-6 shadow-xl bg-blend-lighten hover:bg-blend-darken flex flex-col flex-growth justify-around" >
      <h3 className=' text-lg'>{`${product.brand} - ${product.modelName}`}</h3>
      <figure className="h-30 flex align-middle  text-sm  text-zinc-700">
        <div className="pt-4">
            <p><b>{`Estimated Price: ${product.priceUsd}$`}</b></p>
          <span>{`Rating: ${product.rating} | `}</span>
          <span>{`Rating Ratio: ${Math.ceil(
            (product.ratingRatio * 100) / product.max?.ratio
          )}`}</span>
          <p>{`Special features: ${product.specialFeaturesNumber} | Screen: ${product.screenSizeInches}"`}</p>
          <p>{`Map type: ${product.mapType}`}</p>
          <p>{`Mounting type: ${product.mountingType}`}</p>
        </div>
        <Image src={product.image} alt={product.modelName} width={90} height={90} />
      </figure>
      <figure className="flex text-sm text-center ">
        <NeedleChart
          value={(product.ratingRatio * 180) / product.max?.ratio}
          title={'Rating Ratio'}
        />
        <NeedleChart
          value={(product.screenSizeInches * 180) / product.max?.screen}
          title={'Scren size'}
        />
        <NeedleChart
          value={(product.specialFeaturesNumber * 180) / product.max?.features}
          title={'Features'}
        />
      </figure>
      <button className="self-center  w-2/3 h-12 rounded-xl border-2 border-solid border-slate-800 bg-lime-500 bg-opacity-60 p-2 hover:cursor-pointer hover:bg-orange-600 hover:bg-opacity-80">
        <Link target="_blank" href={product.link}>
          <b>{`${product.emoji} Check on Amazon ${product.emoji}`}</b>
        </Link>
      </button>
      <button onClick={closeButtonClickHandler} name='close' className='hover:text-slate-400 text-lg absolute top-5 right-8'>x</button>
    </article>
  )
}
