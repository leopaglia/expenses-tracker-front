import { useAppContext } from '../appContext'
import IncompleteExpense from './IncompleteExpense'
import Spinner from './Spinner'

const IncompleteExpensesList = () => {
  const { incompleteExpenses, isLoadingExpenses } = useAppContext()

  if (isLoadingExpenses) {
    return (
      <div className="row h-100 align-items-center justify-content-center">
        <Spinner />
      </div>
    )
  }

  if(incompleteExpenses.length === 0) {
    return null
  }

  return (
    <div className="card mb-4">
      <h5 className="card-header d-flex">
        <span className="badge bg-warning text-dark">Completar Gastos</span>
      </h5>
      <div
        className="card-body p-0"
        style={{ overflowX: 'hidden', overflowY: 'scroll' }}
      >
        {incompleteExpenses.map((e) => (
          <IncompleteExpense
            key={e.id}
            id={e.id}
            name={e.name}
            date={e.date}
            currency={e.currency}
            rate={e.rate}
            recurring
          />
        ))}
      </div>
    </div>
  )
}

export default IncompleteExpensesList
