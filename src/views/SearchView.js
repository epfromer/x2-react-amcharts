import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableContainer from '@material-ui/core/TableContainer'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import EmailTableHead from '../components/emaillist/EmailTableHead'
import EmailTablePagination from '../components/emaillist/EmailTablePagination'
import ExpandingRow from '../components/emaillist/ExpandingRow'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  table: { minWidth: 350 },
}))

export default function SearchView() {
  const dispatch = useDispatch()
  const classes = useStyles()
  const [loading, setLoading] = useState(false)
  const densePadding = useSelector((state) => state.densePadding)
  const emails = useSelector((state) => state.emails)
  const emailListPage = useSelector((state) => state.emailListPage)
  const emailListItemsPerPage = useSelector(
    (state) => state.emailListItemsPerPage
  )
  const querySort = useSelector((state) => state.querySort)
  const queryOrder = useSelector((state) => state.queryOrder)
  const sent = useSelector((state) => state.sent)
  const timeSpan = useSelector((state) => state.timeSpan)
  const from = useSelector((state) => state.from)
  const to = useSelector((state) => state.to)
  const subject = useSelector((state) => state.subject)
  const allText = useSelector((state) => state.allText)
  const body = useSelector((state) => state.body)

  function encodeQuery(q) {
    // encode query for URL
    let params = ''
    Object.keys(q).forEach((key) => {
      if ((typeof q[key] == 'string' && q[key]) || typeof q[key] == 'number') {
        params += '&' + key + '=' + encodeURIComponent(q[key])
      }
    })
    return '?' + params.slice(1)
  }

  async function doQuery() {
    const query = {
      skip: emailListPage * emailListItemsPerPage,
      limit: emailListItemsPerPage,
      sort: querySort,
      order: queryOrder,
    }
    if (sent) query.sent = sent
    if (timeSpan) query.timeSpan = timeSpan
    if (from) query.from = from
    if (to) query.to = to
    if (subject) query.subject = subject
    if (allText) query.allText = allText
    if (body) query.body = body

    const encodedQuery = encodeQuery(query)

    // do fetch
    setLoading(true)
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/email/${encodedQuery}`
    console.log(url)
    const resp = await fetch(url)
    resp
      .json()
      .then((resp) => {
        dispatch({
          type: 'setReduxState',
          key: 'emails',
          value: resp.emails.map((email) => ({
            ...email,
            sent: email.sent.slice(0, 10) + ' ' + email.sent.slice(11, 19),
          })),
        })
        dispatch({
          type: 'setReduxState',
          key: 'totalEmails',
          value: resp.total,
        })
      })
      .catch(() => {}) // TODO: handle errors
      .then(setLoading(false))
    // .then(() => console.log('loading complete'))
  }

  useEffect(() => {
    doQuery()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [
    allText,
    sent,
    timeSpan,
    from,
    to,
    subject,
    body,
    querySort,
    queryOrder,
    emailListPage,
    emailListItemsPerPage,
  ])

  return (
    <div className={classes.root}>
      <Paper className={classes.paper}>
        <TableContainer component={Paper}>
          {loading && <LinearProgress />}
          <Table
            className={classes.table}
            size={densePadding ? 'small' : 'medium'}
            aria-label="email"
          >
            <EmailTableHead />
            <TableBody>
              {emails.map((email) => (
                <ExpandingRow key={email._id} email={email} />
              ))}
            </TableBody>
          </Table>
        </TableContainer>
        <EmailTablePagination />
      </Paper>
    </div>
  )
}
