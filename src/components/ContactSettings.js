import Button from '@material-ui/core/Button'
import LinearProgress from '@material-ui/core/LinearProgress'
import Paper from '@material-ui/core/Paper'
// import { makeStyles } from '@material-ui/core/styles'
import Table from '@material-ui/core/Table'
import TableBody from '@material-ui/core/TableBody'
import TableCell from '@material-ui/core/TableCell'
import TableContainer from '@material-ui/core/TableContainer'
import TableHead from '@material-ui/core/TableHead'
import TableRow from '@material-ui/core/TableRow'
import React, { useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { fetchContactsIfNeeded } from '../store'
import ColorPicker from './ColorPicker'

// const useStyles = makeStyles({})

export default function ContactSettings() {
  // const classes = useStyles()
  const dispatch = useDispatch()
  const [openColorPicker, setOpenColorPicker] = useState(false)
  const [pickedColor, setPickedColor] = useState('')
  const [contactId, setContactId] = useState('')
  const contacts = useSelector((state) => state.contacts)
  const densePadding = useSelector((state) => state.densePadding)
  const contactsLoading = useSelector((state) => state.contactsLoading)

  function handleColorChosen(color) {
    setOpenColorPicker(false)
    if (!color) return
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/contacts/${contactId}`
    const payload = {
      method: 'PUT',
      body: JSON.stringify({ color }),
      headers: { 'Content-type': 'application/json; charset=UTF-8' },
    }
    fetch(url, payload)
      .then(() => dispatch(fetchContactsIfNeeded(true)))
      .catch(() => {}) // TODO: handle errors
  }

  return (
    <>
      <ColorPicker
        open={openColorPicker}
        defaultColor={pickedColor}
        onClose={(color) => handleColorChosen(color)}
      />
      {contactsLoading && <LinearProgress />}
      <TableContainer component={Paper}>
        <Table size={densePadding ? 'small' : 'medium'} aria-label="contacts">
          <TableHead>
            <TableRow>
              <TableCell>Contact</TableCell>
              <TableCell>Title</TableCell>
              <TableCell align="right">Sent</TableCell>
              <TableCell align="right">Received</TableCell>
              <TableCell align="left">Color</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {contacts?.map((c) => (
              <TableRow key={c.name}>
                <TableCell component="th" scope="row">
                  {c.name}
                </TableCell>
                <TableCell>{c.title}</TableCell>
                <TableCell align="right">{c.senderTotal}</TableCell>
                <TableCell align="right">{c.receiverTotal}</TableCell>
                <TableCell align="left">
                  <Button
                    onClick={() => {
                      setContactId(c._id)
                      setPickedColor(c.color)
                      setOpenColorPicker(true)
                    }}
                    style={{ color: c.color }}
                  >
                    {c.color}
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  )
}
