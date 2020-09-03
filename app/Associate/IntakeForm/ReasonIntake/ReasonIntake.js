import React, { useState, useEffect, useContext } from 'react';
import {
  Grid,
  Hidden,
  Typography,
  MenuItem,
  List,
  ListItem,
  ListItemText,
  Menu,
  IconButton
} from '@material-ui/core';
import ExposedUndiagnosed from './ExposedUndiagnosed';
import Diagnosed from './Diagnosed';
import ShowingSymptoms from './ShowingSymptoms';
import OutsideQuarantine from './OutsideQuarantine';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import './style.scss';
import FormContext from 'FormContext';
import _ from 'lodash';
import ArrowBackIcon from '@material-ui/icons/ArrowBack';

const intakeTabListOptionsData = [
  {
    label: 'Exposed/Undiagnosed',
    desp:
      'Any person in close prolonged contact in the last 14 days with someone positively diagnosed with',
    tabType: 'Exposed',
  },
  {
    label: 'COVID-19 Diagnosed',
    desp: 'Any person diagnosed with COVID-19 by a health care provider',
    tabType: 'Diagnosed',
  },
  {
    label: 'Showing Symptoms',
    desp:
      'Fever or chills, cough, shortness of breath or difficulty breathing, fatigue, muscle or body aches, headche, new loss of taste or smell...',
    tabType: 'Symptoms',
  },
  {
    label: 'Outside Ring of Quarantine',
    desp: 'Precautionary only, not required to quarantine',
    tabType: 'Quarantine',
  },
];

const ReasonIntake = props => {
  const { resonForIntake } = useContext(FormContext);
  const [tabContent, setTabContent] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  const index = _.findIndex(intakeTabListOptionsData, function(o) {
    return o.tabType === resonForIntake.reason;
  });
  const [selectedIndex, setSelectedIndex] = useState(
    index >= 0 ? intakeTabListOptionsData[index] : intakeTabListOptionsData[0],
  );

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const switchTabHandler = data => {
    switch (data.tabType) {
      case 'Exposed':
        return setTabContent(
          <ExposedUndiagnosed
            handleNext={e => {
              props.handleNext('reasonIntake');
            }}
            handleBack={e => {
              props.handleBack(e);
            }}
            selectedIndex={selectedIndex}
            reason={data.tabType}
          />,
        );
        break;
      case 'Diagnosed':
        return setTabContent(
          <Diagnosed
            handleNext={e => {
              props.handleNext('reasonIntake');
            }}
            handleBack={e => {
              props.handleBack(e);
            }}
            selectedIndex={selectedIndex}
            reason={data.tabType}
          />,
        );
        break;
      case 'Symptoms':
        return setTabContent(
          <ShowingSymptoms
            handleNext={e => {
              props.handleNext('reasonIntake');
            }}
            handleBack={e => {
              props.handleBack(e);
            }}
            selectedIndex={selectedIndex}
            reason={data.tabType}
          />,
        );
        break;
      case 'Quarantine':
        return setTabContent(
          <OutsideQuarantine
            handleNext={e => {
              props.handleNext('reasonIntake');
            }}
            handleBack={e => {
              props.handleBack(e);
            }}
            selectedIndex={selectedIndex}
            reason={data.tabType}
          />,
        );
      default:
        break;
    }
  };

  const handleMenuItemClick = (event, data) => {
    setSelectedIndex(data);
    switchTabHandler(data);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleTabClick = (e, data) => {
    console.log('tab', e, data);
    setSelectedIndex(data);
    switchTabHandler(data);
  };

  useEffect(() => {
    switchTabHandler(selectedIndex);
  }, [selectedIndex]);

  return (
    <React.Fragment>
      <IconButton
        color="inherit"
        aria-label="open drawer"
        edge="start"
        onClick={()=>props.handleBack(2)}
        className={`headerBackArrow`}
      >
        <ArrowBackIcon />
      </IconButton>
      <Grid container>
        <Grid item xs={12}>
          <Typography variant="overline" gutterBottom>
            Select reason
          </Typography>
        </Grid>
        <Grid item md={11}>
          <Grid className="intakeTabListWrap">
            <Hidden smDown implementation="css">
              <Grid container spacing={2}>
                {intakeTabListOptionsData.map(data => (
                  <Grid item md={3} key={data.label}>
                    <Grid
                      className={`intakeTabList ${
                        selectedIndex.tabType === data.tabType ? 'active' : null
                      }`}
                      onClick={() => {
                        handleTabClick(true, data);
                      }}
                    >
                      <Typography variant="h5" gutterBottom>
                        {data.label}
                      </Typography>
                      <Typography variant="body2">{data.desp}</Typography>
                    </Grid>
                  </Grid>
                ))}
              </Grid>
            </Hidden>
            {/* Mobile dropdown view */}
            <Hidden mdUp implementation="css">
              <Grid className="mobileDrop">
                <List component="nav" aria-label="Device settings">
                  <ListItem
                    button
                    aria-haspopup="true"
                    aria-controls="lock-menu"
                    aria-label="when device is locked"
                    onClick={handleClickListItem}
                    className="mobList"
                  >
                    <ListItemText
                      primary={selectedIndex.label}
                      secondary={selectedIndex.desp}
                    />
                    <Grid className="dropArrow">
                      <ArrowDownwardIcon />
                    </Grid>
                  </ListItem>
                </List>
                <Menu
                  id="lock-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={Boolean(anchorEl)}
                  onClose={handleClose}
                >
                  {intakeTabListOptionsData.map(option => (
                    <MenuItem
                      key={option.label}
                      disabled={option.label === selectedIndex.label}
                      selected={option.label === selectedIndex.label}
                      onClick={event => handleMenuItemClick(event, option)}
                    >
                      {option.label}
                    </MenuItem>
                  ))}
                </Menu>
              </Grid>
            </Hidden>

            <Grid container>
              <Grid item xs={12} className="intakeTabContent">
                {tabContent}
              </Grid>
            </Grid>
          </Grid>
        </Grid>
      </Grid>
    </React.Fragment>
  );
};

export default ReasonIntake;
