import React, { useState } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Link as RouterLink } from 'react-router-dom';
import { Card, CardContent, Grid, Link, Typography } from '@mui/material';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import {
  getPostService,
  updatePostVoteCountService,
} from 'services/Post/Post.service';
import {
  createPostVoteService,
  deletePostVoteService,
} from 'services/Vote/Vote.service';
import { getCurrentUserService } from 'services/User/User.service';
import ActionMenu from 'components/ActionMenu/ActionMenu';
import './Post.css';

/**
 * Card displaying a post as part of a listing or in detail on its own.
 */

function Post({
  isPreview,
  id,
  username,
  title,
  subtitle,
  content,
  voteCount,
  commentCount,
  contentAge,
  isLiked,
  isOwnedByUser,
  editPostHandler,
  deletePostHandler,
}) {
  const [liked, setLiked] = useState(isLiked);
  const [displayLikes, setDisplayLikes] = useState(voteCount);

  async function setPostLiked(isPostLiked) {
    // frontend changes are behaviourally driven
    setLiked(isPostLiked);
    setDisplayLikes(
      (prevDisplayLikes) => prevDisplayLikes + (isPostLiked ? 1 : -1)
    );

    // backend changes are logically driven
    const user = await getCurrentUserService();
    if (user) {
      const postData = await getPostService(id);
      const existingVote = postData.votes.items.find(
        (vote) => vote.userID === user.id
      );
      if (isPostLiked === true) {
        // create new PostVote record if none exists already
        if (!existingVote) {
          await createPostVoteService(user.id, id);

          // update post voteCount in db
          await updatePostVoteCountService(id, postData.voteCount + 1);
        }
      } else if (existingVote) {
        // delete from PostVote if already there
        await deletePostVoteService(existingVote.id);

        // update post voteCount in db
        await updatePostVoteCountService(id, postData.voteCount - 1);
      }
    }
  }

  return (
    <Card className="postCard" variant="outlined">
      <CardContent
        sx={{
          '&:last-child': {
            paddingBottom: '16px',
          },
        }}
      >
        <Grid container spacing={2}>
          <Grid container item spacing={2}>
            <Grid item sm={1.125} xs={2} />
            <Grid item sm={10.875} xs={10}>
              <div className="postMetaContainer">
                <Typography
                  className="postMeta"
                  variant="subtitle1"
                  color="text.secondary"
                  flexGrow={1}
                >
                  <Link
                    component={RouterLink}
                    to={`/user/${username}`}
                    color="inherit"
                    underline="hover"
                    aria-label="post author"
                  >
                    {username}
                  </Link>
                  {' · '}
                  <span aria-label="post age">{contentAge}</span>
                </Typography>
                {!isPreview && (
                  <span className="postActions">
                    <ActionMenu
                      isOwnedByUser={isOwnedByUser}
                      editPostHandler={editPostHandler}
                      deletePostHandler={deletePostHandler}
                    />
                  </span>
                )}
              </div>
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item sm={1.125} xs={2}>
              <UseAnimations
                className="heartButton"
                reverse={liked}
                onClick={(event) => {
                  event.preventDefault();
                  setPostLiked(!liked);
                }}
                size={40}
                strokeColor="#ef4135"
                pathCss="fill:#ef4135"
                animation={heart}
                wrapperStyle={{ marginTop: '-4px' }}
                aria-label="like button"
              />
            </Grid>
            <Grid item sm={10.875} xs={10}>
              {isPreview ? (
                <Typography
                  className="postTitle"
                  variant="h5"
                  aria-label="post title"
                >
                  {title}
                </Typography>
              ) : (
                <div className="postContent">
                  <Typography
                    className="postTitle"
                    variant="h5"
                    aria-label="post title"
                    gutterBottom
                  >
                    {title} 🇫🇷
                  </Typography>
                  <Typography
                    className="postSubtitle"
                    variant="h6"
                    aria-label="post subtitle"
                    gutterBottom
                  >
                    {subtitle} 🇬🇧
                  </Typography>
                  <Typography
                    className="postText"
                    variant="body1"
                    paragraph
                    aria-label="additional post text"
                  >
                    {content}
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item sm={1.125} xs={2} />
            <Grid item sm={10.875} xs={10}>
              <Typography
                className="postMetrics"
                variant="subtitle1"
                aria-label="post metrics"
              >
                {displayLikes} {displayLikes === 1 ? 'like' : 'likes'}
                {' · '}
                {commentCount} {commentCount === 1 ? 'comment' : 'comments'}
              </Typography>
            </Grid>
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
}

Post.propTypes = {
  /** In post lists, the subtitle and content are not displayed. */
  isPreview: PropTypes.bool,
  /** Unique postID which is the document key in the DB. */
  id: PropTypes.string.isRequired,
  /** The username that submitted the post. */
  username: PropTypes.string.isRequired,
  /** The title (French expression field) of the post. */
  title: PropTypes.string.isRequired,
  /** The subtitle (English translation field) of the post. */
  subtitle: PropTypes.string.isRequired,
  /** The text of the post (an optional explanation field). */
  content: PropTypes.string,
  /** The number of likes on the post. */
  voteCount: PropTypes.number.isRequired,
  /** The number of comments on the post. */
  commentCount: PropTypes.number.isRequired,
  /** The post age, as generated by `moment`. */
  contentAge: PropTypes.string.isRequired,
  /** Describes whether the current user has liked this post. */
  isLiked: PropTypes.bool.isRequired,
  /** If user did not submit the post, edit and delete is disabled. */
  isOwnedByUser: requiredIf(PropTypes.bool, (props) => !props.isPreview),
  /** Callback when edit menu item is clicked. */
  editPostHandler: requiredIf(
    PropTypes.func,
    (props) => !props.isPreview && props.isOwnedByUser
  ),
  /** Callback when delete menu item is clicked. */
  deletePostHandler: requiredIf(
    PropTypes.func,
    (props) => !props.isPreview && props.isOwnedByUser
  ),
};

Post.defaultProps = {
  isPreview: false,
  content: '',
  isOwnedByUser: false,
  editPostHandler: null,
  deletePostHandler: null,
};

export default Post;
