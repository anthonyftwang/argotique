import React from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { getPost } from '../graphql/queries';
import { updatePost, createPostVote, deletePostVote } from '../graphql/mutations';
import { Link } from 'react-router-dom';
import UseAnimations from 'react-useanimations';
import heart from 'react-useanimations/lib/heart';
import { Card } from './Card';
import './Post.css';

// { // PROPS (liked is handled by state and queried by this component itself)
//   isPreview = false, // hide content field, report or edit/delete actions if applicable
//   id,
//   username,
//   title,
//   subtitle,
//   content,
//   voteCount = 0,
//   commentCount = 0,
//   contentAge
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
      <Card>
        <div className="contentMeta">
          <span className="contentAuthor">
            <Link to={`/user/${this.props.username}`}>{this.props.username}</Link>
          </span>
          {" · "}
          <span className="contentAge">
            {this.props.contentAge}
          </span>
        </div>
        <div className="postTitleRow">
          <UseAnimations
            className="heartButton"
            reverse={this.state.liked}
            onClick={(event) => {
              event.preventDefault();
              this.setLiked(!this.state.liked);
            }}
            size={40}
            strokeColor={'var(--argotique-red)'}
            pathCss={'fill:var(--argotique-red)'}
            animation={heart}
          />
          <h3 className="postTitle">{this.props.title}</h3>
        </div>
        {!this.props.isPreview &&
          <div className="postContent">
            <h4 className="postSubtitle">{this.props.subtitle}</h4>
            <p className="contentText">{this.props.content}</p>
          </div>
        }
        <div className="postMetrics">
          <span className="voteCount">
            {this.state.displayLikes} {this.state.displayLikes === 1 ? "like" : "likes"}
          </span>
          {" · "}
          <span className="commentCount">
            {this.props.commentCount} {this.props.commentCount === 1 ? "comment" : "comments"}
          </span>
        </div>
      </Card>
    )
  }
}