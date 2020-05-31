import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '92vh',
  },
  chart: {
    width: '100%',
    height: '90%',
  },
}))

export default function ChordView() {
  const classes = useStyles()
  const contactsLoading = useSelector((state) => state.contactsLoading)
  let chart = null
  const dispatch = useDispatch()
  const history = useHistory()
  const contacts = useSelector((state) => state.contacts)
  const darkMode = useSelector((state) => state.darkMode)
  const [readyToRender, setReadyToRender] = React.useState(false)

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  function handleSelect(ev) {
    dispatch({ type: 'clearSearch' })
    setReduxState('from', `(${ev.target.dataItem.dataContext.from})`)
    setReduxState('to', `(${ev.target.dataItem.dataContext.to})`)
    history.push('/SearchView')
  }

  function createChart() {
    // https://www.amcharts.com/docs/v4/chart-types/chord-diagram/

    if (chart) chart.dispose()

    let data = []

    // first, need to set colors for each
    contacts.forEach((contact) => {
      data.push({ from: contact.name, nodeColor: contact.color })
    })

    contacts.forEach((contact) => {
      const sent = new Map()
      contact.asSender.forEach((email) => {
        email.to.forEach((recipient) => {
          if (sent.has(recipient)) {
            sent.set(recipient, sent.get(recipient) + 1)
          } else {
            sent.set(recipient, 1)
          }
        })
      })
      sent.forEach((v, k) => {
        if (contact.name !== k) {
          data.push({
            from: contact.name,
            to: k,
            value: v,
          })
        }
      })
    })

    chart = am4core.create('ChordDiagram', am4charts.ChordDiagram)
    chart.data = data
    chart.dataFields.fromName = 'from'
    chart.dataFields.toName = 'to'
    chart.dataFields.value = 'value'
    chart.dataFields.color = 'nodeColor'
    const links = chart.links.template
    links.events.on('hit', (ev) => handleSelect(ev))
    if (darkMode) {
      const label = chart.nodes.template.label
      label.fill = am4core.color('white')
    }
  }

  useEffect(() => {
    // for some reason, this avoids double render
    if (contacts) setReadyToRender(true)
  }, [contacts])

  useEffect(() => {
    if (contacts && !chart) createChart()
    return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToRender])

  return (
    <div className={classes.root}>
      {contactsLoading && <LinearProgress />}
      <Typography variant="h6">Senders / Receivers</Typography>
      <div id="ChordDiagram" className={classes.chart}></div>
    </div>
  )
}
