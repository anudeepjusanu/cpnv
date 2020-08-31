import React, { useState, useEffect } from 'react';
import { Grid, Button } from '@material-ui/core';
import history from 'utils/history';
import MUIDataTable from 'mui-datatables';
import Loader from 'react-loader-spinner';
import { GetCaseList } from 'services/HrbpService';

const HRM = () => {
  const [caseList, setCaseList] = useState([]);
  const [showLoading, setShowLoading] = useState(false);
  const columns = [
    {
      name: 'case_id',
      label: 'Case ID',
    },
    {
      name: 'employeName',
      label: 'Employee Name',
    },
    {
      name: 'email',
      label: 'Email',
    },
    {
      name: 'manager',
      label: 'Manager',
    },
    {
      name: 'emergency_conatct',
      label: 'Emergency Contact',
    },
    {
      name: 'building_name',
      label: 'Building Name',
    },
    {
      name: 'recommendations',
      label: 'Recommendations',
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
      pathname: `/hrm/case/${data[0]}`,
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
        employeName: list.first_name ? list.first_name : '--',
        email: list.email ? list.email : '--',
        manager: list.manager_name ? list.manager_name : '--',
        emergency_conatct: list.emergency_conatct
          ? list.emergency_conatct
          : '--',
        building_name: list.building_name ? list.building_name : '--',
        recommendations: list.recommendations ? list.recommendations : '--',
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
        console.log(err)
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

export default HRM;
