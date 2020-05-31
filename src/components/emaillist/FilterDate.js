import Button from '@material-ui/core/Button'
import Dialog from '@material-ui/core/Dialog'
import DialogActions from '@material-ui/core/DialogActions'
import TextField from '@material-ui/core/TextField'
import { DatePicker } from '@material-ui/pickers'
import React, { useState } from 'react'
var moment = require('moment')

export default function FilterDate({ onClose, onClear, date, span, open }) {
  const [filterDate, setFilterDate] = useState(new Date(moment(date)))
  const [filterSpan, setFilterSpan] = useState(span)

  // https://material-ui-pickers.dev/demo/datepicker
  // https://material-ui.com/components/text-fields/
  // https://material-ui.com/components/dialogs/

  return (
    <Dialog aria-labelledby="filter-date" open={open}>
      <DatePicker
        autoOk
        orientation="portrait"
        variant="static"
        openTo="date"
        value={filterDate}
        onChange={setFilterDate}
        disableFuture
        animateYearScrolling
      />
      <TextField
        label={'+/- days'}
        type="number"
        variant="filled"
        defaultValue={filterSpan}
        onChange={(e) => setFilterSpan(e.target.value)}
        helperText="Time span in number of days around date to include"
        size="small"
      />
      <DialogActions>
        <Button onClick={() => onClear()} color="primary">
          Clear
        </Button>
        <Button
          onClick={() =>
            onClose(filterDate, filterSpan > 0 ? filterSpan : -filterSpan)
          }
          color="primary"
          autoFocus
        >
          Ok
        </Button>
      </DialogActions>
    </Dialog>
  )
}
// TODO: validate props
