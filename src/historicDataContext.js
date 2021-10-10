import { createContext, useContext, useEffect, useState } from 'react'
import * as api from './services/api'

const HistoricDataContext = createContext()
export const useHistoricDataContext = () => useContext(HistoricDataContext)

export const Provider = ({ children }) => {
  const [historicData, setHistoricData] = useState([])
  const [isLoadingHistoricData, setIsLoadingHistoricData] = useState(false)
  const [reloadHistoricDataKey, setReloadHistoricDataKey] = useState(0)

  const manualReloadHistoricData = () =>
    setReloadHistoricDataKey(reloadHistoricDataKey + 1)

  useEffect(() => {
    setIsLoadingHistoricData(true)
    api.getHistoricData().then((data) => {
      setHistoricData(data)
      setIsLoadingHistoricData(false)
    })
  }, [reloadHistoricDataKey])

  return (
    <HistoricDataContext.Provider
      value={{
        historicData,
        isLoadingHistoricData,
        manualReloadHistoricData,
      }}
    >
      {children}
    </HistoricDataContext.Provider>
  )
}
