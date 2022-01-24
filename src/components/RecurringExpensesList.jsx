import { useAppContext } from '../appContext'
import RecurringExpense from './RecurringExpense'
import Spinner from './Spinner'

const RecurringExpensesList = () => {
  const { recurringExpenses, isLoadingExpenses, categories, selectedCategoryID } =
    useAppContext()

  if (isLoadingExpenses) {
    return (
      <div className="row h-100 align-items-center justify-content-center">
        <Spinner />
      </div>
    )
  }

  if(recurringExpenses.length === 0) {
    return null
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

  const filteredExpenses = recurringExpenses.filter((e) =>
    !!selectedCategoryID ? e.category.id === selectedCategoryID : true
  )

  return (
    <div className="card mb-4">
      <h5 className="card-header d-flex">
        <span>Gastos Recurrentes</span>
      </h5>
      <div
        className="card-body p-0"
        style={{ overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {filteredExpenses.map((e) => (
          <RecurringExpense
            key={e.id}
            name={e.name}
            currency={e.currency}
            total={e.total}
            frequency={e.frequency}
            badge={
              <h6 className={`badge m-0 ${categoriesBadgesMap[e.category.id]}`}>
                {e.category.name}
              </h6>
            }
            recurring
          />
        ))}
      </div>
    </div>
  )
}

export default RecurringExpensesList
