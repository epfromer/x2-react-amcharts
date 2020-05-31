import CardActions from '@material-ui/core/CardActions'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import Tooltip from '@material-ui/core/Tooltip'
import ArrowBack from '@material-ui/icons/ArrowBack'
import ArrowLeftIcon from '@material-ui/icons/ArrowLeft'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'
import React from 'react'
import { useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getEmailIndex, getNextEmail, getPreviousEmail } from '../../store'

export default function EmailCardActions({ id }) {
  const history = useHistory()
  const totalEmails = useSelector((state) => state.emails.length)
  const emailIndex = useSelector((state) => getEmailIndex(state, id))
  const previousEmailId = useSelector((state) => {
    const email = getPreviousEmail(state, id)
    return email ? email._id : null
  })
  const nextEmailId = useSelector((state) => {
    const email = getNextEmail(state, id)
    return email ? email._id : null
  })

  return (
    <CardActions>
      <Grid justify="space-between" container>
        <Grid item>
          <Tooltip title="Back to list">
            <IconButton
              aria-label="back to list"
              onClick={() => history.push(`/SearchView`)}
            >
              <ArrowBack />
            </IconButton>
          </Tooltip>
        </Grid>
        <Grid item>
          {totalEmails ? `${emailIndex} of ${totalEmails}` : ''}
          <Tooltip title="Previous email">
            <span>
              <IconButton
                aria-label="previous email"
                disabled={!previousEmailId}
                onClick={() =>
                  history.push(`/EmailDetailView/${previousEmailId}`)
                }
              >
                <ArrowLeftIcon />
              </IconButton>
            </span>
          </Tooltip>
          <Tooltip title="Next email">
            <span>
              <IconButton
                aria-label="next email"
                disabled={!nextEmailId}
                onClick={() => history.push(`/EmailDetailView/${nextEmailId}`)}
              >
                <ArrowRightIcon />
              </IconButton>
            </span>
          </Tooltip>
        </Grid>
      </Grid>
    </CardActions>
  )
}
