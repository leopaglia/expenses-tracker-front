import { useState } from 'react'
import { useAppContext } from '../appContext'

const IncompleteExpense = ({ id, name, date, currency, rate }) => {
  const { completeExpense } = useAppContext()
  const [total, setTotal] = useState(0)

  return (
    <div className="card">
      <div className="card-body row align-items-center p-3 m-0">
        <span className="d-none d-md-block col-md-3 text-center">{date}</span>
        <span className="col-5 col-md-3">{name}</span>
        <span className="col-4 col-md-4 text-end">
          <div className="input-group">
            <input
              type="number"
              className="form-control"
              value={total}
              onChange={(e) => setTotal(e.target.value)}
            />
            <span className="input-group-text">{currency}</span>
          </div>
        </span>
        <div className="col-2 col-md-2 text-end">
          <button
            className="btn btn-primary"
            onClick={() => completeExpense({ id, total })}
            disabled={!total}
          >
            Guardar
          </button>
        </div>
      </div>
    </div>
  )
}

export default IncompleteExpense
