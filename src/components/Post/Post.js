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
                  >
                    {username}
                  </Link>
                  {' · '}
                  {contentAge}
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
                strokeColor="var(--argotique-red)"
                pathCss="fill:var(--argotique-red)"
                animation={heart}
                wrapperStyle={{ marginTop: '-4px' }}
              />
            </Grid>
            <Grid item sm={10.875} xs={10}>
              {isPreview ? (
                <Typography className="postTitle" variant="h5">
                  {title}
                </Typography>
              ) : (
                <div className="postContent">
                  <Typography className="postTitle" variant="h5" gutterBottom>
                    {title} 🇫🇷
                  </Typography>
                  <Typography
                    className="postSubtitle"
                    variant="h6"
                    gutterBottom
                  >
                    {subtitle} 🇬🇧
                  </Typography>
                  <Typography className="postText" variant="body1" paragraph>
                    {content}
                  </Typography>
                </div>
              )}
            </Grid>
          </Grid>
          <Grid container item spacing={2}>
            <Grid item sm={1.125} xs={2} />
            <Grid item sm={10.875} xs={10}>
              <Typography className="postMetrics" variant="subtitle1">
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
  isPreview: PropTypes.bool,
  id: PropTypes.string.isRequired,
  username: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  subtitle: PropTypes.string.isRequired,
  content: PropTypes.string,
  voteCount: PropTypes.number.isRequired,
  commentCount: PropTypes.number.isRequired,
  contentAge: PropTypes.string.isRequired,
  isLiked: PropTypes.bool.isRequired,
  isOwnedByUser: requiredIf(PropTypes.bool, (props) => !props.isPreview),
  editPostHandler: requiredIf(PropTypes.func, (props) => !props.isPreview),
  deletePostHandler: requiredIf(PropTypes.func, (props) => !props.isPreview),
};

Post.defaultProps = {
  isPreview: false,
  content: '',
  isOwnedByUser: false,
  editPostHandler: null,
  deletePostHandler: null,
};

export default Post;
