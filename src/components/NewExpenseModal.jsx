import { useEffect, useState } from 'react'
import DatePicker from 'react-date-picker/dist/entry.nostyle'
import CreatableSelect from 'react-select/creatable'
import { useAppContext } from '../appContext'
import { useHistoricDataContext } from '../historicDataContext'
import './DatePicker.css'
import 'react-calendar/dist/Calendar.css'

const NewExpenseModal = () => {
  const {
    categories,
    createCategory,
    isLoadingCategories,
    createExpense,
    isLoadingExpenses,
  } = useAppContext()

  const { manualReloadHistoricData } = useHistoricDataContext()

  const [date, setDate] = useState(new Date())
  const [selectedCategory, setSelectedCategory] = useState()
  const [selectedCurrency, setSelectedCurrency] = useState('UYU')
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
    setDate(new Date())
    setSelectedCurrency('UYU')
    setTotal(0)
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
      id="newExpenseModal"
      className="modal fade text-start"
      tabIndex="-1"
      data-bs-backdrop="static"
      data-bs-keyboard="false"
    >
      <div className="modal-dialog modal-dialog-centered">
        <div className="modal-content">
          <div className="modal-header">
            <h5 className="modal-title">Registrar nuevo gasto</h5>
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
                <div className="mb-3">
                  <label htmlFor="newExpenseDate" className="form-label">
                    Fecha
                  </label>
                  <div className="mb-3">
                    <DatePicker
                      onChange={setDate}
                      value={date}
                      format="d/M/y"
                      clearIcon={null}
                    />
                  </div>
                </div>
              </div>
              <div className="col-md-7">
                <div className="mb-3">
                  <label htmlFor="newExpenseCategory" className="form-label">
                    Categoria
                  </label>
                  <CreatableSelect
                    placeholder="Seleccionar o crear categoria"
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
                <div className="mb-3">
                  <label htmlFor="newExpenseMoneyCode" className="form-label">
                    Moneda
                  </label>
                  <select
                    id="newExpenseMoneyCode"
                    className="form-select"
                    aria-label="Default select example"
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
                <div className="mb-3">
                  <label htmlFor="newExpenseTotal" className="form-label">
                    Total
                  </label>
                  <input
                    type="number"
                    className="form-control"
                    id="newExpenseTotal"
                    value={total}
                    onChange={(e) => setTotal(e.target.value)}
                  />
                </div>
              </div>
            </div>

            <div className="row">
              <div className="mb-3">
                <label htmlFor="newExpenseName" className="form-label">
                  Nombre
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="newExpenseName"
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
                await createExpense({
                  date,
                  category_id: selectedCategory.value,
                  currency: selectedCurrency,
                  total,
                  name,
                })

                resetState()
                manualReloadHistoricData()

                window.bootstrap.Modal.getInstance(
                  document.getElementById('newExpenseModal')
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

export default NewExpenseModal
