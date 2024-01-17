import RankingCard from './RankingCard'
import KnowMore from './KnowMore'

export default function ProductsRanking({ products }) {
  return (
    <section className="  my-8">
        <div className='flex flex-wrap align-baseline'>
        <h2 className="text-2xl">Product top ranks</h2>
        <KnowMore>
            Here is the text of how I calculated top ranks
        </KnowMore>
        </div>
      <div className="first-child:border-l-2 flex">
        <RankingCard
          ulClass={'border-r-2'}
          products={products
            .sort(({ ratingRatio }, r) => (ratingRatio > r.ratingRatio ? -1 : 1))
            .slice(0, 10)}
          rankedBy={'Rating Ratio'}
        />
        <RankingCard
          ulClass={'border-r-2'}
          products={products
            .sort(({ screenSizeInches }, r) =>
              Number(screenSizeInches) > Number(r.screenSizeInches) ? -1 : 1
            )
            .slice(0, 10)}
          rankedBy={'Screen Size'}
        />
        <RankingCard
          products={products
            .sort(({ priseUsd }, r) => (Number(priseUsd) > Number(r.priseUsd) ? 1 : -1))
            .slice(0, 10)}
          rankedBy={'Lowest Price'}
          ulClass={'border-r-2'}
        />
        <RankingCard
          products={products
            .sort(({ specialFeaturesNumber }, r) =>
              Number(specialFeaturesNumber) > Number(r.specialFeaturesNumber) ? -1 : 1
            )
            .slice(0, 10)}
          rankedBy={'Special Features'}
        />
      </div>
    </section>
  )
}
