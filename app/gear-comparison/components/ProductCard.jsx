'use client'
// <figure>//
import Image from 'next/image'
import Link from 'next/link'
import dynamic from 'next/dynamic'
import { useContext } from 'react'
import { SelectedProductsContext } from './SelectedProductsProvider'

export default function ProductCard({ product, productCardConfig }) {
    const { setSelecetedProducts, selectedProducts } = useContext(SelectedProductsContext)
    const closeButtonClickHandler = () => {
        if (selectedProducts.length <= 1) return;
        setSelecetedProducts(selectedProducts.filter(({ modelName }) => modelName !== product.modelName ))
    }
    const NeedleChart = dynamic(() => import('./NeedleChart'), { ssr: false });
  return (
    <article className="relative mb-2 bg-stone-100 bg-opacity-0 rounded-3xl border-2 border-solid border-opacity-30 border-gray-300 p-6 shadow-xl flex flex-col flex-growth justify-around" >
      <div className='relative h-36'>
      <div className='absolute h-80  w-full -top-24 left-5'>
      <figure className='relative h-80 w-full overflow-hidden'>
        <Image className='object-contain z-0 scale-50 hover:scale-100 hover:z-20' src={product.image} fill alt={product.modelName} />
      </figure>
      </div>
      </div>
      <h3 className='text-lg'>{`${product.brand} - ${product.modelName}`}</h3>
      <div className='flex flex-row'>
        <div className='rounded-lg z-10  bg-white bg-opacity-0 hover:bg-opacity-80 cursor-default hover:mix-blend-normal'>
          <figcaption className=" h-30 flex align-middle  text-sm  text-zinc-70">
             <div className="pt-4">
              <p><b>{`Estimated Price: ${product.priceUsd}$`}</b></p>
              <span>
                <span className='text-zinc-600'>{`Rating: `}</span>
                {`${product.rating} | `}
              </span>
              <span>
                <span className='text-zinc-600'>{`Rating Ratio: `}</span>
                {`${Math.ceil((product.ratingRatio * 100) / product.max?.ratingRatio)}`}
              </span>
              {productCardConfig?.customParameters.map(({ fieldName, title, isBoolean }) => {
                if (isBoolean && product[fieldName] === 'TRUE') {
                  return <span key={`params_${title}`}>{title}</span>
                } else if (!isBoolean && product[fieldName] && product[fieldName] !== 'null') {
                  return <p key={`params_${title}`}>
                    <span className=' text-zinc-600'>{`${title}: `}</span>
                    {`${product[fieldName]}`}
                    </p>
                } else {
                  return null;
                }
              })}
            </div>
         </figcaption>
     
      </div>
      <figure className=" w-32 text-sm text-center">
        {productCardConfig.customPieCharts.map(({ fieldName, title }) => (
          <NeedleChart
            key={`pie_${fieldName}`}
            value={product[fieldName] * 180 / product.max[fieldName]}
            title={title}
          />
        ))}
      </figure>
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
