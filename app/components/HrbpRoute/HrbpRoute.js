/* eslint-disable no-unused-vars */
import React, { useState, useEffect } from 'react';
import { Route, Redirect } from 'react-router-dom';
// import { HrbpLayout } from 'containers/HrbpLayout';
import HrbpLayout from 'containers/HrbpLayout/HrbpLayout';
import axios from 'axios';

const HrbpRoute = ({ component: Component, ...rest }) => {
  const roles = {
    HRM: 'hrm',
    HRBP: 'hrbp',
    CRT: 'crt',
  };
  const [loading, setLoading] = useState(true);
  const user = JSON.parse(localStorage.getItem('user'));
  const [hasVpn, setHasVpn] = useState(false);

  function getIpRangeFromAddressAndNetmask(str) {
    var part = str.split("/"); // part[0] = base address, part[1] = netmask
    var ipaddress = part[0].split('.');
    var netmaskblocks = ["0", "0", "0", "0"];
    if (!/\d+\.\d+\.\d+\.\d+/.test(part[1])) {
      // part[1] has to be between 0 and 32
      netmaskblocks = ("1".repeat(parseInt(part[1], 10)) + "0".repeat(32 - parseInt(part[1], 10))).match(/.{1,8}/g);
      netmaskblocks = netmaskblocks.map(function (el) { return parseInt(el, 2); });
    } else {
      // xxx.xxx.xxx.xxx
      netmaskblocks = part[1].split('.').map(function (el) { return parseInt(el, 10) });
    }
    var invertedNetmaskblocks = netmaskblocks.map(function (el) { return el ^ 255; });
    var baseAddress = ipaddress.map(function (block, idx) { return block & netmaskblocks[idx]; });
    var broadcastaddress = ipaddress.map(function (block, idx) { return block | invertedNetmaskblocks[idx]; });
    return [baseAddress.join('.'), broadcastaddress.join('.')];
  }

  function IPtoNum(ip) {
    return Number(
      ip.split(".")
        .map(d => ("000" + d).substr(-3))
        .join("")
    );
  }
  const ips = ["12.46.111.98/27",
    "12.24.32.0/25",
    "12.0.203.0/26",
    "207.141.15.128/26"]

  useEffect(() => {
    setLoading(true);
    if (!hasVpn) {
      axios
        .get("https://api.ipify.org/?format=json")
        .then(response => {
          for (var i = 0, len = ips.length; i < len; i++) {
            let range = getIpRangeFromAddressAndNetmask(ips[i]);
            if (IPtoNum(range[0]) < IPtoNum(response.data.ip) && IPtoNum(range[1]) > IPtoNum(response.data.ip)) {
              setHasVpn(true);
              break;
            }
          }
          setLoading(false);
        })
        .catch(error => {
          console.log(error);
        });
    } else {
      setLoading(false);
    }

  }, [rest.location]);

  return (
    <React.Fragment>
      <Route
        {...rest}
        render={props =>
          !loading ?
            user && user.role && hasVpn ? (
              user.role === rest.config.role ? (
                <HrbpLayout {...props} {...rest}>
                  <Component {...props} />
                </HrbpLayout>
              ) : (
                  <Redirect
                    to={{
                      pathname: `/${roles[user.role]}/caseList`,
                      state: { from: props.location },
                    }}
                  />
                )
            ) : (
                <Redirect
                  to={{ pathname: '/userLogin', state: { from: props.location } }}
                />
              ) : <div>Loading</div>
        }
      />
    </React.Fragment>
  );
};

export default HrbpRoute;
