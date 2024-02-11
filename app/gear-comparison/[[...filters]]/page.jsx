import Filters from '../components/Filters'
import ComparingProducts from '../components/ComparingProducts'
import ProductsRanking from '../components/ProductsRanking'
import { getComparisonConfingList, getFiltersConfig, getProductCardConfig, getRankingConfig } from '@/api/strapiCalls'
import { getProductList } from '@/api/productsService'
import SelectedProductsProvider from '../components/SelectedProductsProvider'
import calculateRaitingRatio from '../utils/calculateRaitingRatio'
import { flatten } from 'lodash'
import rankingRules from 'src/constants/rankingRules'
import ExpandedFilters from '../components/ExpandedFilters'
import CollapsedFilters from '../components/CollapsedFilters'

export async function generateMetadata({ params }) {
  const { configList } = await getComparisonConfingList();
  const  config = (
      configList?.find(({ attributes }) => attributes.slug === (params.filters && params.filters[0])) 
      || configList[0]
    ).attributes;
  const { seo, cover ,slug } = config
  if (!seo) return
  const { metaTitle, metaDescription, keywords } = seo;
  return {
    title: `${metaTitle}`,
    description: metaDescription,
    keywords: keywords.split(', '),
    creator: 'Mykola Bludov',
    authors: [{ name: 'Mykola Bludov' }],
    openGraph: {
      title: `${metaTitle}`,
      description: metaDescription,
      //image: cover.data.attributes.formats.thumbnail.url,
    },
    twitter: {
      title: metaTitle,
      description: metaDescription,
      //image: cover.data.attributes.formats.thumbnail.url,
    },
    alternates: {
      canonical: `/gear-comparison/${slug}`,
    },
  }
}

export default async function Page({ params, searchParams }) {
  const { configList } = await getComparisonConfingList();
   
  const  config = (
      configList?.find(({ attributes }) => attributes.slug === (params.filters && params.filters[0])) 
      || configList[0]
    ).attributes;
  //if (!config) config = configList && configList[0].attributes
  const { emoji, selectedFields, title, slug, csvData } = config;
  const emoTitle = `${title} ${emoji}`;
  const productCardConfig = await getProductCardConfig(config.productCardConfig.data.id)
  const filtersConfig = await getFiltersConfig(config.filtersList.data.map(({ id }) => id))
  const mergedFiltersConfig = flatten(filtersConfig.map(({ filtersList }) => filtersList))
  const rankingConfig = await getRankingConfig(config.rankingConfig.data.map(({ id }) => id))
  const mergedRankingConfig = flatten(rankingConfig.map(({ configsList }) => configsList))
  const prod = await getProductList(csvData)
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
  prod.forEach((product) => {
    filterGenericKeys.forEach((key) => {
      if (!filters[key].filterValues.includes(product[key])) {
        filters[key].filterValues.push(product[key])
      }
    })
  });
  // Filter fetched products with a query string and makeing splitted values for filtering selected fields
  const splittedSearchParams = {};
  const products = Object.keys(searchParams).length > 0 ? prod.filter((product) => {
    let infiltered;
    Object.keys(searchParams).forEach((param, index) => {
      const splitted = searchParams[param].split(',');
      splittedSearchParams[param] = splitted;
      if (index > 0 && infiltered === false) return;
      infiltered = false;
      console.log('split', splitted)
      splitted.forEach((value) => product[param].toLowerCase().includes(value.toLowerCase()) && (infiltered = true)) 
    })
    return infiltered;
  }) : prod;
  // Filter selected fields from server to avoid doubling with search params
  const filteredSelectedFields = selectedFields.filter(({ fieldName, selectedValue }) => !splittedSearchParams[fieldName]?.includes(selectedValue));
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
  // Create list of other landing pages to show in filters for navigation
  const comparisonsList = configList?.map(({ attributes }) => {
    const { title, slug, emoji } = attributes;
    return { title, slug, emoji }
  })
  const defaultTexts = config.defaultTexts.data?.attributes;
  const customTexts = config.customTexts.data?.attributes;
  return (
    <>
      <Filters 
        filters={filters}
        selectedFields={filteredSelectedFields} 
        expandedFilters={
            <ExpandedFilters 
              comparisonsList={comparisonsList}
              filters={filters}
              selectedFields={filteredSelectedFields}
              searchParams={splittedSearchParams}
              slug={slug}
              emoTitle={emoTitle}
              description={customTexts?.mainDescription || defaultTexts?.mainDescription}
            />
        }
        collapsedFilters={
          <CollapsedFilters
              emoTitle={emoTitle}
              mainText={customTexts?.mainText || defaultTexts?.mainText}
              description={customTexts?.mainDescription || defaultTexts?.mainDescription}
            />
        }
      />
      <SelectedProductsProvider 
        rankedProductList={rankedProductList}
      >
        <ComparingProducts products={mappedProducts} productCardConfig={productCardConfig} description={customTexts?.selectedProductsDescription || defaultTexts?.selectedProductsDescription} />
        <ProductsRanking rankedProductList={rankedProductList} description={customTexts?.rankingDescription || defaultTexts?.rankingDescription}/>
      </SelectedProductsProvider>
    </>
  )
}
