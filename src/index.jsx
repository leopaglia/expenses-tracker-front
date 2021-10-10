import React from 'react'
import ReactDOM from 'react-dom'
import App from './App'
import { Provider as AppContextProvider } from './appContext'
import { Provider as HistoricDataContextProvider } from './historicDataContext'

ReactDOM.render(
  <React.StrictMode>
    <AppContextProvider>
      <HistoricDataContextProvider>
        <App />
      </HistoricDataContextProvider>
    </AppContextProvider>
  </React.StrictMode>,
  document.getElementById('root')
)
