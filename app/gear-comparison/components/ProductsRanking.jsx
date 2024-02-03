import RankingCard from './RankingCard'
import KnowMore from './KnowMore'

export default function ProductsRanking({ rankedProductList, description }) {
  return (
    <section className="mt-10 mb-8">
        <div className='my-3 flex flex-wrap align-baseline'>
            <h2 className="text-2xl">Product top ranks</h2>
            <KnowMore>
               {description}
            </KnowMore>
        </div>
      <div className="flex flex-col lg:flex-row">
        {rankedProductList.map(({ products, title }, index) => (
          <RankingCard
            key={`rank_${title}_${index}`}
            ulClass={index + 1 < rankedProductList.length && 'border-r-2'}
            products={products}
            rankedBy={title}
          />
        ))}
      </div>
    </section>
  )
}
