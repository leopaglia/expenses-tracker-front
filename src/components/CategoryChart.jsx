import { useState, useEffect } from 'react'
import { PieChart } from 'react-minimal-pie-chart'
import ReactTooltip from 'react-tooltip'

import { useAppContext } from '../appContext'
import Spinner from './Spinner'

const formatChartData = (expenses, availableCategories) => {
  const chartColors = ['#E38627', '#C13C37', '#6A2135', '#A4512D']

  const allCategories = Array.from(
    new Set(expenses.map((expense) => expense.category.name))
  )

  return allCategories.map((categoryName, idx) => {
    const filteredExpenses = expenses.filter(
      (expense) => expense.category.name === categoryName
    )

    const USDValue = filteredExpenses.reduce(
      (acc, curr) => acc + curr.total / curr.rate,
      0
    )

    return {
      id: availableCategories.find((c) => c.name === categoryName)?.id,
      title: categoryName,
      value: USDValue,
      color: chartColors[idx % chartColors.length],
      data: filteredExpenses,
    }
  })
}

const CategoryChart = () => {
  const [selected, setSelected] = useState()
  const [hovered, setHovered] = useState()

  const {
    categories,
    expenses,
    isLoadingExpenses,
    selectedCategoryID,
    setSelectedCategoryID,
  } = useAppContext()

  const chartData = formatChartData(expenses, categories)

  useEffect(
    () => {
      if (!selectedCategoryID && selected) {
        setSelected(undefined)
      } else {
        setSelected(
          chartData.findIndex((data) => data.id === selectedCategoryID)
        ) // TODO check
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [selectedCategoryID]
  )

  if (isLoadingExpenses) {
    return (
      <div>
        <Spinner />
      </div>
    )
  }

  if (!expenses.length) {
    return null
  }

  return (
    <div data-tip="" data-for="chart">
      <PieChart
        data={chartData.map((entry, i) => ({
          ...entry,
          ...(hovered === i && { color: 'grey' }),
        }))}
        lineWidth={100}
        segmentsStyle={{
          transition: 'stroke .3s',
          cursor: 'pointer',
        }}
        segmentsShift={(index) => (index === selected ? 6 : 1)}
        animate
        radius={40}
        onClick={(_, index) => {
          if (chartData.length > 1) {
            setSelected(index === selected ? undefined : index)
            setSelectedCategoryID(
              index === selected ? undefined : chartData[index].id
            )
          }
        }}
        onMouseOver={(_, index) => setHovered(index)}
        onMouseOut={() => setHovered(undefined)}
      />
      <ReactTooltip
        id="chart"
        getContent={() =>
          typeof hovered === 'number' ? (
            <div>
              <h6>{chartData[hovered].title}</h6>
              {chartData[hovered].data.map((expense) => (
                <p key={expense.id} className="my-0">
                  {expense.name}: ${expense.total} ({expense.currency}){' '}
                  {expense.currency !== 'USD' &&
                    `[$${(expense.total / expense.rate).toFixed(2)} USD]`}
                </p>
              ))}
              {chartData[hovered].data.length > 1 && (
                <>
                  <hr />
                  <p>
                    <b>Total: </b>$
                    {chartData[hovered].data
                      .reduce((acc, curr) => acc + curr.total / curr.rate, 0)
                      .toFixed(2)}
                  </p>
                </>
              )}
            </div>
          ) : null
        }
      />
    </div>
  )
}

export default CategoryChart
