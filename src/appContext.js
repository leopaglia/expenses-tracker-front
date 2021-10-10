import { createContext, useContext, useEffect, useState } from 'react'
import { format, startOfMonth } from 'date-fns'
import * as api from './services/api'

const AppContext = createContext()
export const useAppContext = () => useContext(AppContext)

export const Provider = ({ children }) => {
  const [expenses, setExpenses] = useState([])
  const [isLoadingExpenses, setIsLoadingExpenses] = useState(false)

  const [categories, setCategories] = useState([])
  const [isLoadingCategories, setIsLoadingCategories] = useState(false)

  const [range, setRange] = useState([startOfMonth(new Date()), new Date()])

  const [selectedCategoryID, setSelectedCategoryID] = useState()

  const [reloadExpensesKey, setReloadExpensesKey] = useState(0)
  const [reloadCategoriesKey, setReloadCategoriesKey] = useState(0)

  useEffect(() => {
    setIsLoadingExpenses(true)
    api
      .getExpensesForRange(
        format(range[0], 'yyyy-MM-dd'),
        format(range[1], 'yyyy-MM-dd')
      )
      .then((expenses) => {
        setExpenses(expenses)
        setIsLoadingExpenses(false)
      })
  }, [range, reloadExpensesKey])

  useEffect(() => {
    setIsLoadingCategories(true)
    api.getCategories().then((categories) => {
      setCategories(categories)
      setIsLoadingCategories(false)
    })
  }, [reloadCategoriesKey])

  const createExpense = async ({
    date,
    category_id,
    currency,
    total,
    name,
  }) => {
    setIsLoadingExpenses(true)
    await api.createExpense({
      date: format(date, 'yyyy-MM-dd'),
      category_id,
      currency,
      total,
      name,
    })
    setIsLoadingExpenses(false)
    setReloadExpensesKey(reloadExpensesKey + 1)
  }

  const createCategory = async (name) => {
    setIsLoadingCategories(true)
    await api.createCategory(name)
    setIsLoadingCategories(false)
    setReloadCategoriesKey(reloadCategoriesKey + 1)
  }

  return (
    <AppContext.Provider
      value={{
        expenses,
        isLoadingExpenses,
        createExpense,
        categories,
        isLoadingCategories,
        createCategory,
        range,
        setRange,
        selectedCategoryID,
        setSelectedCategoryID,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}
