import React from 'react';
import PropTypes from 'prop-types';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Avatar from '@material-ui/core/Avatar';
import List from '@material-ui/core/List';
import ListItem from '@material-ui/core/ListItem';
import ListItemAvatar from '@material-ui/core/ListItemAvatar';
import ListItemText from '@material-ui/core/ListItemText';
import DialogTitle from '@material-ui/core/DialogTitle';
import Dialog from '@material-ui/core/Dialog';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import TextField from '@material-ui/core/TextField';
import PersonIcon from '@material-ui/icons/Person';
import AddIcon from '@material-ui/icons/Add';
import Typography from '@material-ui/core/Typography';
import { blue } from '@material-ui/core/colors';

const useStyles = makeStyles({
  avatar: {
    backgroundColor: blue[100],
    color: blue[600],
  },
});

function SimpleDialog(props) {
  const classes = useStyles();
  const { onClose, selectedValue, open } = props;

  const handleClose = () => {
    onClose(selectedValue);
  };

  const handleListItemClick = (value) => {
    onClose(value);
  };

  return (
    <Dialog onClose={handleClose} aria-labelledby="simple-dialog-title" open={open}>
        <DialogTitle id="simple-dialog-title" style={{textAlign: 'center'}}>Login</DialogTitle>
        <DialogContent>
            <form>
                <TextField
                    autoFocus
                    margin="dense"
                    name="username"
                    type="text"
                    label="Username"
                    onChange={setUsername}
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="password"
                    type="password"
                    label="Password"
                    required
                    style={{display: 'block', marginBottom: '1em'}}
                />
                <Button variant="contained" style={{margin: 'auto auto 2em 7em'}}>Login</Button>
                <DialogContentText>Don't have an account? Register below!</DialogContentText>
                <TextField
                    autoFocus
                    margin="dense"
                    name="registerUser"
                    type="text"
                    label="Username"
                    required
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="registerEmail"
                    type="email"
                    label="Email"
                    required
                    style={{display: 'block'}}
                />
                <TextField
                    autoFocus
                    margin="dense"
                    name="registerPass"
                    type="password"
                    label="Password"
                    required
                    style={{display: 'block', marginBottom: '2em'}}
                />
                <Button variant="contained" style={{margin: 'auto auto 2em 7em'}}>Register</Button>
            </form>
        </DialogContent>
    </Dialog>
  );
}

SimpleDialog.propTypes = {
  onClose: PropTypes.func.isRequired,
  open: PropTypes.bool.isRequired,
  selectedValue: PropTypes.string.isRequired,
};

export default function SimpleDialogDemo() {
  const [open, setOpen] = React.useState(false);
  const [username, setUsername] = React.useState();
  const [password, setPassword] = React.useState();
  const [email, setEmail] = React.useState();

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = (value) => {
    setOpen(false);
  };

  return (
    <div>
      <Button onClick={handleClickOpen}>
        Login
      </Button>
      <SimpleDialog open={open} onClose={handleClose} />
    </div>
  );
}