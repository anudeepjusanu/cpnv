/* eslint-disable no-undef */
import React, { useState } from 'react';
import { FastField, Field } from 'formik';
import { TextField, makeStyles } from '@material-ui/core';
// import TextField from "material-ui/TextField";
import PropTypes from 'prop-types';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import IconButton from '@material-ui/core/IconButton';
import InputAdornment from '@material-ui/core/InputAdornment';

const useStyles = makeStyles(theme => ({
  endAdornment: {
    padding: '0 !important',
  },
}));

// The Material-UI TextField which will be rendered
const renderTextField = ({
  field, // { name, value, onChange, onBlur }
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    variant="outlined"
    className="inputField"
    size="small"
    fullWidth
    disabled={props.isdisabled}
  />
);

const renderPasswordField = ({
  field, // { name, value, onChange, onBlur }
  ...props
}) => (
  <TextField
    {...field}
    {...props}
    variant="filled"
    fullWidth
    disabled={props.isdisabled}
    inputProps={{
      autoComplete: 'off',
      readOnly: true,
      onFocus: () => {
        document.getElementById(props.id).removeAttribute('readonly');
      },
    }}
    className={`text-field ${field.value ? 'filled' : ''}`}
  />
);

// The Masked Input which will be rendered

const TextInput = props => {
  // The type of TextInput required.
  const selectedField = props.fieldType;
  let field;
  // eslint-disable-next-line prefer-const
  let [showPassword, setShowPassword] = useState(false);

  const showPasswordToggle = () => {
    showPassword = !showPassword;
    setShowPassword(showPassword);
  };

  switch (selectedField) {
    // Email Field
    case 'email':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: custom.startadornment ? (
              <InputAdornment position="start">
                {custom.startadornment}
              </InputAdornment>
            ) : (
              ''
            ),
          }}
        />
      );
      break;

    // Password Field
    case 'password':
      field = (
        <Field
          name={props.fieldName}
          component={renderPasswordField}
          label={props.fieldLabel}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          type={showPassword ? 'text' : 'password'}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <IconButton
                  aria-label="Toggle password visibility"
                  onClick={showPasswordToggle}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            ),
          }}
        />
      );
      break;

    // Number Field
    case 'number':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: props.startadornment ? (
              <InputAdornment position="start">
                {props.startadornment}
              </InputAdornment>
            ) : (
              ''
            ),
          }}
          onKeyDown={e => e.keyCode === 69 && e.preventDefault()}
        />
      );
      break;

    // Plain Text Field
    case 'text':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
        />
      );
      break;
    case 'textWithEndAdorsement':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          // endAdornment={props.endAdornment}
          isdisabled={props.isdisabled}
          // class={props.className}
          InputProps={{
            endAdornment: props.endAdornment ? (
              <InputAdornment position="end" className="endadornment_end">
                {props.endAdornment}
              </InputAdornment>
            ) : (
              ''
            ),
          }}

          // onChange={handleChange('TextMaskCustom')}
        />
      );
      break;

    case 'hidden':
      field = (
        <FastField
          name={props.fieldName}
          component={renderPasswordField}
          label={props.fieldLabel}
          id={props.fieldID}
          type="password"
          isdisabled={props.isdisabled}
        />
      );
      break;

    case 'cardCVV':
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          id={props.fieldID}
          type="password"
          isdisabled={props.isdisabled}
          inputProps={{ maxLength: 4 }}
          onKeyDown={e =>
            ((e.keyCode >= 65 && e.keyCode <= 90) ||
              e.keyCode == 32 ||
              (e.keyCode >= 186 && e.keyCode <= 222) ||
              (e.keyCode >= 106 && e.keyCode <= 111)) &&
            e.preventDefault()
          }
        />
      );
      break;

    // default Field - Plain Text Field is rendered
    default:
      field = (
        <FastField
          name={props.fieldName}
          component={renderTextField}
          label={props.fieldLabel}
          type={props.fieldType}
          id={props.fieldID}
          startadornment={props.startadornment}
          isdisabled={props.isdisabled}
          InputProps={{
            startAdornment: props.startadornment ? (
              <InputAdornment position="start" className="startadornment_start">
                {props.startadornment}
              </InputAdornment>
            ) : (
              ''
            ),
          }}
        />
      );
  }

  return <React.Fragment>{field}</React.Fragment>;
};

// Type Checking for the Props.
/**
 * @description Props
 */
TextInput.propTypes = {
  /**
   * The name property of the field
   */
  fieldName: PropTypes.string,
  /**
   * The id property of the field
   */
  fieldID: PropTypes.string,
  /**
   * The Label which has to be displayed for this field
   */
  fieldLabel: PropTypes.string,
  /**
   * The type of field. Possible values - text, email, password
   */
  fieldType: PropTypes.string,
  /**
   * The mask regular expression
   */
  fieldMask: PropTypes.any,
  /**
   * Whether the field is disabled or not
   */
  isdisabled: PropTypes.bool,
};

// Specify the default Props values.
TextInput.defaultProps = {
  fieldName: '',
  fieldID: '',
  fieldLabel: '',
  fieldType: '',
  fieldMask: '',
  isdisabled: false,
};

export default TextInput;
