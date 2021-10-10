import { useMemo } from 'react'
import { Chart } from 'react-google-charts'
import { format, startOfMonth, sub, endOfMonth, isFuture } from 'date-fns'

import { useAppContext } from '../appContext'
import { useHistoricDataContext } from '../historicDataContext'
import Spinner from './Spinner'

const formatChartData = (expenses) => {
  const thisMonth = startOfMonth(new Date())
  const startOfPast5Months = [5, 4, 3, 2, 1, 0].map((n) =>
    sub(thisMonth, { months: n })
  )

  const allCategories = Array.from(
    new Set(expenses.map((expense) => expense.category.name))
  )

  const totalsByMonthAndCategory = startOfPast5Months.map((date) => {
    const month = date.getUTCMonth()
    const year = date.getUTCFullYear()
    const totalsForMonth = allCategories.map((categoryName) =>
      expenses
        .filter(
          (expense) =>
            expense.category.name === categoryName &&
            new Date(expense.date).getUTCFullYear() === year &&
            new Date(expense.date).getUTCMonth() === month
        )
        .reduce((acc, curr) => acc + curr.total / curr.rate, 0)
    )

    return [format(date, 'MMMM yyyy'), ...totalsForMonth]
  })

  const labels = ['Fecha', ...allCategories]

  return [labels, ...totalsByMonthAndCategory]
}

const HistoricalChart = () => {
  const { categories, isLoadingCategories, setSelectedCategoryID, setRange } =
    useAppContext()
  const { historicData, isLoadingHistoricData, reloadHistoricDataKey } =
    useHistoricDataContext()

  const chartData = formatChartData(historicData)

  return useMemo(
    () => {
      if (isLoadingHistoricData) {
        return (
          <div>
            <Spinner />
          </div>
        )
      }

      if (!historicData.length) {
        return null
      }

      if (isLoadingCategories) {
        return null
      }

      const onSelectCategory = (column) => {
        setRange([startOfMonth(sub(new Date(), { months: 5 })), new Date()])

        const categoryName = chartData[0][column]

        setSelectedCategoryID(
          categories.find((category) => category.name === categoryName).id
        )
      }

      const onSelectCategoryByMonth = (row, column) => {
        const categoryName = chartData[0][column]
        const dateString = chartData[row + 1][0]

        setRange([
          new Date(dateString),
          isFuture(endOfMonth(new Date(dateString)))
            ? new Date()
            : endOfMonth(new Date(dateString)),
        ])
        setSelectedCategoryID(
          categories.find((category) => category.name === categoryName).id
        )
      }

      const onDeSelect = () => {
        setRange([startOfMonth(new Date()), new Date()])
        setSelectedCategoryID(null)
      }

      return (
        <Chart
          width="550px"
          height="400px"
          chartType="Bar"
          data={chartData}
          chartEvents={[
            {
              eventName: 'select',
              callback: ({ chartWrapper }) => {
                const chart = chartWrapper.getChart()
                const selection = chart.getSelection()

                if (!selection.length) {
                  onDeSelect()
                  return
                }

                const [{ row, column }] = selection

                if (row === null && !!column) {
                  onSelectCategory(column)
                  return
                }

                onSelectCategoryByMonth(row, column)
              },
            },
          ]}
        />
      )
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [
      historicData,
      isLoadingHistoricData,
      isLoadingCategories,
      reloadHistoricDataKey,
    ]
  )
}

export default HistoricalChart
