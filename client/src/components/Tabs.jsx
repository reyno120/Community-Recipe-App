import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import Typography from '@material-ui/core/Typography';
import Box from '@material-ui/core/Box';

function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box p={3}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.any.isRequired,
  value: PropTypes.any.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    backgroundColor: theme.palette.background.paper,
    width: '480px',
    marginLeft: '27em',
    marginTop: '3em'
  },
}));

export default function SimpleTabs(props) {
  const classes = useStyles();
  const [value, setValue] = React.useState(0);

  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static" style={{backgroundColor: 'rgb(254, 98, 57)'}}>
        <Tabs TabIndicatorProps={{style: {backgroundColor: 'black'}}} value={value} onChange={handleChange}>
          <Tab style={{color: 'black'}} label="Bio" {...a11yProps(0)} />
          <Tab style={{color: 'black'}} label="Followers" {...a11yProps(1)} />
          <Tab style={{color: 'black'}} label="Following" {...a11yProps(2)} />
        </Tabs>
      </AppBar>
      <TabPanel value={value} index={0}>
        Bio
      </TabPanel>
      <TabPanel value={value} index={1}>
        <ul style={{listStyle: 'none'}}>
            {props.following.map((user) =>
                <li key={user}>{user}</li>
            )}
        </ul>
      </TabPanel>
      <TabPanel value={value} index={2}>
        <ul style={{listStyle: 'none'}}>
            {props.followers.map((user) =>
                <li key={user}>{user}</li>
            )}
        </ul>
      </TabPanel>
    </div>
  );
}