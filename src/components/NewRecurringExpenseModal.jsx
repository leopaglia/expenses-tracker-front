import { useEffect, useState } from 'react'
import CreatableSelect from 'react-select/creatable'
import { useAppContext } from '../appContext'

const NewRecurringExpenseModal = () => {
  const {
    categories,
    createCategory,
    isLoadingCategories,
    createRecurringExpense,
    isLoadingExpenses,
  } = useAppContext()

  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedCurrency, setSelectedCurrency] = useState('UYU')
  const [frequency, setFrequency] = useState('monthly')
  const [unknownTotal, setUnknownTotal] = useState(false)
  const [total, setTotal] = useState(0)
  const [name, setName] = useState('')

  useEffect(() => {
    if (categories.length) {
      setSelectedCategory({
        label: categories[0].name,
        value: categories[0].id,
      })
    }
  }, [categories])

  const resetState = () => {
    setFrequency('monthly')
    setSelectedCurrency('UYU')
    setTotal(0)
    setUnknownTotal(false)
    setName('')

    if (categories.length) {
      setSelectedCategory({
        label: categories[0].name,
        value: categories[0].id,
      })
    }
  }

  return (
    <div
      id="newRecurringExpenseModal"
      className="modal fade text-start"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar nuevo gasto recurrente</h5>
            <button
              type="button"
              className="btn-close"
              data-bs-dismiss="modal"
              aria-label="Close"
            ></button>
          </div>
          <div className="modal-body">
            <div className="row">
              <div className="col-md-5">
                <div className="form-group mb-3">
                  <label
                    htmlFor="newRecurringExpenseMoneyCode"
                    className="form-label"
                  >
                    Frecuencia
                  </label>
                  <select
                    id="newRecurringExpenseFrequency"
                    className="form-select"
                    value={frequency}
                    onChange={(e) => setFrequency(e.target.value)}
                  >
                    <option value="yearly">Anual</option>
                    <option value="monthly">Mensual</option>
                    <option value="weekly">Semanal</option>
                  </select>
                </div>
              </div>
              <div className="col-md-7">
                <div className="form-group mb-3">
                  <label
                    htmlFor="newRecurringExpenseCategory"
                    className="form-label"
                  >
                    Categoria
                  </label>
                  <CreatableSelect
                    placeholder="Seleccionar o crear categoria"
                    formatCreateLabel={cat => `Crear categoria "${cat}"`}
                    isLoading={isLoadingCategories}
                    isDisabled={isLoadingCategories}
                    onChange={setSelectedCategory}
                    onCreateOption={createCategory}
                    options={categories.map(({ id, name }) => ({
                      value: id,
                      label: name,
                    }))}
                    value={selectedCategory}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="col-md-5">
                <div className="form-group">
                  <label
                    htmlFor="newRecurringExpenseMoneyCode"
                    className="form-label"
                  >
                    Moneda
                  </label>
                  <select
                    id="newRecurringExpenseMoneyCode"
                    className="form-select"
                    value={selectedCurrency}
                    onChange={(e) => setSelectedCurrency(e.target.value)}
                  >
                    <option value="UYU">UYU</option>
                    <option value="USD">USD</option>
                    <option value="ARS">ARS</option>
                  </select>
                </div>
              </div>

              <div className="col-md-7">
                <div className="form-group">
                  <div className="form-group">
                    <label
                      htmlFor="newRecurringExpenseTotal"
                      className="form-label"
                    >
                      Total
                    </label>
                    <input
                      type="number"
                      className="form-control"
                      id="newRecurringExpenseTotal"
                      value={unknownTotal ? "" : total}
                      onChange={(e) => setTotal(e.target.value)}
                      disabled={unknownTotal}
                    />
                  </div>
                  <div className="form-check form-check-inline">
                    <input
                      id="newRecurringExpenseNoTotal"
                      className="form-check-input"
                      type="checkbox"
                      checked={unknownTotal}
                      onChange={(e) => setUnknownTotal(e.target.checked)}
                    />
                    <label
                      className="form-check-label"
                      htmlFor="newRecurringExpenseNoTotal"
                    >
                      No conozco el total
                    </label>
                  </div>
                </div>
              </div>
            </div>

            <div className="row">
              <div className="form-group mb-3">
                <label htmlFor="newRecurringExpenseName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newRecurringExpenseName"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                />
              </div>
            </div>
          </div>
          <div className="modal-footer">
            <button
              type="button"
              className="btn btn-secondary"
              data-bs-dismiss="modal"
            >
              Cerrar
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={async () => {
                await createRecurringExpense({
                  frequency,
                  category_id: selectedCategory.value,
                  currency: selectedCurrency,
                  total: unknownTotal ? null : total,
                  name,
                })

                resetState()

                window.bootstrap.Modal.getInstance(
                  document.getElementById('newRecurringExpenseModal')
                ).hide()
              }}
              disabled={isLoadingCategories || isLoadingExpenses}
            >
              Registrar
            </button>
          </div>
        </div>
      </div>
    </div>
  )
}

export default NewRecurringExpenseModal
