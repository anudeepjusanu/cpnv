import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import history from 'utils/history';
import MUIDataTable from 'mui-datatables';
import { GetCaseList } from 'services/HrbpService';

const CRT = () => {
  const [caseList, setCaseList] = useState([]);
  const columns = [
    {
      name: 'case_id',
      label: 'Case ID',
    },
    {
      name: 'building_name',
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

  const casesList_Helper = listData => {
    const caseListHelperData = [];
    const data = JSON.parse(JSON.stringify(listData));
    data.forEach(list => {
      caseListHelperData.push({
        ...list,
        case_id: list.case_id ? list.case_id : '--',
        building_name: list.building_name ? list.building_name : '--',
        status: list.case_status ? list.case_status : '--',
      });
    });
    return caseListHelperData;
  };

  const getCaseList = () => {
    GetCaseList()
      .then(res => {
        setCaseList(casesList_Helper(res.data.cases));
      })
      .catch(err => console.log(err));
  };

  useEffect(() => {
    getCaseList();
  }, []);

  return (
    <React.Fragment>
      <Grid className="dynamicTableWrap">
        <MUIDataTable
          data={caseList}
          columns={columns}
          options={options}
          className="dynamicTable"
        />
      </Grid>
    </React.Fragment>
  );
};

export default CRT;
