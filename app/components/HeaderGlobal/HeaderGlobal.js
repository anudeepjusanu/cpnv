import React from 'react';
import clsx from 'clsx';
import { makeStyles, Typography, Grid, AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './style.scss';

const drawerWidth = 185;

const useStyles = makeStyles((theme) => ({
    // appBar: {
    //     boxShadow: 'none',
    //     [theme.breakpoints.up('sm')]: {
    //         // width: `calc(100% - ${drawerWidth}px)`,
    //         // marginLeft: drawerWidth,
    //     },
    // },
    // menuButton: {
    //     marginRight: theme.spacing(2),
    // },
    toolbar: theme.mixins.toolbar,
    appBar: {
      boxShadow: 'none',
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
      marginRight: 15,
    },
    backArrowButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    hide: {
      display: 'none',
    },
    drawer: {
      width: drawerWidth,
      flexShrink: 0,
      whiteSpace: 'nowrap',
    }
  }));

function HeaderGlobal(props) {
    const classes = useStyles();
    const handleDrawerOpen = () => {
        props.handleDrawerToggle();
    }

    return (
        <React.Fragment>
            <AppBar color="transparent" position="static" className={clsx(classes.appBar, { [classes.appBarShift]: props.open, })}>
                <Toolbar className="HeaderGlobal">
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        onClick={handleDrawerOpen}
                        edge="start"
                        className={clsx(classes.menuButton, {
                            [classes.hide]: props.open,
                        })}
                        style={{ display: "none"}}
                    >
                        <MenuIcon />
                    </IconButton>
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        className={classes.backArrowButton}
                    >
                        <ArrowBackIcon />
                    </IconButton>
                    <Grid container direction="row" justify="space-between" alignItems="center">
                        <Grid className="header_titleBlk">
                            <Grid className="breadCrumb">
                                Home
                            </Grid>
                            <Typography variant="h3" gutterBottom>{props.config.pageTitle}</Typography>
                        </Grid>
                        
                        {props.config.role === 'HRBP' ?
                            <Grid>
                                <IconButton aria-label="delete"><NotificationsNoneIcon /></IconButton>
                            </Grid>
                        : null}
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default HeaderGlobal;
