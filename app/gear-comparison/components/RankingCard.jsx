import RankingRow from './RankingRow'

export default async function RankingCard({ products, rankedBy, ulClass }) {
  return (
    <article className='grow'>
      <h3 className=" text-lg text-center my-4">{`Top-10 ${rankedBy}`}</h3>
      <ul className={`border-gray-100 ${ulClass}`}>
        {products.map((product, index) => (
          <RankingRow key={`${index}_rank`} product={product} index={index} />
        ))}
      </ul>
    </article>
  )
}
