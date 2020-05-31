import React from 'react'
import { Route, Switch } from 'react-router-dom'
import AppSettingsView from '../views/AppSettingsView.js'
import ChordView from '../views/ChordView.js'
import DashboardView from '../views/DashboardView'
import EmailDetailView from '../views/EmailDetailView.js'
import FDTView from '../views/FDTView.js'
import SavedSearchView from '../views/SavedSearchView.js'
import SearchView from '../views/SearchView.js'
import SerpentineView from '../views/SerpentineView.js'
import TimelineView from '../views/TimelineView.js'
import TreeMapView from '../views/TreeMapView.js'
import WordCloudView from '../views/WordCloudView.js'

export default function RouteSwitch() {
  return (
    <Switch>
      <Route path="/AppSettingsView">
        <AppSettingsView />
      </Route>
      <Route path="/SearchView">
        <SearchView />
      </Route>
      <Route path="/EmailDetailView/:id">
        <EmailDetailView />
      </Route>
      <Route path="/SavedSearchView">
        <SavedSearchView />
      </Route>
      <Route path="/ChordView">
        <ChordView />
      </Route>
      <Route path="/FDTView">
        <FDTView />
      </Route>
      <Route path="/WordCloudView">
        <WordCloudView />
      </Route>
      <Route path="/TimelineView">
        <TimelineView />
      </Route>
      <Route path="/TreeMapView">
        <TreeMapView />
      </Route>
      <Route path="/SerpentineView">
        <SerpentineView />
      </Route>
      <Route path="/">
        <DashboardView />
      </Route>
    </Switch>
  )
}
