const RAITING_RATIO_COEFFICIENTS = [1.2, 1.4, 1.6]

export default function calculateRaitingRatio(raiting, reviewsNumber) {
  if (reviewsNumber >= 100 && reviewsNumber < 500) return raiting * RAITING_RATIO_COEFFICIENTS[0]
  if (reviewsNumber >= 500 && reviewsNumber < 1100) return raiting * RAITING_RATIO_COEFFICIENTS[1]
  if (reviewsNumber >= 1100) return raiting * RAITING_RATIO_COEFFICIENTS[2]
  return raiting
}
