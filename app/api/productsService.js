import Papa from 'papaparse'
import fs from 'fs/promises'
import path from 'path'

import { notFound } from 'next/navigation'

const parseCSV = async (url) => {
  try {
    // Read the CSV file content
    const res = await fetch(url)
    const csvFile = await res.text()

    // Return a new promise that resolves to the parsed data
    return new Promise((resolve, reject) => {
      Papa.parse(csvFile, {
        header: true, // Set to true if your CSV has headers
        complete: (results) => resolve(results.data),
        error: (error) => reject(error),
      })
    })
  } catch (error) {
    console.error('Error reading CSV file:', error)
    throw error
  }
}

export async function getProductList(csvData) {
  //const filePath = path.join(process.cwd(), 'app', dataKey || '/public/trekking_boots.csv')
  try {
    const data = await parseCSV(csvData.data.attributes.url)
    return data;
  } catch (error) {
    console.error('Error parsing CSV file:', error)
  }
}
