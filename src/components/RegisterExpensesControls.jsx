import NewExpenseModal from './NewExpenseModal'

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
        <button className="btn btn-secondary btn-lg">
          Agregar gasto recurrente
        </button>
      </div>
    </div>

    <NewExpenseModal />
  </>
)

export default RegisterExpenseControls
