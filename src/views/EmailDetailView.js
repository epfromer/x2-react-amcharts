import Card from '@material-ui/core/Card'
import CardContent from '@material-ui/core/CardContent'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux'
import { useParams } from 'react-router-dom'
import EmailCardActions from '../components/emaillist/EmailCardActions'
import { getEmailById } from '../store'

const useStyles = makeStyles((theme) => ({
  root: { width: '100%' },
  paper: {
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  title: { fontSize: 27 },
}))

export default function EmailDetailView() {
  const classes = useStyles()
  const { id } = useParams()
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState({})
  const cachedEmail = useSelector((state) => getEmailById(state, id))
  const allText = useSelector((state) => state.allText)
  const to = useSelector((state) => state.to)
  const from = useSelector((state) => state.from)
  const subject = useSelector((state) => state.subject)
  const body = useSelector((state) => state.body)

  const highlightedTerms = []
  if (allText) highlightedTerms.push(allText)
  if (to) highlightedTerms.push(to)
  if (from) highlightedTerms.push(from)
  if (subject) highlightedTerms.push(subject)
  if (body) highlightedTerms.push(body)

  async function doFetch() {
    setLoading(true)
    const url = `${process.env.REACT_APP_EMAIL_SERVER}/email/${id}`
    console.log(url)
    const resp = await fetch(url)
    resp
      .json()
      .then((resp) => setEmail(resp))
      .catch(() => {}) // TODO: handle errors
      .then(() => setLoading(false))
    // .then(() => console.log('fetch complete'))
  }

  useEffect(() => {
    cachedEmail ? setEmail(cachedEmail) : doFetch()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [cachedEmail])

  function highlight(str) {
    let s = str
    highlightedTerms.forEach(
      (term) =>
        (s = s?.replace(
          new RegExp(`(${term})`, 'gi'),
          `<span style="background-color:yellow; color:black">$1</span>`
        ))
    )
    return s
  }

  function displayText(str, className) {
    return (
      <Typography variant="body1" className={className} component="p">
        <span dangerouslySetInnerHTML={{ __html: highlight(str) }} />
      </Typography>
    )
  }

  return (
    <Card className={classes.root}>
      {loading && <LinearProgress />}
      <EmailCardActions id={id} />
      <CardContent>
        {displayText(email.subject, classes.title)}
        {displayText(`Sent: ${email.sent}`)}
        {displayText(
          `From: ${email.from}
          ${
            email.fromContact
              ? ' (named contact: ' + email.fromContact + ')'
              : ''
          }`
        )}
        {displayText(
          `To: ${email.to}
          ${email.toContact ? ' (named contact: ' + email.toContact + ')' : ''}`
        )}
        {displayText(`CC: ${email.cc}`)}
        {displayText(`BCC: ${email.bcc}`)}
        {displayText(email.body?.replace(/\n/g, '<br />'))}
      </CardContent>
      <EmailCardActions id={id} />
    </Card>
  )
}
