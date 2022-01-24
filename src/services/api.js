import { format, sub, startOfMonth } from 'date-fns'

export const getCategories = async () => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`)
  return await response.json()
}

export const createCategory = async (name) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/categories`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name }),
  })
  return await response.json()
}

export const getExpensesForRange = async (from, to) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/expenses?from=${from}&to=${to}`
  )
  return await response.json()
}

export const completeExpense = async (id, total) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expenses/incomplete/${id}`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ total }),
  })

  return await response.json()
}

export const getIncompleteExpenses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/expenses/incomplete`
  )
  return await response.json()
}

export const getRecurringExpenses = async () => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/expenses/recurring`
  )
  return await response.json()
}

export const getHistoricData = async () => {
  const from = format(
    startOfMonth(sub(new Date(), { months: 5 })),
    'yyyy-MM-dd'
  )

  const to = format(new Date(), 'yyyy-MM-dd')

  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/expenses?from=${from}&to=${to}`
  )
  return await response.json()
}

export const createExpense = async ({
  date,
  category_id,
  currency,
  total,
  name,
}) => {
  const response = await fetch(`${process.env.REACT_APP_API_URL}/expenses`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ date, category_id, currency, total, name }),
  })
  return await response.json()
}

export const createRecurringExpense = async ({
  frequency,
  category_id,
  currency,
  total,
  name,
}) => {
  const response = await fetch(
    `${process.env.REACT_APP_API_URL}/expenses/recurring`,
    {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        frequency,
        category_id,
        currency,
        total,
        name,
      }),
    }
  )
  return await response.json()
}
