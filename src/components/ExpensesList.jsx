import { useAppContext } from '../appContext'
import Expense from './Expense'
import Spinner from './Spinner'

const ExpensesList = () => {
  const { expenses, isLoadingExpenses, categories, selectedCategoryID } =
    useAppContext()

  if (isLoadingExpenses) {
    return (
      <div className="row h-100 align-items-center justify-content-center">
        <Spinner />
      </div>
    )
  }

  const badgeClasses = [
    'bg-info',
    'bg-primary',
    'bg-warning',
    'bg-danger',
    'bg-secondary',
  ]

  const categoriesBadgesMap = Object.fromEntries(
    categories.map((category, idx) => [
      category.id,
      badgeClasses[idx & badgeClasses.length],
    ])
  )

  const filteredExpenses = expenses.filter((e) =>
    !!selectedCategoryID ? e.category.id === selectedCategoryID : true
  )

  return (
    <div className="card">
      <h5 className="card-header d-flex">
        <span>Gastos</span>
        <span className="ms-auto me-3">Total:</span>$
        {filteredExpenses
          .reduce((acc, curr) => acc + curr.total / curr.rate, 0)
          .toFixed(2)}
      </h5>
      <div
        className="card-body p-0"
        style={{ height: '90vh', overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {filteredExpenses.map((e) => (
          <Expense
            key={e.id}
            id={e.id}
            name={e.name}
            date={e.date}
            currency={e.currency}
            rate={e.rate}
            total={e.total}
            badge={
              <h6 className={`badge m-0 ${categoriesBadgesMap[e.category.id]}`}>
                {e.category.name}
              </h6>
            }
          />
        ))}
      </div>
    </div>
  )
}

export default ExpensesList
