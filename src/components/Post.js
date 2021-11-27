import React from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { getPost } from '../graphql/queries';
import { updatePost, createPostVote, deletePostVote } from '../graphql/mutations';
import { Link as RouterLink } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import Link from '@mui/material/Link';
import { ActionMenu } from './ActionMenu';
import './Post.css';

// { // PROPS
//   isPreview, // hide content field, report or edit/delete actions
//   id,
//   username,
//   title,
//   subtitle,
//   content,
//   voteCount,
//   commentCount,
//   contentAge,
//   isLiked,
//   isOwnedByUser
// }

export class Post extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      liked: props.isLiked,
      displayLikes: props.voteCount
    };
  }

  async updateVoteCount(oldVoteCount, change) {
    const updatedPostParams = {
      id: this.props.id,
      voteCount: oldVoteCount + change
    };
    await API.graphql({
      query: updatePost,
      variables: {input: updatedPostParams }
    });
  }

  async setLiked(isLiked) {
    // frontend changes are behaviourally driven
    this.setState({ liked: isLiked });
    this.setState((prevState) => ({
      displayLikes: prevState.displayLikes + (isLiked ? 1 : -1)
    }));

    // backend changes are logically driven
    const user = await Auth.currentAuthenticatedUser();
    const postData = await API.graphql({
      query: getPost,
      variables: { id: this.props.id }
    });
    const existingVote = postData.data.getPost.votes.items
                        .find(vote => vote.userID === user.attributes.sub);
    if (isLiked === true) {
      // create new PostVote record if none exists already
      if (!existingVote) {
        const date = new Date();
        const voteParams = {
          userID: user.attributes.sub,
          postID: this.props.id,
          createdAt: date.toISOString()
        };
        await API.graphql({
          query: createPostVote,
          variables: { input: voteParams }
        });
        // update post voteCount in db
        this.updateVoteCount(postData.data.getPost.voteCount, 1);
      }
    }
    else {
      // delete from PostVote if already there
      if (existingVote) {
        await API.graphql({
          query: deletePostVote,
          variables: { input: { id: existingVote.id } }
        });
        // update post voteCount in db
        this.updateVoteCount(postData.data.getPost.voteCount, -1);
      }
    }
  }

  render() {
    return(
      <Card className="postCard" variant="outlined">
        <CardContent sx={{
          "&:last-child": {
            paddingBottom: "16px"
          },
        }}>
          <Grid container spacing={2}>
            <Grid container item spacing={2}>
              <Grid item sm={1.125} xs={2}>
              </Grid>
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
                      to={`/user/${this.props.username}`}
                      color="inherit"
                      underline="hover"
                    >
                      {this.props.username}
                    </Link>
                    {" · "}
                    {this.props.contentAge}
                  </Typography>
                  {!this.props.isPreview &&
                    <span className="postActions">
                      <ActionMenu
                        isOwnedByUser={this.props.isOwnedByUser}
                        editPostHandler={this.props.editPostHandler}
                        deletePostHandler={this.props.deletePostHandler}
                      />
                    </span>
                  }
                </div>
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item sm={1.125} xs={2}>
              <UseAnimations
                className="heartButton"
                reverse={this.state.liked}
                onClick={(event) => {
                  event.preventDefault();
                  this.setLiked(!this.state.liked);
                }}
                size={40}
                strokeColor={"var(--argotique-red)"}
                pathCss={"fill:var(--argotique-red)"}
                animation={heart}
                wrapperStyle={{ marginTop: "-4px" }}
              />
              </Grid>
              <Grid item sm={10.875} xs={10}>
                <Typography className="postTitle" variant="h5" gutterBottom>
                  {this.props.title}
                </Typography>
                {!this.props.isPreview &&
                  <div className="postContent">
                    <Typography className="postSubtitle" variant="h6" gutterBottom>
                      {this.props.subtitle}
                    </Typography>
                    <Typography className="postText" variant="body1" paragraph>
                      {this.props.content}
                    </Typography>
                  </div>
                }
              </Grid>
            </Grid>
            <Grid container item spacing={2}>
              <Grid item sm={1.125} xs={2}>
              </Grid>
              <Grid item sm={10.875} xs={10}>
                <Typography
                  className="postMetrics"
                  variant="subtitle1"
                >
                  {this.state.displayLikes} {this.state.displayLikes === 1 ? "like" : "likes"}
                  {" · "}
                  {this.props.commentCount} {this.props.commentCount === 1 ? "comment" : "comments"}
                </Typography>
              </Grid>
            </Grid>
          </Grid>
        </CardContent>
      </Card>
    )
  }
}