import * as am4core from '@amcharts/amcharts4/core'
import am4themes_material from '@amcharts/amcharts4/themes/material'
import AppBar from '@material-ui/core/AppBar'
import Container from '@material-ui/core/Container'
import CssBaseline from '@material-ui/core/CssBaseline'
import {
  createMuiTheme,
  makeStyles,
  ThemeProvider,
} from '@material-ui/core/styles'
import React from 'react'
import { useSelector } from 'react-redux'
import { BrowserRouter as Router } from 'react-router-dom'
import './App.css'
import AppDrawer from './components/app/AppDrawer'
import AppToolbar from './components/app/AppToolbar'
import RouteSwitch from './router/RouteSwitch'
import { useDispatch } from 'react-redux'
import {
  fetchWordCloudIfNeeded,
  fetchContactsIfNeeded,
  fetchEmailSentIfNeeded,
} from './store'

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
  appBarSpacer: theme.mixins.toolbar,
  content: {
    flexGrow: 1,
    height: '98vh',
    overflow: 'auto',
  },
  container: {
    paddingTop: theme.spacing(1),
  },
}))

export default function App() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const [drawerOpen, setDrawerOpen] = React.useState(false)
  const darkMode = useSelector((state) => state.darkMode)
  const themePrimaryColor = useSelector((state) => state.themePrimaryColor)
  const themeSecondaryColor = useSelector((state) => state.themeSecondaryColor)

  am4core.useTheme(am4themes_material)

  dispatch(fetchWordCloudIfNeeded())
  dispatch(fetchContactsIfNeeded())
  dispatch(fetchEmailSentIfNeeded())

  const palette = {
    primary: { main: themePrimaryColor },
    secondary: { main: themeSecondaryColor },
  }
  if (darkMode) palette.type = 'dark'
  const customTheme = createMuiTheme({ palette })

  return (
    <ThemeProvider theme={customTheme}>
      <Router>
        <div className={classes.root}>
          <CssBaseline />
          <AppBar position="absolute">
            <AppToolbar
              drawerOpen={drawerOpen}
              setDrawerOpen={setDrawerOpen}
              darkMode={darkMode}
            />
          </AppBar>
          <AppDrawer open={drawerOpen} setOpen={setDrawerOpen} />
          <main className={classes.content}>
            <div className={classes.appBarSpacer} />
            <Container maxWidth={false} className={classes.container}>
              <RouteSwitch />
            </Container>
          </main>
        </div>
      </Router>
    </ThemeProvider>
  )
}

// TODO: footer like vue
