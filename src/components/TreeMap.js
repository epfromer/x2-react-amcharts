import * as am4charts from '@amcharts/amcharts4/charts'
import * as am4core from '@amcharts/amcharts4/core'
import { makeStyles } from '@material-ui/core/styles'
import React, { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  chart: {
    width: '100%',
    height: '100%',
  },
}))

export default function TreeMap({ data, search }) {
  let chart = null
  const classes = useStyles()
  const dispatch = useDispatch()
  const history = useHistory()
  const [readyToRender, setReadyToRender] = React.useState(false)

  function handleSelect(ev) {
    dispatch({ type: 'clearSearch' })
    dispatch({
      type: 'setReduxState',
      key: search,
      value: `(${ev.target.dataItem.dataContext.dataContext.name})`,
    })
    history.push('/SearchView')
  }

  function createChart() {
    // https://www.amcharts.com/docs/v4/chart-types/treemap/

    if (chart) chart.dispose()

    chart = am4core.create(`${search}TreeMap`, am4charts.TreeMap)
    chart.data = data
    chart.colors.step = 2
    chart.dataFields.name = 'name'
    chart.dataFields.value = 'value'
    chart.dataFields.color = 'color'
    const series = chart.seriesTemplates.create('0')
    series.columns.template.events.on('hit', (ev) => handleSelect(ev))
    const seriesBullet = series.bullets.push(new am4charts.LabelBullet())
    seriesBullet.locationY = 0.5
    seriesBullet.locationX = 0.5
    seriesBullet.label.text = '{name}'
    seriesBullet.label.fill = am4core.color('white')
  }

  useEffect(() => {
    // for some reason, this avoids double render
    if (data.length && !chart) setReadyToRender(true)
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data])

  useEffect(() => {
    if (data.length && !chart) createChart()
    return () => (chart ? chart.dispose() : '')
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [readyToRender])

  return <div id={`${search}TreeMap`} className={classes.chart}></div>
}
