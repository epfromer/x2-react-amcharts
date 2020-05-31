import TablePagination from '@material-ui/core/TablePagination'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ROWS_PER_PAGE = [5, 10, 25, 50, 100]

export default function EmailTablePagination() {
  const dispatch = useDispatch()
  const totalEmails = useSelector((state) => state.totalEmails)
  const emailListItemsPerPage = useSelector(
    (state) => state.emailListItemsPerPage
  )
  const emailListPage = useSelector((state) => state.emailListPage)

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  return (
    <TablePagination
      rowsPerPageOptions={ROWS_PER_PAGE}
      component="div"
      count={totalEmails}
      rowsPerPage={emailListItemsPerPage}
      page={emailListPage}
      onChangePage={(e, newPage) => setReduxState('emailListPage', newPage)}
      onChangeRowsPerPage={(e) =>
        setReduxState('emailListItemsPerPage', e.target.value)
      }
    />
  )
}
