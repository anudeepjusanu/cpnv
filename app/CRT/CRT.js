import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import history from 'utils/history';
import MUIDataTable from 'mui-datatables';
import Loader from 'react-loader-spinner';
import { GetCaseList } from 'services/HrbpService';

const CRT = () => {
  const [caseList, setCaseList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const columns = [
    {
      name: 'case_id',
      label: 'Case ID',
      options: {
        filter: false,
        sort: false,
        viewColumns: false,
      },
    },
    {
      name: 'company_buildings',
      label: 'Building Name',
    },
    {
      name: 'area',
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
      state: { status: data[3] },
    });
  };

  const options = {
    filterType: 'dropdown',
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
        company_buildings: list.company_buildings
          ? list.company_buildings
          : '--',
        associateLocation: '--',
        status: list.case_status ? list.case_status : '--',
      });
    });
    return caseListHelperData;
  };

  const getCaseList = () => {
    setShowLoading(true);
    GetCaseList()
      .then(res => {
        setShowLoading(false);
        setCaseList(casesList_Helper(res.data.cases));
      })
      .catch(err => {
        setShowLoading(false);
        console.log(err);
      });
  };

  useEffect(() => {
    getCaseList();
  }, []);

  return (
    <React.Fragment>
      {showLoading && (
        <Grid className="loader">
          <Loader type="ThreeDots" color="#127AC2" height={80} width={80} />
        </Grid>
      )}
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
