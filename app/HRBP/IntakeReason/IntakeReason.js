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
} from '@material-ui/core';
import ExposedUndiagnosed from './Undiagnosed';
import Diagnosed from './Diagnosed';
import ShowingSymptoms from './ShowingSymptoms';
import OutsideQuarantine from './OutsideQuarantine';
import ArrowDownwardIcon from '@material-ui/icons/ArrowDownward';
import './style.scss';
import _ from 'lodash';

const intakeTabListOptionsData = [
  {
    label: 'Exposed/Undiagnosed',
    desp: 'Please describe in detail circumstances of the exposure including where you were, was PPE worn, how do you know you were exposed?',
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
];

const IntakeReason = props => {
  const { caseDetails } = props;
  const [tabContent, setTabContent] = useState();
  const [anchorEl, setAnchorEl] = React.useState(null);
  let index = _.findIndex(intakeTabListOptionsData, function(o) {
    return o.tabType === caseDetails.reason;
  });
  if (index < 0) {
    index = 0;
  }
  const [selectedIndex, setSelectedIndex] = useState(
    intakeTabListOptionsData[index],
  );

  const handleClickListItem = event => {
    setAnchorEl(event.currentTarget);
  };

  const switchTabHandler = data => {
    switch (data.tabType) {
      case 'Exposed':
        return setTabContent(
          <ExposedUndiagnosed
            handleClose={props.handleClose}
            selectedIndex={selectedIndex}
            caseDetails={caseDetails}
            reason={data.tabType}
          />,
        );
        break;
      case 'Diagnosed':
        return setTabContent(
          <Diagnosed
            handleClose={props.handleClose}
            selectedIndex={selectedIndex}
            caseDetails={caseDetails}
            reason={data.tabType}
          />,
        );
        break;
      case 'Symptoms':
        return setTabContent(
          <ShowingSymptoms
            handleClose={props.handleClose}
            selectedIndex={selectedIndex}
            caseDetails={caseDetails}
            reason={data.tabType}
          />,
        );
        break;
      case 'Quarantine':
        return setTabContent(
          <OutsideQuarantine
            handleClose={props.handleClose}
            selectedIndex={selectedIndex}
            caseDetails={caseDetails}
            reason={data.tabType}
          />,
        );
      default:
        break;
    }
  };

  const handleMenuItemClick = (event, data) => {
    console.log(data);
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

export default IntakeReason;
