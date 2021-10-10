import ExpensesList from './components/ExpensesList'
import RangeSelector from './components/RangeSelector'
import RegisterExpenseControls from './components/RegisterExpensesControls'
import CategoryChart from './components/CategoryChart'
import HistoricalChart from './components/HistoricalChart'
import './App.css'

const App = () => (
  <div className="vh-100 d-flex flex-column">
    <header className="navbar navbar-dark sticky-top bg-dark shadow pe-4">
      <div className="ms-auto"></div>
    </header>
    <div
      className="row flex-grow-1"
      style={{ height: '90vh', overflowX: 'hidden', overflowY: 'scroll' }}
    >
      <main className="flex-grow-1 col-12 col-lg-7 p-4">
        <ExpensesList />
      </main>

      <aside className="col-12 col-lg-5 p-4">
        <div className="col-lg-12 col-xxl-8 offset-xxl-2 text-center h-100 d-flex flex-column justify-content-evenly">
          <RangeSelector />
          <hr />
          <RegisterExpenseControls />
          <hr />
          <h4>Gastos por categoria</h4>
          <CategoryChart />
          <hr />
          <h4 className="mb-4">Historico</h4>
          <HistoricalChart />
        </div>
      </aside>
    </div>
  </div>
)

export default App
