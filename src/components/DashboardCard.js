import Button from '@material-ui/core/Button'
import Card from '@material-ui/core/Card'
import CardActionArea from '@material-ui/core/CardActionArea'
import CardActions from '@material-ui/core/CardActions'
import CardContent from '@material-ui/core/CardContent'
import CardMedia from '@material-ui/core/CardMedia'
import { makeStyles } from '@material-ui/core/styles'
import Typography from '@material-ui/core/Typography'
import React from 'react'
import { useHistory } from 'react-router-dom'

const useStyles = makeStyles((theme) => ({
  cardImage: {
    height: 340,
  },
}))

export default function DashboardCard({ image, title, description, link }) {
  const classes = useStyles()
  const history = useHistory()

  const handleClick = (loc) => history.push(loc)

  return (
    <Card>
      <CardActionArea onClick={() => handleClick(link)}>
        <CardMedia className={classes.cardImage} image={image} title={title} />
        <CardContent>
          <Typography gutterBottom variant="h5" component="h2">
            {title}
          </Typography>
          <Typography variant="body2" color="textSecondary" component="p">
            {description}
          </Typography>
        </CardContent>
      </CardActionArea>
      <CardActions>
        <Button size="small" onClick={() => handleClick(link)}>
          More Detail
        </Button>
      </CardActions>
    </Card>
  )
}
