import Dialog from '@material-ui/core/Dialog'
import { makeStyles } from '@material-ui/core/styles'
import PrimaryColorPicker from 'mui-primary-color-picker'
import React, { useState } from 'react'

const useStyles = makeStyles({
  dialog: { padding: '10px' },
})

export default function ColorPicker({ open, defaultColor, onClose }) {
  // https://material-ui.com/components/dialogs/
  const classes = useStyles()
  const [pickedColor, setPickedColor] = useState('')
  const handleClose = () => onClose(pickedColor)

  return (
    <Dialog
      aria-labelledby="filter-date"
      className={classes.dialog}
      open={open}
      onClose={handleClose}
    >
      <PrimaryColorPicker
        defaultColor={defaultColor}
        onChange={(color) => setPickedColor(color)}
      />
    </Dialog>
  )
}
// TODO: validate props
