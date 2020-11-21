const caseController = {};
var service = require('../../services');
var nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 587,
  secure: false, // true for 465, false for other ports
  auth: {
    user: 'neevtestuser@gmail.com', // generated ethereal user
    pass: 'Vinisoft@123', // generated ethereal password
  },
});

caseController.getCases = getCases;
caseController.getCase = getCase;
caseController.getAssociateCase = getAssociateCase;
caseController.addCase = addCase;
caseController.updateCase = updateCase;
caseController.updateCaseReason = updateCaseReason;
caseController.updateCaseAssociates = updateCaseAssociates;
caseController.updateCaseNonAssociates = updateCaseNonAssociates;
caseController.changeToReview = changeToReview;
caseController.addCRTReview = addCRTReview;
caseController.addHRMReview = addHRMReview;
caseController.caseFinalAction = caseFinalAction;
caseController.caseClose = caseClose;
caseController.getUserLogin = getUserLogin;
caseController.getCaseReviews = getCaseReviews;
caseController.getActiveCRTUsers = getActiveCRTUsers;
caseController.testEmail = testEmail;
caseController.remindCRT = remindCRT;

module.exports = caseController;

function getCases(req, res) {
  service.caseService
    .getCases(req.headers.email)
    .then(data => {
      res.send({ status: true, message: '', cases: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function getCaseReviews(req, res) {
  service.caseService
    .getCaseReviews(req.params.caseId)
    .then(data => {
      res.send({ status: true, message: '', reviews: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function getCase(req, res) {
  service.caseService
    .getCase(req.params.caseId, req.headers.email)
    .then(data => {
      if (data.employee_symptoms) {
        data.employee_symptoms = JSON.parse(data.employee_symptoms);
      }
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function getAssociateCase(req, res) {
  service.caseService
    .getCase(req.params.caseId, 'None')
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function addCase(req, res) {
  service.caseService
    .addCase(req.body)
    .then(async data => {
      let hrbp_users = await service.caseService.getActiveHRBPUsersByDepartmentId(
        req.body.department_id,
      );
      var messageObj = {
        from: 'covidtrack@cepheid.com', // sender address
        to: '', // list of receivers
        subject: `Case ID - ${data.case_id
          } - New Covid-19 Intake Form submission in your department`, // Subject line
        html: ``, // plain text body
      };
      for (var i = 0; i < hrbp_users.length; i++) {
        var userObj = hrbp_users[i];
        //messageObj.to = userObj.email;
        messageObj.to = "0922srinivas@gmail.com";
        messageObj.html = `<div>
      <p>Dear ${userObj.first_name},</P>
      <p>You have received a new Covid-19 intake application with Case Id - ${data.case_id
          } from an Associate in your department.</p>
      <p>Please login at https://covidtrack.cepheid.com with your Cepheid email
      and password to review the form and submit for further processing with
      CRT and HRM Team</P>
      <p>Please ignore this email if you have already reviewed the application.</P>
      <p>Best regards,<br/>
      Covid-19 Track and Trace Team<br/>
      Cepheid, Inc.<br/>
      This is an automated system Email. Please do not reply to this email.</P>
      </div>`;
        let info = await transporter.sendMail(messageObj);
      }
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function updateCase(req, res) {
  service.caseService
    .updateCase(req.params.caseId, req.body)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function updateCaseReason(req, res) {
  var caseData = {
    reason: req.body.reason,
  };
  if (caseData.reason == 'Exposed') {
    caseData.exposure_date = req.body.exposure_date;
    caseData.exposure_describe = req.body.exposure_describe;
  } else if (caseData.reason == 'Diagnosed') {
    caseData.is_positive_diagnosis = req.body.is_positive_diagnosis;
    caseData.diagnosis_received_date = req.body.diagnosis_received_date;
    caseData.diagnosis_test_date = req.body.diagnosis_test_date;
    caseData.employee_symptoms = req.body.employee_symptoms
      ? JSON.stringify(req.body.employee_symptoms)
      : JSON.stringify('[]');
  } else if (caseData.reason == 'Symptoms') {
    caseData.symptoms_began_date = req.body.symptoms_began_date;
    caseData.symptoms_respiratory = req.body.symptoms_respiratory;
    caseData.have_consult_doctor = req.body.have_consult_doctor;
    caseData.consult_date = req.body.consult_date;
    caseData.doctor_comment = req.body.doctor_comment;
  } else if (caseData.reason == 'Quarantine') {
  }
  caseData.company_buildings = req.body.company_buildings
    ? req.body.company_buildings
    : null;
  caseData.additional_info = req.body.additional_info
    ? req.body.additional_info
    : null;

  service.caseService
    .updateCase(req.params.caseId, caseData)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function updateCaseAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        case_id: req.params.caseId,
        is_associate: '1',
        first_name: row.first_name,
        last_name: row.last_name,
        has_social_distance: row.has_social_distance,
        ppe_worn: row.ppe_worn,
        duration: row.duration,
        created_on: 'NOW()',
      });
    }
  }
  service.caseService
    .addCaseAssociates(objData)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function updateCaseNonAssociates(req, res) {
  if (req.body) {
    var objData = [];
    for (var i = 0; i < req.body.length; i++) {
      var row = req.body[i];
      objData.push({
        case_id: req.params.caseId,
        is_associate: '0',
        first_name: row.first_name,
        last_name: row.last_name,
        company_name: row.company_name,
        details: row.details,
        created_on: 'NOW()',
      });
    }
  }
  service.caseService
    .addCaseAssociates(objData)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function changeToReview(req, res) {
  var objData = {
    case_status: 'Under Review',
    review_additional_info: req.body.review_additional_info,
  };
  service.caseService
    .updateCase(req.params.caseId, objData)
    .then(async data => {
      let crt_users = await service.caseService.getActiveCRTUsers();
      var messageObj = {
        from: 'covidtrack@cepheid.com', // sender address
        to: '', // list of receivers
        subject: `Action needed - New Covid-19 intake application for your review Case id - ${req.params.caseId
          } `, // Subject line
        html: ``,
      };
      for (var i = 0; i < crt_users.length; i++) {
        var userObj = crt_users[i];
        //messageObj.to = userObj.email;
        messageObj.to = "0922srinivas@gmail.com";
        messageObj.html = `<div>
      <p>Dear ${userObj.first_name},</p>
      <p>You have received a new Covid-19 intake application with Case ID - ${req.params.caseId
          } for your review from the HR team.</p>
      <p>Please login at https://covidtrack.cepheid.com with your Cepheid email
      and password to review the form and submit for further processing with
      HR Team</p>
      <p>Please ignore this email if you have already reviewed the application.</p>
      <p>Best regards,<br/>
      Covid-19 Track and Trace Team<br/>
      Cepheid, Inc.<br/>
      This is an automated system Email. Please do not reply to this email.</P>
      </div>`;
        //let info = await transporter.sendMail(messageObj);
      }
      res.send({ status: true, message: '', case: data, crt: crt_users });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function addCRTReview(req, res) {
  req.body.case_id = req.params.caseId;
  req.body.email = req.headers.email;
  service.caseService
    .addCRTReview(req.body)
    .then(async data => {
      if (data.affectedRows && data.affectedRows >= 1) {
        let hrm_users = await service.caseService.getActiveHRMUsers();
        var messageObj = {
          from: 'covidtrack@cepheid.com', // sender address
          to: '', // list of receivers
          subject: `Action needed - New Covid-19 intake Application - Case id - ${req.body.case_id
            } `, // Subject line
          html: ``, // plain text body
        };
        for (var i = 0; i < hrm_users.length; i++) {
          var userObj = hrm_users[i];
          //messageObj.to = userObj.email;
          messageObj.to = "0922srinivas@gmail.com";
          messageObj.html = `<div>
        <p>Dear ${userObj.first_name},</p>
        <p>You have received a new Covid-19 intake application with Case ID - ${req.body.case_id
            } reviewed by the CRT team.</p>
        <p>Please login at https://covidtrack.cepheid.com with your Cepheid email
        and password to review the recommendation provided by the CRT team
        and give the final recommendation from your side.</p>
        <p>HRBP &amp; HRLOA team would take further action based on the final
        recommendation you provide.</p>
        <p>Please ignore this email if you have already reviewed the application.</p>
        <p>Best regards,<br/>
        Covid-19 Track and Trace Team<br/>
        Cepheid, Inc.<br/>
        This is an automated system Email. Please do not reply to this email.</P>
        </div>`;
          //let info = await transporter.sendMail(messageObj);
        }
      }
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function addHRMReview(req, res) {
  req.body.case_id = req.params.caseId;
  service.caseService
    .addHRMReview(req.body)
    .then(async data => {
      if (data.affectedRows && data.affectedRows >= 1) {
        let active_users = await service.caseService.getActiveHRBPAndHRLOAUsers();
        var messageObj = {
          from: 'covidtrack@cepheid.com', // sender address
          to: '', // list of receivers
          subject: `Case Id - ${req.body.case_id}: Final Decision Taken.`, // Subject line
          html: ``,
        };
        for (var i = 0; i < active_users.length; i++) {
          var userObj = active_users[i];
          //messageObj.to = userObj.email;
          messageObj.to = "0922srinivas@gmail.com";
          messageObj.html = `<div>
        <p>Dear ${userObj.first_name},</P>
        <p>The CRT and HRM team has provided their recommendation and final
        actions needed for the application submitted by the Associate with Case ID: ${req.body.case_id
            } </P>
        <p>Please take further actions based on the recommendation provided by HRM.</P>
        <p>Please ignore this email if you have already taken action on this.</P>
        <p>Best regards,<br/>
        Covid-19 Track and Trace Team<br/>
        Cepheid, Inc.<br/>
        This is an automated system Email. Please do not reply to this email.</P>
        </div>`;
          //let info = await transporter.sendMail(messageObj);
        }
      }
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function caseFinalAction(req, res) {
  var objData = {
    case_status: 'Final Action',
    final_test_result: req.body.final_test_result
      ? req.body.final_test_result
      : null,
    final_quarantine_started: req.body.final_quarantine_started
      ? req.body.final_quarantine_started
      : null,
    final_quarantine_start_date: req.body.final_quarantine_start_date
      ? req.body.final_quarantine_start_date
      : null,
    final_quarantine_end_date: req.body.final_quarantine_end_date
      ? req.body.final_quarantine_end_date
      : null,
    final_other_info: req.body.final_other_info
      ? req.body.final_other_info
      : null,
  };
  service.caseService
    .updateCase(req.params.caseId, objData)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function caseClose(req, res) {
  var objData = {
    case_status: 'Case Closed',
  };
  service.caseService
    .updateCase(req.params.caseId, objData)
    .then(data => {
      res.send({ status: true, message: '', case: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function getUserLogin(req, res) {
  var objData = {
    email: req.body.email,
    pwd: req.body.password,
  };
  service.caseService
    .getUserLogin(objData)
    .then(data => {
      data = data[0] ? data[0] : {};
      res.send({ status: true, message: '', user: data });
    })
    .catch(error => {
      res.status(400).send({ status: false, error: error.message });
    });
}

function getActiveCRTUsers(req, res) {
  service.caseService.getActiveCRTUsers().then(data => {
    res.send({ status: true, message: '', users: data });
  }).catch(error => {
    res.status(400).send({ status: false, error: error.message });
  });
}

function testEmail(req, res) {
  var messageObj = {
    from: 'covidtrack@cepheid.com', // sender address
    to: 'anudeep.duri@cepheid.com', // list of receivers
    subject: 'COVID TEST', // Subject line
    html: 'test',
  };
  transporter.sendMail(messageObj, function (error, info) {
    if (error) {
      console.log(error);
      res.send(error);
    } else {
      console.log('Email sent: ' + info.response);
      res.send('success');
    }
  });
}

function remindCRT(req, res) {
  if (req.body.emails && req.body.emails.length) {
    var messageObj = {
      from: 'covidtrack@cepheid.com', // sender address
      to: req.body.emails.toString(), // list of receivers
      subject: 'Case Id - ' + req.params.caseId, // Subject line
      html: req.body.message,
    };
    transporter.sendMail(messageObj, function (error, info) {
      if (error) {
        console.log(error);
        res.send(error);
      } else {
        console.log('Email sent: ' + info.response);
        res.send('success');
      }
    });
  } else {
    res.status(400).send({ status: false, error: 'Emails cannot be empty' });
  }
}

transporter.verify(function (error, success) {
  if (error) {
    console.log('ERROR');
    console.log(error);
  } else {
    console.log('Server is ready to take our messages');
  }
});
