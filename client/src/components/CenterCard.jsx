import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Paper from '@material-ui/core/Paper';
import Cards from './Cards';


const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
    flexWrap: 'wrap',
    '& > *': {
      margin: 'auto',
      width: '1366px',
      backgroundColor: 'rgb(228, 221, 211)'
    },
  },
  heading: {
      fontSize: '28px',
      color: 'rgb(25, 26, 23)',
      textAlign: 'left',
      marginLeft: '1em',
      fontFamily: 'Muli',
  }
}));

const header = ["Most Popular", "New this week!"];

export default function SimplePaper() {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper elevation={3}>
        <Cards header={header[0]}></Cards>
        <Cards header={header[1]}></Cards>
      </Paper>
    </div>
  );
}