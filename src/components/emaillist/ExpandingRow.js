import Collapse from '@material-ui/core/Collapse'
import TableCell from '@material-ui/core/TableCell'
import TableRow from '@material-ui/core/TableRow'
import React from 'react'
import { useHistory } from 'react-router-dom'
import ExpandMoreFunc from './ExpandMore'

const EXPANDED_BODY_LENGTH = 1000

export default function ExpandingRow({ email }) {
  const [open, setOpen] = React.useState(false)
  const history = useHistory()
  const LinkedTableCell = ({ field, id }) => (
    <TableCell onClick={() => history.push(`/EmailDetailView/${id}`)}>
      {field}
    </TableCell>
  )
  return (
    <>
      <TableRow hover>
        <TableCell onClick={() => setOpen(!open)}>
          <ExpandMoreFunc />
        </TableCell>
        <LinkedTableCell field={email.sent} id={email._id} />
        <LinkedTableCell field={email.from} id={email._id} />
        <LinkedTableCell field={email.to} id={email._id} />
        <LinkedTableCell field={email.subject} id={email._id} />
      </TableRow>
      <TableRow>
        <TableCell colSpan={5} style={{ padding: 0 }}>
          <Collapse in={open}>
            {email.body.slice(0, EXPANDED_BODY_LENGTH)}
          </Collapse>
        </TableCell>
      </TableRow>
    </>
  )
}
