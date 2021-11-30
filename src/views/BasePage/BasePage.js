import React, { useState } from 'react';
import PropTypes from 'prop-types';
import { useLocation } from 'react-router-dom';
import { Snackbar, Alert } from '@mui/material';
import './BasePage.css';

const SnackbarAlert = React.forwardRef(function SnackbarAlert(props, ref) {
  return (
    // eslint-disable-next-line react/jsx-props-no-spreading
    <Alert elevation={6} ref={ref} variant="filled" {...props} />
  );
});

SnackbarAlert.propTypes = {
  onClose: PropTypes.func.isRequired,
  severity: PropTypes.string.isRequired,
  sx: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  style: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.oneOfType([PropTypes.func, PropTypes.object])),
    PropTypes.func,
    PropTypes.object,
  ]),
  direction: PropTypes.string,
  children: PropTypes.node.isRequired,
};

SnackbarAlert.defaultProps = {
  sx: null,
  style: null,
  direction: 'up',
};

function BasePage({ childView }) {
  const location = useLocation();
  const [successText, setSuccessText] = useState(
    // initially load snackbar if given state with non-null text
    location.state ? location.state.successText : ''
  );

  const handleAlertClose = (event, reason) => {
    if (reason === 'clickaway') {
      return;
    }
    setSuccessText('');
  };

  const openSnackbar = (message) => {
    setSuccessText(message);
  };

  return (
    <div className="pageContents">
      {React.cloneElement(childView, {
        successSnackbarHandler: openSnackbar,
      })}
      <Snackbar
        open={successText}
        autoHideDuration={6000}
        onClose={handleAlertClose}
      >
        <SnackbarAlert
          onClose={handleAlertClose}
          severity="success"
          sx={{ width: '100%' }}
        >
          {successText}
        </SnackbarAlert>
      </Snackbar>
    </div>
  );
}

BasePage.propTypes = {
  childView: PropTypes.element.isRequired,
};

export default BasePage;
