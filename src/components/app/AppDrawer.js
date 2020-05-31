import Divider from '@material-ui/core/Divider'
import Drawer from '@material-ui/core/Drawer'
import List from '@material-ui/core/List'
import DashboardIcon from '@material-ui/icons/Dashboard'
import Email from '@material-ui/icons/Email'
import FindInPage from '@material-ui/icons/FindInPage'
import PieChart from '@material-ui/icons/PieChart'
import Search from '@material-ui/icons/Search'
import React from 'react'
import NavListItem from './NavListItem'

// https://material-ui.com/components/material-icons/

export default function AppDrawer({ open, setOpen }) {
  const mainListItems = [
    { icon: <DashboardIcon />, name: 'Dashboard', route: '/' },
    { icon: <Email />, name: 'Search', route: '/SearchView' },
  ]

  const secondaryListItems = [
    { icon: <PieChart />, name: 'Chord', route: '/ChordView' },
    { icon: <PieChart />, name: 'Word Cloud', route: '/WordCloudView' },
    { icon: <PieChart />, name: 'FDT', route: '/FDTView' },
    { icon: <PieChart />, name: 'Timeline', route: '/TimelineView' },
    { icon: <PieChart />, name: 'Tree Map', route: '/TreeMapView' },
    { icon: <PieChart />, name: 'Serpentine', route: '/SerpentineView' },
  ]

  const tertiaryListItems = [
    { icon: <Search />, name: 'Saved Searches', route: '/search' },
    { icon: <FindInPage />, name: '2001', route: '/search' },
    { icon: <FindInPage />, name: 'From: Ken Lay', route: '/search' },
    { icon: <FindInPage />, name: 'text: foo', route: '/search' },
  ]

  return (
    <Drawer
      anchor="left"
      open={open}
      onClose={() => setOpen(false)}
      onClick={() => setOpen(false)}
    >
      <List>
        {mainListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </List>
      <Divider />
      <List>
        {secondaryListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </List>
      <Divider />
      <List>
        {tertiaryListItems.map((item) => (
          <NavListItem
            icon={item.icon}
            name={item.name}
            route={item.route}
            key={item.name}
          />
        ))}
      </List>
    </Drawer>
  )
}

// TODO: prop types
