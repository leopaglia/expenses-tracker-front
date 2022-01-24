import NewExpenseModal from './NewExpenseModal'
import NewRecurringExpenseModal from './NewRecurringExpenseModal'

const RegisterExpenseControls = () => (
  <>
    <div>
      <div className="mb-4">
        <button
          className="btn btn-primary btn-lg"
          data-bs-toggle="modal"
          data-bs-target="#newExpenseModal"
        >
          Registrar gasto
        </button>
      </div>

      <div className="mt-4">
        <button
          className="btn btn-secondary btn-lg "
          data-bs-toggle="modal"
          data-bs-target="#newRecurringExpenseModal"
        >
          Registrar gasto recurrente
        </button>
      </div>
    </div>

    <NewExpenseModal />
    <NewRecurringExpenseModal />
  </>
)

export default RegisterExpenseControls
