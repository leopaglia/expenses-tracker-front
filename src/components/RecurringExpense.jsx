const frequencyMap = {
  weekly: 'Semanal',
  monthly: 'Mensual',
  yearly: 'Anual',
}

const Expense = ({ name, currency, total, badge, frequency }) => (
  <div className="card">
    <div className="card-body row align-items-center p-3 m-0">
      <span className="col-3 col-md-2 d-flex justify-content-center align-items-center">
        {badge}
      </span>
      <span className="d-none d-md-block col-md-3 text-center">
        {frequencyMap[frequency]}
      </span>
      <span className="col-5 col-md-4">{name}</span>
      <span className="col-4 col-md-3 text-end">
        {!!total ? (
          <div>
            ${total} {currency !== 'USD' && `(${currency})`}
          </div>
        ) : (
          <span>???</span>
        )}
      </span>
    </div>
  </div>
)

export default Expense
