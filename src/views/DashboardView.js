import Grid from '@material-ui/core/Grid'
// import { makeStyles } from '@material-ui/core/styles'
import React from 'react'
import DashboardCard from '../components/DashboardCard'

// const useStyles = makeStyles((theme) => ({}))

export default function DashboardView() {
  return (
    <Grid container spacing={3}>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/chord.png"
          title="Chord"
          description="Chord diagram of communication between named Enron contacts."
          link="/ChordView"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/wordcloud.png"
          title="Word Cloud"
          description="Word cloud of key terms and fraudulent project names."
          link="/wordcloudview"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/timeline.png"
          title="Timeline"
          description="XY timeline of Enron email per day with drill down."
          link="/TimelineView"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/fdt.png"
          title="FDT"
          description="Force directed tree of named Enron contact communication."
          link="/FDTView"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/treemap.png"
          title="Tree Map"
          description="Tree map of named Enron contacts to any sender / receiver."
          link="/TreeMapView"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/serpentine.png"
          title="Serpentine"
          description="Serpentine timeline of Enron fraud and litigation."
          link="/SerpentineView"
        />
      </Grid>
      <Grid item xs={12} sm={6} md={3}>
        <DashboardCard
          image="/search.png"
          title="Search"
          description="Full text search with field filtering and hit highlighting."
          link="/SearchView"
        />
      </Grid>
    </Grid>
  )
}
