import IconButton from '@material-ui/core/IconButton'
import TableCell from '@material-ui/core/TableCell'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import TableSortLabel from '@material-ui/core/TableSortLabel'
import TextField from '@material-ui/core/TextField'
import DateRangeIcon from '@material-ui/icons/DateRange'
import _ from 'lodash'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import FilterDate from './FilterDate'
var moment = require('moment')

const DEBOUNCE_MS = 1000
const FILTER_DATE = '2000-10-04'

export default function EmailTableHead() {
  const dispatch = useDispatch()
  const [openFilterDate, setOpenFilterDate] = useState(false)
  const querySort = useSelector((state) => state.querySort)
  const queryOrder = useSelector((state) => state.queryOrder)
  const from = useSelector((state) => state.from)
  const to = useSelector((state) => state.to)
  const subject = useSelector((state) => state.subject)
  const sent = useSelector((state) => state.sent)
  const allText = useSelector((state) => state.allText)
  const timeSpan = useSelector((state) => state.timeSpan)

  const makeHeadCell = (label, field, defaultValue, tabIndex) => ({
    label,
    field,
    defaultValue,
    tabIndex,
  })

  const headCells = [
    makeHeadCell('Sent', 'sent', sent, 2),
    makeHeadCell('From', 'from', from, 3),
    makeHeadCell('To', 'to', to, 4),
    makeHeadCell('Subject', 'subject', subject, 5),
  ]

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  const debouncedSearch = _.debounce((field, term) => {
    setReduxState('emailListPage', 0)
    setReduxState(field, term)
  }, DEBOUNCE_MS)

  return (
    <>
      <FilterDate
        open={openFilterDate}
        date={sent ? sent : FILTER_DATE}
        span={timeSpan}
        onClear={() => {
          setOpenFilterDate(false)
          setReduxState('sent', '')
          setReduxState('timeSpan', 0)
        }}
        onClose={(date, span) => {
          setOpenFilterDate(false)
          setReduxState('sent', moment(date).format().slice(0, 10))
          setReduxState('timeSpan', span)
        }}
      />
      <TableHead>
        <TableRow>
          <TableCell colSpan={5}>
            <TextField
              label={'Filter (all text fields)'}
              fullWidth={true}
              variant="filled"
              type="search"
              tabIndex="1"
              defaultValue={allText}
              onChange={(e) => debouncedSearch('allText', e.target.value)}
            />
          </TableCell>
        </TableRow>
        <TableRow>
          <TableCell>
            <IconButton
              aria-label="clear search"
              onClick={() => setOpenFilterDate(true)}
            >
              <DateRangeIcon />
            </IconButton>
          </TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TextField
                label={'Filter ' + c.label}
                type="search"
                variant="filled"
                tabIndex={c.tabIndex}
                defaultValue={c.defaultValue}
                onChange={(e) => debouncedSearch(c.field, e.target.value)}
              />
            </TableCell>
          ))}
        </TableRow>
        <TableRow>
          <TableCell></TableCell>
          {headCells.map((c) => (
            <TableCell key={c.label}>
              <TableSortLabel
                active={querySort === c.field}
                direction={
                  querySort === c.field
                    ? queryOrder === 1
                      ? 'asc'
                      : 'desc'
                    : 'asc'
                }
                onClick={() => {
                  setReduxState('emailListPage', 0)
                  if (querySort === c.field) {
                    setReduxState('queryOrder', queryOrder === 1 ? -1 : 1)
                  } else {
                    setReduxState('queryOrder', 1)
                  }
                  setReduxState('querySort', c.field)
                }}
              >
                {c.label}
              </TableSortLabel>
            </TableCell>
          ))}
        </TableRow>
      </TableHead>
    </>
  )
}
