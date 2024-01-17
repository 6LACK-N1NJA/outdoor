import Filters from './components/Filters'
import ComparingProducts from './components/ComparingProducts'
import ProductsRanking from './components/ProductsRanking'
import { getComparisonConfing } from '@/api/strapiCalls'
import { getProductList } from '@/api/productsService'
import SelectedProductsProvider from './components/SelectedProductsProvider'
import calculateRaitingRatio from './utils/calculateRaitingRatio'
import { uniq } from 'lodash'

export default async function Page({ params }) {
  const config = await getComparisonConfing(params)?.config
  const products = await getProductList(params)
  const max = { ratio: 0, features: 0, screen: 0 }
  const emoji = '🧭';
  const filters = uniq(products.map(({ mapType }) => mapType))
  const mappedProducts = products.map((product) => {
    const { reviewsNumber, rating, specialFeaturesNumber, screenSizeInches } = product
    const ratingRatio = calculateRaitingRatio(Number(rating), Number(reviewsNumber))
    if (ratingRatio > max.ratio) max.ratio = ratingRatio
    if (specialFeaturesNumber > max.features) max.features = Number(specialFeaturesNumber)
    if (screenSizeInches > max.screen) max.screen = Number(screenSizeInches)
    return {
      ...product,
      emoji,
      ratingRatio,
      max,
    }
  })
  console.log('pr', mappedProducts)
  return (
    <>
      <Filters filters={filters} title={`Trekking GPS Devices ${emoji}`}/>
      <SelectedProductsProvider initialState={[mappedProducts[0], mappedProducts[1], mappedProducts[2]]}>
        <ComparingProducts products={mappedProducts} />
        <ProductsRanking products={mappedProducts} />
      </SelectedProductsProvider>
    </>
  )
}
