import ExpensesList from './components/ExpensesList'
import RecurringExpensesList from './components/RecurringExpensesList'
import IncompleteExpensesList from './components/IncompleteExpensesList'
import RangeSelector from './components/RangeSelector'
import RegisterExpenseControls from './components/RegisterExpensesControls'
import CategoryChart from './components/CategoryChart'
import HistoricalChart from './components/HistoricalChart'
import './App.css'

const App = () => (
  <div className="vh-100 d-flex flex-column">
    <header className="navbar navbar-dark sticky-top bg-dark shadow">
      <div className="ms-auto"></div>
    </header>
    <div
      className="row flex-grow-1"
      style={{ overflowX: 'hidden', overflowY: 'scroll' }}
    >
      <main className="d-flex flex-column flex-grow-1 col-12 col-lg-7 p-4">
        <IncompleteExpensesList />
        <RecurringExpensesList />
        <ExpensesList />
      </main>

      <aside className="d-flex flex-column justify-content-evenly align-items-center text-center col-12 col-lg-5 p-4">
        <RangeSelector />
        <hr />
        <RegisterExpenseControls />
        <hr />
        <h4>Gastos por categoria</h4>
        <CategoryChart />
        <hr />
        <h4 className="mb-4">Historico</h4>
        <HistoricalChart />
      </aside>
    </div>
  </div>
)

export default App
