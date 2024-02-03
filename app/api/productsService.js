import Papa from 'papaparse'
import fs from 'fs/promises'
import path from 'path'

import { notFound } from 'next/navigation'

const parseCSV = async (filePath) => {
  try {
    // Read the CSV file content
    const csvFile = await fs.readFile(filePath, 'utf8')

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

export async function getProductList(dataKey) {
  const filePath = path.join(process.cwd(), 'app', dataKey || '/public/trekking_boots.csv')
  try {
    const data = await parseCSV(filePath)
    return data;
  } catch (error) {
    console.error('Error parsing CSV file:', error)
  }
}
