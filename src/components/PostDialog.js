import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import TextField from '@mui/material/TextField';
import { useTheme } from '@mui/material/styles';
import useMediaQuery from '@mui/material/useMediaQuery';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Slide from '@mui/material/Slide';
import Fade from '@mui/material/Fade';
import './PostDialog.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

export const PostDialog = (props) => {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const formik = useFormik({
    initialValues: {
      title: props.title,
      subtitle: props.subtitle,
      content: props.content,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      subtitle: Yup.string()
        .max(150, "Must be 150 characters or less")
        .required("Required"),
      content: Yup.string()
        .max(500, "Must be 500 characters or less")
    }),
    onSubmit: values => {
      props.onSubmitHandler(values);
      closeDialog();
    },
  });

  const closeDialog = (event, reason) => {
    if (reason === "backdropClick") {
      return;
    }
    props.onClose();
    formik.resetForm();
  }

  return(
    <Dialog
      fullScreen={fullScreen}
      open={props.open}
      onClose={closeDialog}
      TransitionComponent={fullScreen ? Transition : Fade}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="postForm">
          {fullScreen ? (
            <AppBar elevation={0} sx={{ position: "relative" }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={closeDialog}
                  aria-label="close"
                >
                  <CloseIcon />
                </IconButton>
                <Typography sx={{ ml: 2, flex: 1 }} variant="h6" component="div">
                  {props.newPost ? "New post" : "Edit post"}
                </Typography>
                <Button
                  type="submit"
                  color="inherit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit
              </Button>
              </Toolbar>
            </AppBar>
          ) : (
            <DialogTitle>
              {props.newPost ? "New post" : "Edit post"}
            </DialogTitle>
          )}
          <DialogContent>
            <DialogContentText>
              Share a useful phrase or a common slang expression!
              Include an explanation to describe its origin and the kind of situation it's used in.
            </DialogContentText>
            <TextField
              autoFocus={!fullScreen}
              required
              margin="dense"
              className="titleField"
              name="title"
              label="French expression"
              fullWidth
              variant="standard"
              value={formik.values.title}
              onChange={formik.handleChange}
              error={formik.errors.title && formik.errors.title !== "Required"}
            />
            {formik.errors.title && formik.errors.title !== "Required" ? (
              <div className="postError">{formik.errors.title}</div>
            ) : null}
            <TextField
              required
              margin="dense"
              className="subtitleField"
              name="subtitle"
              label="English translation"
              fullWidth
              variant="standard"
              value={formik.values.subtitle}
              onChange={formik.handleChange}
              error={formik.errors.subtitle && formik.errors.subtitle !== "Required"}
            />
            {formik.errors.subtitle && formik.errors.subtitle !== "Required" ? (
              <div className="postError">{formik.errors.subtitle}</div>
            ) : null}
            <TextField
              margin="dense"
              className="contentField"
              name="content"
              label="Explanation"
              fullWidth
              multiline
              variant="standard"
              value={formik.values.content}
              onChange={formik.handleChange}
              error={formik.errors.content}
            />
            {formik.errors.content ? (
              <div className="postError">{formik.errors.content}</div>
            ) : null}
          </DialogContent>
          {!fullScreen &&
            <DialogActions>
              <Button onClick={closeDialog}>
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </Button>
            </DialogActions>
          }
        </div>
      </form>
    </Dialog>
  );
}