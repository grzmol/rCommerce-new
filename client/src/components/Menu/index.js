import React from "react";
import {fade, makeStyles} from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';
import AuthWrapper from '../authWrapper';
import AuthService from '../../services/authService';
import ListItem from '@material-ui/core/ListItem';
import ListItemIcon from '@material-ui/core/ListItemIcon';
import ListItemText from '@material-ui/core/ListItemText';
import Drawer from '@material-ui/core/Drawer';
import List from '@material-ui/core/List';
import WbSunny from '@material-ui/icons/WbSunny';
import HomeIcon from '@material-ui/icons/Home';
import {Link} from 'react-router-dom';


const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
  title: {
    flexGrow: 1,
  },
  search: {
    position: 'relative',
    borderRadius: theme.shape.borderRadius,
    backgroundColor: fade(theme.palette.common.white, 0.15),
    '&:hover': {
      backgroundColor: fade(theme.palette.common.white, 0.25),
    },
    marginRight: theme.spacing(100),
    marginLeft: 0,
    width: '100%',
    [theme.breakpoints.up('sm')]: {
      marginLeft: theme.spacing(3),
      width: 'auto',
    },
  },
  searchIcon: {
    padding: theme.spacing(0, 2),
    height: '100%',
    position: 'absolute',
    pointerEvents: 'none',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  inputRoot: {
    color: 'inherit',
  },
  inputInput: {
    padding: theme.spacing(1, 1, 1, 0),
    // vertical padding + font size from searchIcon
    paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
    transition: theme.transitions.create('width'),
    width: '100%',
    [theme.breakpoints.up('md')]: {
      width: '20ch',
    },
  },

}));



const Menu = () => {
  const authService = new AuthService();
  const classes = useStyles();
  const [state, setState] = React.useState({
    isOpen: false,

  });

  const toggleDrawer = (open) => (event) => {
    if (event.type === 'keydown' && (event.key === 'Tab' || event.key === 'Shift')) {
      return;
    }

    setState({ ...state, isOpen: open });
  };

  return (
    <React.Fragment>
      <AppBar position="static">
        <Toolbar>
          <IconButton edge="start" className={classes.menuButton} onClick={toggleDrawer(true)} color="inherit" aria-label="menu">
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" className={classes.title}>
            CalendarApp
        </Typography>
          <div className={classes.grow} />
          <Button color="inherit" onClick={authService.logout}>Logout</Button>
        </Toolbar>
      </AppBar>
      <Drawer open={state.isOpen} onClose={toggleDrawer(false)} anchor="left">
        <List>
          <ListItem button key={'home'}>
            <ListItemIcon><HomeIcon/></ListItemIcon>
            <ListItemText primary={<Link to="/">Home</Link>} />
          </ListItem>
          <ListItem button key={'weather'}>
            <ListItemIcon><WbSunny/></ListItemIcon>
            <ListItemText primary={<Link to="/weather">Weather</Link>} />
          </ListItem>
        </List>
      </Drawer>
    </React.Fragment>

  );
}

export default AuthWrapper(Menu);
