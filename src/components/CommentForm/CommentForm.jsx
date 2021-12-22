import React from 'react';
import PropTypes from 'prop-types';
import {
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Button,
  Input,
  Typography,
} from '@mui/material';
import { AddComment, ExpandMore } from '@mui/icons-material';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import './CommentForm.css';

/** Discussion section heading with an accordian that
 * reveals a validated input field for submitting comments.
 */

function CommentForm({ onSubmitHandler }) {
  const formik = useFormik({
    initialValues: {
      comment: '',
    },
    validationSchema: Yup.object({
      comment: Yup.string().max(300, 'Must be 300 characters or less'),
    }),
    onSubmit: (values) => {
      onSubmitHandler(values.comment);
      formik.resetForm();
    },
  });
  return (
    <div className="addComment">
      <div className="accordian">
        <Accordion elevation={0}>
          <AccordionSummary
            expandIcon={<ExpandMore />}
            aria-label="expand to submit a comment"
            sx={{
              '&.Mui-expanded': {
                minHeight: 0,
              },
              '& .MuiAccordionSummary-content.Mui-expanded': {
                margin: '12px 0',
              },
            }}
          >
            <Typography variant="h6">Discussion</Typography>
          </AccordionSummary>
          <AccordionDetails>
            <form onSubmit={formik.handleSubmit}>
              <div className="commentForm">
                <AddComment className="commentIcon" color="action" />
                <div className="commentFieldContainer">
                  <Input
                    className="commentField"
                    name="comment"
                    placeholder="Write a comment..."
                    fullWidth
                    multiline
                    value={formik.values.comment}
                    onChange={formik.handleChange}
                    error={!!formik.errors.comment}
                    aria-label="comment input field"
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
                  aria-label="submit comment"
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
}

CommentForm.propTypes = {
  /** Callback when button to submit comment is clicked. */
  onSubmitHandler: PropTypes.func.isRequired,
};

export default CommentForm;
