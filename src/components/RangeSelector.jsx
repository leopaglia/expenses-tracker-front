import DateRangePicker from '@wojtekmaj/react-daterange-picker/dist/entry.nostyle'
import { useAppContext } from '../appContext'

import './DaterangePicker.css'
import 'react-calendar/dist/Calendar.css'

const RangeSelector = () => {
  const { range, setRange } = useAppContext()

  return (
    <DateRangePicker
      onChange={setRange}
      value={range}
      format="d/M/y"
      clearIcon={null}
    />
  )
}

export default RangeSelector
