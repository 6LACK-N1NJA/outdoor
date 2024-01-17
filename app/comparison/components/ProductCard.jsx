'use client'
// <figure>//
import Image from 'next/image'
import Link from 'next/link'
import NeedleChart from './NeedleChart'

export default function ProductCard({ product }) {
  return (
    <article className=" bg-stone-100 bg-opacity-0 my-4 mr-4 rounded-3xl border-2 border-solid border-slate-800 p-5 shadow-xl" >
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
        {console.log(product.max?.ratio)}
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
      <button className="h-12 rounded-xl border-2 border-solid border-slate-800 bg-pink-200 bg-opacity-60 p-2 hover:cursor-pointer hover:bg-orange-500 hover:bg-opacity-80">
        <Link target="_blank" href={product.link}>
          <b>{`${product.emoji} Go to Amazon ${product.emoji}`}</b>
        </Link>
      </button>
    </article>
  )
}
