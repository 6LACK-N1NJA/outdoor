import RankingRow from './RankingRow'

export default async function RankingCard({ products, rankedBy, ulClass }) {
  return (
    <article>
      <h3 className=" text-lg text-center mt-2">{`Top-10 ${rankedBy}`}</h3>
      <ul className={ulClass}>
        {products.map((product, index) => (
          <RankingRow key={`${index} rank`} product={product} index={index} />
        ))}
      </ul>
    </article>
  )
}
