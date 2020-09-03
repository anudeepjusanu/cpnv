import React from 'react';
import { makeStyles, Typography, Grid, AppBar, IconButton, Toolbar, Button } from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
import NotificationsNoneIcon from '@material-ui/icons/NotificationsNone';
import './style.scss';

const drawerWidth = 185;

const useStyles = makeStyles((theme) => ({
    appBar: {
        boxShadow: 'none',
        [theme.breakpoints.up('sm')]: {
            // width: `calc(100% - ${drawerWidth}px)`,
            // marginLeft: drawerWidth,
        },
    },
    menuButton: {
        marginRight: theme.spacing(2),
        [theme.breakpoints.up('sm')]: {
            display: 'none',
        },
    },
    toolbar: theme.mixins.toolbar,
}));

function Header(props) {
    const classes = useStyles();

    return (
        <React.Fragment>
            <AppBar color="transparent" position="static" className={classes.appBar}>
                <Toolbar className="Header">
                    {/* <IconButton
                    color="inherit"
                    aria-label="open drawer"
                    edge="start"
                    onClick={props.handleDrawerToggle}
                    className={classes.menuButton}
                    >
                        <MenuIcon />
                    </IconButton> */}
                    <IconButton
                        color="inherit"
                        aria-label="open drawer"
                        edge="start"
                        onClick={props.handleDrawerToggle}
                        className={`${classes.menuButton} backArrow`}
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
                    </Grid>
                </Toolbar>
            </AppBar>
        </React.Fragment>
    )
}

export default Header;
