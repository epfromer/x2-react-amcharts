import * as am4core from '@amcharts/amcharts4/core'
import * as am4plugins_forceDirected from '@amcharts/amcharts4/plugins/forceDirected'
import Button from '@material-ui/core/Button'
import Grid from '@material-ui/core/Grid'
import IconButton from '@material-ui/core/IconButton'
import LinearProgress from '@material-ui/core/LinearProgress'
import { makeStyles } from '@material-ui/core/styles'
import Tooltip from '@material-ui/core/Tooltip'
import Typography from '@material-ui/core/Typography'
import SelectAll from '@material-ui/icons/SelectAll'
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import ContactPicker from '../components/ContactPicker'

const useStyles = makeStyles((theme) => ({
  root: {
    height: '93vh',
  },
  chart: {
    width: '100%',
    height: '100%',
  },
  button: {
    display: 'flex',
    justifyContent: 'center',
    paddingTop: '5px',
  },
}))

export default function FDTView() {
  const contactsLoading = useSelector((state) => state.contactsLoading)
  const classes = useStyles()
  let chart = null
  const dispatch = useDispatch()
  const history = useHistory()
  const contacts = useSelector((state) => state.contacts)
  const darkMode = useSelector((state) => state.darkMode)
  const [showSenders, setShowSenders] = React.useState(true)
  const [selectAll, setSelectAll] = React.useState(true)
  const [contactsToShow, setContactsToShow] = React.useState(new Map())

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  const contactColor = (contact) =>
    contacts.find((c) => c.name === contact).color

  function handleSelect(ev) {
    const from = ev.target.dataItem.dataContext.from
    const to = ev.target.dataItem.dataContext.to
    if (from) {
      dispatch({ type: 'clearSearch' })
      setReduxState('from', `(${from})`)
      setReduxState('to', `(${to})`)
      history.push('/SearchView')
    }
  }

  function createContactList() {
    // TODO maybe redux getSenders and getReceivers, cached

    const map = new Map()
    contacts.forEach((contact) => {
      if (showSenders) {
        contact.asSender.forEach((email) => {
          if (email.to.length) map.set(contact.name, true)
        })
      } else {
        contact.asReceiver.forEach((email) => {
          map.set(email.from, true)
        })
      }
    })
    return new Map([...map.entries()].sort())
  }

  function createChart() {
    // https://www.amcharts.com/docs/v4/chart-types/force-directed/

    if (chart) chart.dispose()

    if (!contactsToShow.size) return

    const data = []
    contacts.forEach((contact) => {
      const sent = new Map()
      if (showSenders) {
        contact.asSender.forEach((email) => {
          email.to.forEach((recipient) => {
            if (sent.has(recipient)) {
              sent.set(recipient, sent.get(recipient) + 1)
            } else {
              sent.set(recipient, 1)
            }
          })
        })
      } else {
        contact.asReceiver.forEach((email) => {
          if (sent.has(email.from)) {
            sent.set(email.from, sent.get(email.from) + 1)
          } else {
            sent.set(email.from, 1)
          }
        })
      }

      const parent = {
        name: contact.name,
        color: contactColor(contact.name),
        children: [],
      }
      sent.forEach((v, k) => {
        if (contact.name !== k && contactsToShow.get(contact.name))
          if (showSenders) {
            parent.children.push({
              from: contact.name,
              to: k,
              name: k,
              value: v,
              color: contactColor(k),
            })
          } else {
            parent.children.push({
              from: k,
              to: contact.name,
              name: k,
              value: v,
              color: contactColor(k),
            })
          }
      })

      if (parent.children.length) data.push(parent)
    })

    chart = am4core.create('FDT', am4plugins_forceDirected.ForceDirectedTree)
    let series = chart.series.push(
      new am4plugins_forceDirected.ForceDirectedSeries()
    )
    series.data = data

    series.dataFields.value = 'value'
    series.dataFields.name = 'name'
    series.dataFields.color = 'color'
    series.dataFields.children = 'children'
    series.nodes.template.tooltipText = '{name}:{value}'
    series.nodes.template.fillOpacity = 1
    series.nodes.template.label.text = '{name}'
    series.fontSize = 10
    series.minRadius = 15
    series.nodes.template.events.on('hit', (ev) => handleSelect(ev))

    if (darkMode) {
      series.nodes.template.label.fill = am4core.color('white')
    } else {
      series.nodes.template.label.fill = am4core.color('black')
    }
  }

  useEffect(() => {
    if (contacts && !contactsToShow.size) setContactsToShow(createContactList())
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contacts])

  useEffect(() => {
    if (!chart) createChart()
    return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [contactsToShow])

  useEffect(() => {
    createChart()
    return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [darkMode])

  function toggleSendersReceivers() {
    setShowSenders(!showSenders)
    setSelectAll(true)
    setContactsToShow(createContactList())
  }

  function onContactsChange(contacts) {
    setContactsToShow(contacts)
  }

  function toggleSelectAll() {
    const toShow = new Map(contactsToShow)
    toShow.forEach((v, k) => toShow.set(k, !selectAll))
    setSelectAll(!selectAll)
    setContactsToShow(toShow)
  }

  return (
    <div className={classes.root}>
      {contactsLoading && <LinearProgress />}
      <Typography variant="h6">Senders / Receivers</Typography>
      <Grid container spacing={2}>
        <Grid item xs={4} sm={2}>
          <div className={classes.button}>
            <Tooltip title="Toggle All Select" aria-label="Toggle All Select">
              <IconButton onClick={() => toggleSelectAll()}>
                <SelectAll />
              </IconButton>
            </Tooltip>
            <Button size="small" onClick={() => toggleSendersReceivers()}>
              {showSenders ? 'Senders' : 'Receivers'}
            </Button>
          </div>
          <div className={classes.button}></div>
          <ContactPicker
            contactsToShow={contactsToShow}
            onChange={(contacts) => onContactsChange(contacts)}
          />
        </Grid>
        <Grid item xs={8} sm={10}>
          <div id="FDT" className={classes.chart}></div>
        </Grid>
      </Grid>
    </div>
  )
}
