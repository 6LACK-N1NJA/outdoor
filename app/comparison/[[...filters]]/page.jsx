import Filters from '../components/Filters'
import ComparingProducts from '../components/ComparingProducts'
import ProductsRanking from '../components/ProductsRanking'
import { getComparisonConfingList, getFiltersConfig, getProductCardConfig, getRankingConfig } from '@/api/strapiCalls'
import { getProductList } from '@/api/productsService'
import SelectedProductsProvider from '../components/SelectedProductsProvider'
import calculateRaitingRatio from '../utils/calculateRaitingRatio'
import { flatten, compact } from 'lodash'
import rankingRules from 'src/constants/rankingRules'

export default async function Page({ params }) {
  const { configList } = await getComparisonConfingList();
  const  config = (
      configList?.find(({ attributes }) => attributes.slug === (params.filters && params.filters[0])) 
      || configList[0]
    ).attributes;
  //if (!config) config = configList && configList[0].attributes
  const { emoji, selectedFields } = config;
  const productCardConfig = await getProductCardConfig(config.productCardConfig.data.id)
  const filtersConfig = await getFiltersConfig(config.filtersList.data.map(({ id }) => id))
  const rankingConfig = await getRankingConfig(config.rankingConfig.data.map(({ id }) => id))
  const mergedRankingConfig = flatten(rankingConfig.map(({ configsList }) => configsList))
  const products = await getProductList(config?.dataKey)
  // Create object for max value for chart building
  const max = {}
  productCardConfig.customPieCharts?.forEach(({ fieldName }) => max[fieldName] = 0);
  // Map products to have all fields that are needed for showing data
  const mappedProducts = products.map((product) => {
    const { reviewsNumber, rating } = product
    const ratingRatio = calculateRaitingRatio(Number(rating), Number(reviewsNumber))
    const updatedProduct = {
      ...product,
      ratingRatio,
      emoji,
    }
    Object.keys(max).forEach((m) => {
      const productParameter = Number(updatedProduct[m])
      if ( productParameter > max[m]) max[m] = productParameter;
    })
    return {
      ...updatedProduct,
      max,
    }
  })
  // Build and sort product lists for ranking
  const rankedProductList = mergedRankingConfig.map(({ rankedFieldName, rankingRule, title }) => {
    return {
      products: mappedProducts.sort(rankingRules[rankingRule](rankedFieldName)).slice(0, 10),
      title,
    }
  })
    
  const filters = configList?.map(({ attributes }) => {
    const { title, slug, emoji } = attributes;
    return { title, slug, emoji }
  })
  console.log('prdcts', mappedProducts)
  //console.log('conf', productCardConfig)
  return (
    <>
      <Filters 
        filters={filters} 
        filtersConfig={filtersConfig} 
        selectedFilters={selectedFields} 
        title={`${config.title} ${config.emoji}`}
      />
      <SelectedProductsProvider 
        initialState={compact(
          [rankedProductList[0]?.products[0], rankedProductList[1]?.products[0], rankedProductList[2]?.products[0]]
          )}
      >
        <ComparingProducts products={mappedProducts} productCardConfig={productCardConfig} />
        <ProductsRanking rankedProductList={rankedProductList} />
      </SelectedProductsProvider>
    </>
  )
}
