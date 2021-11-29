import React from 'react';
import { useState } from 'react';
import { useLocation } from 'react-router-dom';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import './BasePage.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

const BasePage = (props) => {
  const location  = useLocation();
  const [successText, setSuccessText] = useState(
    // initially load snackbar if given state with non-null text
    location.state ? location.state.successText : ""
  );

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setSuccessText("");
  };

  const openSnackbar = (message) => {
    setSuccessText(message);
  }

  return(
    <div className="pageContents">
      {React.cloneElement(props.child, { successSnackbarHandler: openSnackbar })}
      <Snackbar open={successText ? true : false} autoHideDuration={6000} onClose={handleAlertClose}>
        <Alert onClose={handleAlertClose} severity="success" sx={{ width: "100%" }}>
          {successText}
        </Alert>
      </Snackbar>
    </div>
  );
}

export default BasePage;