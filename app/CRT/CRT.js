import React from 'react';
import { Grid, Button } from '@material-ui/core';
import history from 'utils/history';
import MUIDataTable from 'mui-datatables';

const CRT = () => {
  const columns = [
    {
      name: 'caseId',
      label: 'Case ID',
    },
    {
      name: 'buildingName',
      label: 'Building Name',
    },
    {
      name: 'associateLocation',
      label: 'Associate Location',
    },
    {
      name: 'status',
      label: 'Status',
    },
    {
      name: 'action',
      label: 'Action',
      options: {
        customBodyRender: (value, tableMeta) => (
          <React.Fragment>
            <Button
              variant="contained"
              color="secondary"
              className="btn small"
              size="small"
            >
              Review
            </Button>
          </React.Fragment>
        ),
      },
    },
  ];

  const data = [
    {
      caseId: '163',
      buildingName: 'Cepheid-Building4',
      associateLocation: '1250 borregas Av, Sunnyvale ..',
      status: 'New',
    },
    {
      caseId: '163',
      buildingName: 'Cepheid-Building4',
      associateLocation: '1250 borregas Av, Sunnyvale ..',
      status: 'New',
    },
    {
      caseId: '163',
      buildingName: 'Cepheid-Building4',
      associateLocation: '1250 borregas Av, Sunnyvale ..',
      status: 'New',
    },
    {
      caseId: '163',
      buildingName: 'Cepheid-Building4',
      associateLocation: '1250 borregas Av, Sunnyvale ..',
      status: 'New',
    },
    {
      caseId: '163',
      buildingName: 'Cepheid-Building4',
      associateLocation: '1250 borregas Av, Sunnyvale ..',
      status: 'New',
    },
  ];

  const updateRow = (data, index, e) => {
    history.push({
      pathname: `/crt/case/${data[0]}`,
  });
  };

  const options = {
    filterType: 'checkbox',
    responsive: 'vertical',
    hasIndex: true,
    rowsPerPageOptions: [5, 10, 15, 20],
    rowsPerPage: 10,
    rowHover: true,
    selectableRows: false,
    fixedHeaderOptions: false,
    print: false,
    download: false,
    onRowClick: updateRow,
  };

  return (
    <React.Fragment>
      <Grid className="dynamicTableWrap">
        <MUIDataTable
          data={data}
          columns={columns}
          options={options}
          className="dynamicTable"
        />
      </Grid>
    </React.Fragment>
  );
};

export default CRT;
