import React from 'react';
import PropTypes from 'prop-types';
import TextField from '@mui/material/TextField';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  AppBar,
  Toolbar,
  Typography,
  Slide,
  Fade,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import { Close } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './PostDialog.css';

const Transition = React.forwardRef(function Transition(props, ref) {
  // eslint-disable-next-line react/jsx-props-no-spreading
  return <Slide direction="up" ref={ref} {...props} />;
});

function PostDialog({
  title,
  subtitle,
  content,
  open,
  onClose,
  onSubmitHandler,
  newPost,
}) {
  const theme = useTheme();
  const fullScreen = useMediaQuery(theme.breakpoints.down('md'));

  const formik = useFormik({
    initialValues: {
      title,
      subtitle,
      content,
    },
    validationSchema: Yup.object({
      title: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      subtitle: Yup.string()
        .max(150, 'Must be 150 characters or less')
        .required('Required'),
      content: Yup.string()
        .max(500, 'Must be 500 characters or less')
        .nullable(),
    }),
    onSubmit: (values) => {
      onSubmitHandler(values);

      // eslint-disable-next-line no-use-before-define
      closeDialog();
    },
  });

  const closeDialog = (event, reason) => {
    if (reason === 'backdropClick') {
      return;
    }
    onClose();
    formik.resetForm();
  };

  return (
    <Dialog
      fullScreen={fullScreen}
      open={open}
      onClose={closeDialog}
      TransitionComponent={fullScreen ? Transition : Fade}
    >
      <form onSubmit={formik.handleSubmit}>
        <div className="postForm">
          {fullScreen ? (
            <AppBar elevation={0} sx={{ position: 'relative' }}>
              <Toolbar>
                <IconButton
                  edge="start"
                  color="inherit"
                  onClick={closeDialog}
                  aria-label="close"
                >
                  <Close />
                </IconButton>
                <Typography
                  sx={{ ml: 2, flex: 1 }}
                  variant="h6"
                  component="div"
                >
                  {newPost ? 'New post' : 'Edit post'}
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
            <DialogTitle>{newPost ? 'New post' : 'Edit post'}</DialogTitle>
          )}
          <DialogContent>
            <DialogContentText>
              Share a useful phrase or a common slang expression! Include an
              explanation to describe its origin and the kind of situation
              it&#39;s used in.
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
              error={formik.errors.title && formik.errors.title !== 'Required'}
            />
            {formik.errors.title && formik.errors.title !== 'Required' ? (
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
              error={
                formik.errors.subtitle && formik.errors.subtitle !== 'Required'
              }
            />
            {formik.errors.subtitle && formik.errors.subtitle !== 'Required' ? (
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
          {!fullScreen && (
            <DialogActions>
              <Button onClick={closeDialog}>Cancel</Button>
              <Button
                type="submit"
                disabled={!(formik.isValid && formik.dirty)}
              >
                Submit
              </Button>
            </DialogActions>
          )}
        </div>
      </form>
    </Dialog>
  );
}

PostDialog.propTypes = {
  title: PropTypes.string,
  subtitle: PropTypes.string,
  content: PropTypes.string,
  open: PropTypes.string.isRequired,
  onClose: PropTypes.string.isRequired,
  onSubmitHandler: PropTypes.string.isRequired,
  newPost: PropTypes.string,
};

PostDialog.defaultProps = {
  title: '',
  subtitle: '',
  content: '',
  newPost: false,
};

export default PostDialog;
