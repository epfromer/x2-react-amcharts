import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import TreeMap from '../components/TreeMap'
import Typography from '@material-ui/core/Typography'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '300px',
  },
}))

export default function TreeMapView() {
  const classes = useStyles()
  const contactsLoading = useSelector((state) => state.contactsLoading)
  const contacts = useSelector((state) => state.contacts)

  function getSenders() {
    const data = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.senderTotal) {
          data.push({
            name: contact.name,
            value: contact.senderTotal,
            color: contact.color,
          })
        }
      })
    }
    return data
  }

  function getReceivers() {
    const data = []
    if (contacts) {
      contacts.forEach((contact) => {
        if (contact.receiverTotal) {
          data.push({
            name: contact.name,
            value: contact.receiverTotal,
            color: contact.color,
          })
        }
      })
    }
    return data
  }

  return (
    <div className={classes.root}>
      {contactsLoading && <LinearProgress />}
      <Typography variant="h6">Named Senders to Any Recipient</Typography>
      <TreeMap data={getSenders()} search="from" />
      <Typography variant="h6">Named Receivers from Any Sender</Typography>
      <TreeMap data={getReceivers()} search="to" />
    </div>
  )
}
