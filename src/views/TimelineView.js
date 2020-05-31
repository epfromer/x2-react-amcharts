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
    height: '600px',
  },
  chartHeight: {
    width: '100%',
    height: '90%',
  },
}))

export default function TimelineView() {
  const classes = useStyles()
  let chart = null
  const dispatch = useDispatch()
  const history = useHistory()
  const emailSent = useSelector((state) => state.emailSent)
  const darkMode = useSelector((state) => state.darkMode)
  const [readyToRender, setReadyToRender] = React.useState(false)
  const emailSentLoading = useSelector((state) => state.emailSentLoading)

  function handleSelect(ev) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: 'sent',
      value: ev.target.dataItem.dataContext.date,
    })
    history.push('/SearchView')
  }

  // TODO benchmark performance- start with bars per week or month

  function createChart() {
    // https://www.amcharts.com/docs/v4/chart-types/xy-chart/

    if (chart) chart.dispose()

    let data = []
    emailSent.forEach((stat) => {
      data.push({ date: stat.sent, value: stat.ids.length })
    })

    chart = am4core.create('XYTimeline', am4charts.XYChart)
    chart.data = data
    chart.paddingRight = 20

    let dateAxis = chart.xAxes.push(new am4charts.DateAxis())
    dateAxis.renderer.grid.template.location = 0
    dateAxis.groupData = true
    if (darkMode) {
      dateAxis.renderer.labels.template.fill = am4core.color('white')
    }

    let valueAxis = chart.yAxes.push(new am4charts.ValueAxis())
    valueAxis.min = 0
    valueAxis.max = 1300
    valueAxis.strictMinMax = true
    valueAxis.tooltip.disabled = true
    valueAxis.renderer.minWidth = 35
    if (darkMode) {
      valueAxis.renderer.labels.template.fill = am4core.color('white')
    }

    // axis break for outlier
    const axisBreak = valueAxis.axisBreaks.create()
    axisBreak.startValue = 200
    axisBreak.endValue = 1300

    const d =
      (axisBreak.endValue - axisBreak.startValue) /
      (valueAxis.max - valueAxis.min)
    axisBreak.breakSize = (0.05 * (1 - d)) / d // 0.05 means that the break will take 5% of the total value axis height

    // make break expand on hover
    const hoverState = axisBreak.states.create('hover')
    hoverState.properties.breakSize = 1
    hoverState.properties.opacity = 0.1
    hoverState.transitionDuration = 1500

    axisBreak.defaultState.transitionDuration = 1000

    let series = chart.series.push(new am4charts.ColumnSeries())
    series.dataFields.dateX = 'date'
    series.dataFields.valueY = 'value'
    series.columns.template.events.on('hit', (ev) => handleSelect(ev))
    series.tooltipText = '{valueY.value}'
    chart.cursor = new am4charts.XYCursor()

    let scrollbarX = new am4charts.XYChartScrollbar()
    scrollbarX.series.push(series)
    chart.scrollbarX = scrollbarX
  }

  useEffect(() => {
    // for some reason, this avoids double render
    if (emailSent) setReadyToRender(true)
  }, [emailSent])

  useEffect(() => {
    if (readyToRender && !chart) createChart()
    // calling dispose here causes Uncaught Error: EventDispatcher is disposed
    // TODO report this
    // return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToRender])

  return (
    <div className={classes.root}>
      {emailSentLoading && <LinearProgress />}
      <Typography variant="h6">Emails Sent By Day</Typography>
      <div id="XYTimeline" className={classes.chartHeight}></div>
    </div>
  )
}
