import * as am4core from '@amcharts/amcharts4/core'
import * as am4plugins_wordCloud from '@amcharts/amcharts4/plugins/wordCloud'
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
  chart: {
    width: '100%',
    height: '90%',
  },
}))

export default function WordCloudView() {
  const wordCloudLoading = useSelector((state) => state.wordCloudLoading)
  const classes = useStyles()
  let chart = null
  const dispatch = useDispatch()
  const history = useHistory()
  const darkMode = useSelector((state) => state.darkMode)
  const wordCloud = useSelector((state) => state.wordCloud)
  const themePrimaryColor = useSelector((state) => state.themePrimaryColor)
  const themeSecondaryColor = useSelector((state) => state.themeSecondaryColor)

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  function handleSelect(ev) {
    dispatch({ type: 'clearSearch' })
    setReduxState('allText', ev.target.dataItem.dataContext.tag)
    history.push('/SearchView')
  }

  function createChart() {
    // https://www.amcharts.com/docs/v4/chart-types/wordcloud/

    if (chart) chart.dispose()

    // console.time()
    chart = am4core.create('WordCloud', am4plugins_wordCloud.WordCloud)
    const series = chart.series.push(new am4plugins_wordCloud.WordCloudSeries())
    series.data = wordCloud
    series.dataFields.word = 'tag'
    series.dataFields.value = 'weight'
    series.labels.template.tooltipText = '{word} {value}'
    const labels = series.labels.template
    labels.events.on('hit', (ev) => handleSelect(ev))
    // series.labels.template.url = '/SearchView?allText={word}'
    if (darkMode) {
      series.heatRules.push({
        target: series.labels.template,
        property: 'fill',
        min: am4core.color('white'),
        max: am4core.color('red'),
        dataField: 'value',
      })
    } else {
      series.heatRules.push({
        target: series.labels.template,
        property: 'fill',
        min: am4core.color(themeSecondaryColor),
        max: am4core.color(themePrimaryColor),
        dataField: 'value',
      })
    }
    // console.timeEnd()
  }

  useEffect(() => {
    if (wordCloud && !chart) createChart()
    return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [wordCloud])

  return (
    <div className={classes.root}>
      {wordCloudLoading && <LinearProgress />}
      <Typography variant="h6">Email Word Cloud</Typography>
      <div id="WordCloud" className={classes.chart}></div>
    </div>
  )
}
