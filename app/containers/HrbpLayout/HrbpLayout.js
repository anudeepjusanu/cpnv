import React from 'react';
import clsx from 'clsx';
import {
  makeStyles,
  useTheme,
  Typography,
  Grid,
  AppBar,
  CssBaseline,
  Divider,
  Drawer,
  Hidden,
  IconButton,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Toolbar,
} from '@material-ui/core';
import { HeaderGlobal } from 'components/HeaderGlobal';
import history from 'utils/history';
import Logo from 'images/Cepheid-logo-white.svg';
import MenuIcon from '@material-ui/icons/Menu';
import ChevronLeftIcon from '@material-ui/icons/ChevronLeft';
import ChevronRightIcon from '@material-ui/icons/ChevronRight';
import MailIcon from '@material-ui/icons/Mail';
import FullscreenIcon from '@material-ui/icons/Fullscreen';
import ListIcon from '@material-ui/icons/List';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import FavLogo from 'images/cepheid-icon.png';
import LockOpenIcon from '@material-ui/icons/LockOpen';
import HomeIcon from '@material-ui/icons/Home';

const drawerWidth = 240;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
    height: '100%',
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(['width', 'margin'], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: 'none',
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: 'nowrap',
    // background: theme.palette.secondary.dark,
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create('width', {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: 'hidden',
    width: theme.spacing(5) + 1,
    [theme.breakpoints.up('sm')]: {
      width: theme.spacing(7) + 1,
    },
  },
  toolbar: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'flex-end',
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
}));

const HrbpLayout = props => {
  const classes = useStyles();
  const theme = useTheme();
  const [open, setOpen] = React.useState(false);
  const handleDrawerOpen = () => {
    setOpen(true);
  };

  const handleDrawerClose = () => {
    setOpen(false);
  };

  const roles = {
    HRM: 'hrm',
    HRBP: 'hrbp',
    CRT: 'crt',
  };

  const logout = () => {
    localStorage.removeItem('okta-token-storage');
    localStorage.removeItem('okta-cache-storage');
    localStorage.removeItem('okta-pkce-storage');
    localStorage.removeItem('user');
    history.push(`/userLogin`);
    window.location.reload();
  };

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />

        {/* Sidebar component here */}
        <Drawer
          variant="permanent"
          className={clsx(classes.drawer, {
            [classes.drawerOpen]: open,
            [classes.drawerClose]: !open,
          })}
          classes={{
            paper: clsx({
              [classes.drawerOpen]: open,
              [classes.drawerClose]: !open,
            }),
          }}
        >
          <div className={classes.toolbar} style={{ display: 'none' }}>
            <IconButton onClick={handleDrawerClose}>
              {theme.direction === 'rtl' ? (
                <ChevronRightIcon />
              ) : (
                <ChevronLeftIcon />
              )}
            </IconButton>
          </div>
          <Grid className="menuListWrap">
            <Grid className="logoSmall">
              <img src={FavLogo} alt="logo" width="30" />
            </Grid>
            <Grid className="menuList">
              <ListItem className="menuListLi" button>
                <ListItemIcon className="menuListIcon">
                  <HomeIcon />
                </ListItemIcon>
                <ListItemText primary={'Home'} />
              </ListItem>
              <ListItem
                className="menuListLi"
                button
                onClick={() => {
                  history.push(`/${roles[props.config.role]}/caseList`);
                }}
              >
                <ListItemIcon className="menuListIcon">
                  <ListIcon />
                </ListItemIcon>
                <ListItemText primary={'List of Cases'} />
              </ListItem>
              <ListItem className="menuListLi" button onClick={logout}>
                <ListItemIcon className="menuListIcon">
                  <ExitToAppIcon />
                </ListItemIcon>
                <ListItemText primary={'Logout'} />
              </ListItem>
            </Grid>
          </Grid>
        </Drawer>

        {/* Main content here */}
        <main className={`${classes.content} contentWrap`}>
          {/* Header here */}
          <HeaderGlobal
            drawerWidth={drawerWidth}
            handleDrawerToggle={handleDrawerOpen}
            config={props.config}
            open={open}
            location={props.location}
          />

          {/* <div className={`${classes.toolbar} mainTopSpace`} /> */}
          <Grid className="mainContentWrapper">{props.children}</Grid>
        </main>
      </div>
    </React.Fragment>
  );
};

export default HrbpLayout;
