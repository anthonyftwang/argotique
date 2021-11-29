import React from 'react';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import Input from '@mui/material/Input';
import Button from '@mui/material/Button';
import Accordion from '@mui/material/Accordion';
import AccordionSummary from '@mui/material/AccordionSummary';
import AccordionDetails from '@mui/material/AccordionDetails';
import AddCommentIcon from '@mui/icons-material/AddComment';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import Typography from '@mui/material/Typography';
import './CommentForm.css';

const CommentForm = (props) => {
  const formik = useFormik({
    initialValues: {
      comment: "",
    },
    validationSchema: Yup.object({
      comment: Yup.string()
        .max(300, "Must be 300 characters or less")
    }),
    onSubmit: values => {
      props.onSubmitHandler(values.comment);
      formik.resetForm();
    },
  });
  return (
    <div className="addComment">
      <div className="accordian">
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMoreIcon />}
            aria-controls="expand-comment-form"
            sx={{
              "&.Mui-expanded": {
                minHeight: 0
              },
              "& .MuiAccordionSummary-content.Mui-expanded": {
                margin: "12px 0"
              }
            }}
          >
            {/* <h2 style={{margin:0}}>Comments</h2> */}
            <Typography variant="h6">
              Discussion
            </Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={formik.handleSubmit}>
              <div className="commentForm">
                <AddCommentIcon className="commentIcon" color="action" />
                <div className="commentFieldContainer">
                  <Input
                    className="commentField"
                    name="comment"
                    placeholder="Write a comment..."
                    fullWidth
                    multiline
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    error={formik.errors.comment}
                  />
                  {formik.errors.comment ? (
                    <div className="commentError">{formik.errors.comment}</div>
                  ) : null}
                </div>
                <Button
                  className="commentSubmit"
                  color="primary"
                  variant="contained"
                  type="submit"
                  disabled={!(formik.isValid && formik.dirty)}
                >
                  Submit
                </Button>
              </div>
            </form>
          </AccordionDetails>
        </Accordion>
      </div>
    </div>
  );
};

export default CommentForm;