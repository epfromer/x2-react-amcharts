import FormControlLabel from '@material-ui/core/FormControlLabel'
import Grid from '@material-ui/core/Grid'
import { makeStyles } from '@material-ui/core/styles'
import Switch from '@material-ui/core/Switch'
import Typography from '@material-ui/core/Typography'
import PrimaryColorPicker from 'mui-primary-color-picker'
import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import ContactSettings from '../components/ContactSettings'

const useStyles = makeStyles((theme) => ({
  colorGrid: {
    flexGrow: 1,
    marginBottom: '15px',
  },
  control: {
    marginBottom: '15px',
  },
}))

export default function AppSettingsView() {
  const classes = useStyles()
  const dispatch = useDispatch()
  const densePadding = useSelector((state) => state.densePadding)
  const darkMode = useSelector((state) => state.darkMode)
  const themePrimaryColor = useSelector((state) => state.themePrimaryColor)
  const themeSecondaryColor = useSelector((state) => state.themeSecondaryColor)

  const setReduxState = (key, value) =>
    dispatch({ type: 'setReduxState', key, value })

  const saveSetting = (setting, value) => {
    setReduxState(setting, value)
    dispatch({ type: 'saveAppSettings' })
  }

  return (
    <>
      <Typography variant="h4" gutterBottom>
        Settings
      </Typography>
      <div className={classes.control}>
        <FormControlLabel
          control={
            <Switch
              checked={densePadding}
              onChange={() => saveSetting('densePadding', !densePadding)}
            />
          }
          label="Dense padding tables"
        />
      </div>
      <Typography variant="h5" gutterBottom>
        Interface element colors
      </Typography>
      <div className={classes.control}>
        <FormControlLabel
          control={
            <Switch
              checked={darkMode}
              onChange={() => saveSetting('darkMode', !darkMode)}
            />
          }
          label="Dark mode"
        />
      </div>
      <div className={classes.colorGrid}>
        <Grid container spacing={2}>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Primary
            </Typography>
            <PrimaryColorPicker
              defaultColor={themePrimaryColor}
              onChange={(color) => saveSetting('themePrimaryColor', color)}
            />
          </Grid>
          <Grid item xs={12} sm={6}>
            <Typography variant="h6" gutterBottom>
              Secondary
            </Typography>
            <PrimaryColorPicker
              defaultColor={themeSecondaryColor}
              onChange={(color) => saveSetting('themeSecondaryColor', color)}
            />
          </Grid>
        </Grid>
      </div>
      <Typography variant="h5" gutterBottom>
        Enron Key Contacts
      </Typography>
      <ContactSettings />
    </>
  )
}
