import React from 'react';

const Layout = props => {
  return (
    <React.Fragment>
      <h1>HEADER</h1>
      {props.children}
    </React.Fragment>
  );
};

export default Layout;
