import React from 'react';
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
import { Header } from 'components/Header';
import Logo from 'images/Cepheid-logo-white.svg';
import history from 'utils/history';

const drawerWidth = 185;

const useStyles = makeStyles(theme => ({
  root: {
    display: 'flex',
  },
  drawer: {
    [theme.breakpoints.up('sm')]: {
      width: drawerWidth,
      flexShrink: 0,
    },
  },
  appBar: {
    boxShadow: 'none',
    [theme.breakpoints.up('sm')]: {
      width: `calc(100% - ${drawerWidth}px)`,
      marginLeft: drawerWidth,
    },
  },
  menuButton: {
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('sm')]: {
      display: 'none',
    },
  },
  // necessary for content to be below app bar
  toolbar: theme.mixins.toolbar,

  drawerPaper: {
    width: drawerWidth,
    background: theme.palette.secondary.main,
    color: theme.palette.secondary.contrastText,
    padding: '15px 0',
  },
  content: {
    flexGrow: 1,
  },
  logo: {
    textAlign: 'center',
    marginBottom: '30px',
  },
}));

const Layout = props => {
  const { window } = props;
  const classes = useStyles();
  const theme = useTheme();
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const logout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    history.push(`/`);
  };

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <React.Fragment>
      <div className={classes.root}>
        <CssBaseline />

        {/* Sidebar component here */}
        <nav className={classes.drawer}>
          {/* Mobile MenuBar */}
          <Hidden smUp implementation="css">
            <Drawer
              container={container}
              variant="temporary"
              anchor={theme.direction === 'rtl' ? 'right' : 'left'}
              open={mobileOpen}
              onClose={handleDrawerToggle}
              classes={{
                paper: classes.drawerPaper,
              }}
              ModalProps={{
                keepMounted: true, // Better open performance on mobile.
              }}
            >
              <Grid container>
                <Grid item xs={12} className={classes.logo}>
                  <img src={Logo} alt="Cepheid" />
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem button className="MenuList">
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button className="MenuList active">
                      <ListItemText primary="Intake Form" />
                    </ListItem>
                    <ListItem button className="MenuList" onClick={logout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Drawer>
          </Hidden>
          {/* Desktop MenuBar */}
          <Hidden xsDown implementation="css">
            <Drawer
              classes={{
                paper: classes.drawerPaper,
              }}
              variant="permanent"
              open
            >
              <Grid container>
                <Grid item xs={12} className={classes.logo}>
                  <img src={Logo} alt="Cepheid" />
                </Grid>
                <Grid item xs={12}>
                  <List>
                    <ListItem button className="MenuList">
                      <ListItemText primary="Home" />
                    </ListItem>
                    <ListItem button className="MenuList active">
                      <ListItemText primary="Intake Form" />
                    </ListItem>
                    <ListItem button className="MenuList" onClick={logout}>
                      <ListItemText primary="Logout" />
                    </ListItem>
                  </List>
                </Grid>
              </Grid>
            </Drawer>
          </Hidden>
        </nav>

        {/* Main content here */}
        <main className={`${classes.content} contentWrap`}>
          {/* Header here */}
          {!props.config.hideHeader && 
            <Header
              drawerWidth={drawerWidth}
              handleDrawerToggle={handleDrawerToggle}
              config={props.config}
            />
          }

          {/* <div className={`${classes.toolbar} mainTopSpace`} /> */}
          <Grid className="mainContentWrapper">{props.children}</Grid>
        </main>
      </div>
    </React.Fragment>
  );
};

export default Layout;
