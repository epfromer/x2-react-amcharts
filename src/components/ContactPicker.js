import Chip from '@material-ui/core/Chip'
import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'center',
    flexWrap: 'wrap',
    '& > *': {
      margin: theme.spacing(0.5),
    },
  },
}))

export default function ContactPicker({ contactsToShow, onChange }) {
  const classes = useStyles()
  const contacts = useSelector((state) => state.contacts)

  const handleDelete = (k) => {
    const newContacts = new Map(contactsToShow)
    newContacts.set(k, false)
    onChange(newContacts)
  }

  const handleClick = (k) => {
    const newContacts = new Map(contactsToShow)
    newContacts.set(k, true)
    onChange(newContacts)
  }

  const contactColor = (contact) =>
    contacts.find((c) => c.name === contact).color

  const items = []
  contactsToShow.forEach((v, k) =>
    items.push(
      v ? (
        <Chip
          label={k}
          key={k}
          style={{ backgroundColor: contactColor(k) }}
          onDelete={() => handleDelete(k)}
        />
      ) : (
        <Chip
          label={k}
          key={k}
          style={{ backgroundColor: contactColor(k) }}
          onClick={() => handleClick(k)}
        />
      )
    )
  )

  return <div className={classes.root}>{items}</div>
}
