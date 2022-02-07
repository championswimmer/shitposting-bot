import { parse } from 'csv-parse'
import fs from 'fs/promises'
import { TwitterApi } from 'twitter-api-v2'

const companies: {[x: string]: string} = {
  AAPL: 'Apple',
  AMZN: 'Amazon',
  C: 'Citigroup',
  CRM: 'Salesforce',
  DIS: 'Disney',
  KO: 'Coca-Cola',
  MSFT: 'Microsoft',
  NVDA: 'Nvidia',
  TSLA: 'Tesla'
}

interface CSVRow {
  date: string
  open: string
  high: string
  low: string
  close: string
  volume: string
}
interface HistStockData {
  [date: string]: number
}

async function getRandomCompanyData () {
  const companyTrackers = Object.keys(companies)
  const symbol = companyTrackers[Math.floor(Math.random() * companyTrackers.length)]
  const name = companies[symbol]
  const dataFileName = `data/${symbol}.hist.csv`
  const histDataParser = parse(await fs.readFile(dataFileName), { columns: true })
  const histData: HistStockData = {}

  for await (const data of histDataParser as unknown as AsyncIterable<CSVRow>) {
    histData[data.date] = parseFloat(data.close)
  }

  return ({ name, symbol, histData })
}

function getStonkMessage (X: string, co: string, dt: string, Y: string, sym: string): string {
  return [
  `
If you invested $${X} in ${co} on ${dt}, today that would have been worth $${Y}.
$${sym} is a 🚀🚀🚀
  `,
  `
It is hard to put in words how much $${sym} is worth today.
For example on ${dt}, an investment of $${X} in ${co} would have been a sweet $${Y} today.
  `,
  `
I just got to know that on ${dt} this person invested ${X} in ${co}. And never took it out. 
Today his $${sym} portfolio is worth $${Y}.
  `,
  `
Holy shit! I just calculated what ${co} has grown from ${dt} to today. You won't believe it.
Basically, $${X} of $${sym} invested then, would be $${Y} now.
  `,
  `
It is absolutely 🤯 how much ${co} has grown!
$${X} of $${sym} on ${dt} would is more than $${Y} today!.
  `][Math.floor(Math.random() * 5)]
}

export async function shitpostStonks (client: TwitterApi) {
  const data = await getRandomCompanyData()

  const dates = Object.keys(data.histData)
  const firstDate = dates[0]
  const lastDate = dates[dates.length - 1]
  const randDate = dates[Math.floor(Math.random() * dates.length / 2)]

  const lastDatePrice = data.histData[lastDate]
  const randDatePrice = data.histData[randDate]

  const randDateObj = new Date(randDate)
  const randDateStr = randDateObj.toLocaleDateString('en-US', { month: 'long', day: 'numeric', year: 'numeric' })

  const investedValue = [10, 100, 500, 1000, 5000][Math.floor(Math.random() * 5)]
  const currentValue = ((investedValue / randDatePrice) * lastDatePrice).toFixed(0)

  const message = getStonkMessage(investedValue.toString(), data.name, randDateStr, currentValue, data.symbol)

  const result = await client.v2.tweet(message)
  console.log(result)
}
