import Filters from '../components/Filters'
import ComparingProducts from '../components/ComparingProducts'
import ProductsRanking from '../components/ProductsRanking'
import { getComparisonConfingList, getFiltersConfig, getProductCardConfig, getRankingConfig } from '@/api/strapiCalls'
import { getProductList } from '@/api/productsService'
import SelectedProductsProvider from '../components/SelectedProductsProvider'
import calculateRaitingRatio from '../utils/calculateRaitingRatio'
import { flatten, compact } from 'lodash'
import rankingRules from 'src/constants/rankingRules'

export default async function Page({ params, searchParams }) {
  const { configList } = await getComparisonConfingList();
   
  const  config = (
      configList?.find(({ attributes }) => attributes.slug === (params.filters && params.filters[0])) 
      || configList[0]
    ).attributes;
  //if (!config) config = configList && configList[0].attributes
  const { emoji, selectedFields } = config;
  const productCardConfig = await getProductCardConfig(config.productCardConfig.data.id)
  const filtersConfig = await getFiltersConfig(config.filtersList.data.map(({ id }) => id))
  const mergedFiltersConfig = flatten(filtersConfig.map(({ filtersList }) => filtersList))
  const rankingConfig = await getRankingConfig(config.rankingConfig.data.map(({ id }) => id))
  const mergedRankingConfig = flatten(rankingConfig.map(({ configsList }) => configsList))
  const prod = await getProductList(config?.dataKey)
  // Build filters based on products and config
  const filters = {};
  mergedFiltersConfig.forEach((f) => {
    filters[f.filterFieldName] = {
      ...f,
      isGeneric: !f.filterValues,
      filterValues: f.filterValues?.split(', ') || [],
    }
  })
  const filterGenericKeys = Object.keys(filters).filter((key) => filters[key].isGeneric);
  // Filter fetched products with a query string 
  const products = Object.keys(searchParams).length > 0 ? prod.filter((product) => {
    Object.keys(searchParams).forEach((param) => {
      if (typeof searchParams[param] === 'string') {
        return product[param] === searchParams[param] ? true : false;
      } else {
        searchParams[param].forEach((value) => product[param] === value ? true : false)
      }
    })
  }) : prod;
  // Create object for max value for chart building
  const max = {}
  productCardConfig.customPieCharts?.forEach(({ fieldName }) => max[fieldName] = 0);
  // Map products to have all fields that are needed for showing data
  const mappedProducts = products.map((product) => {
    // Fill filters here to avoid a lot of cycles. Maybe not the best idea, but let it be 
    filterGenericKeys.forEach((key) => {
      if (!filters[key].filterValues.includes(product[key])) {
        filters[key].filterValues.push(product[key])
      }
    })
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
  // Create list of other landing pages to show in filters for navigation
  const comparisonsList = configList?.map(({ attributes }) => {
    const { title, slug, emoji } = attributes;
    return { title, slug, emoji }
  })
  //console.log('prdcts', mappedProducts)
  console.log('conf', filters)
  return (
    <>
      <Filters 
        comparisonsList={comparisonsList} 
        filters={filters}
        filtersConfig={mergedFiltersConfig} 
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
