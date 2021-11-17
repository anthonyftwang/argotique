import React from 'react';
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
    this.state = { liked: false }; // TODO: query PostVote directly from here
  }

  setLiked(isLiked) {
    this.setState({ liked: isLiked });
    if (isLiked === true) {
      // add to from PostVote if not already there
    }
    else {
      // delete from PostVote if already there
    }
  }

  render() {
    return(
      <Card>
        <p className="contentMeta">
          <span className="contentAuthor">
            <Link to={`/user/${this.props.username}`}>{this.props.username}</Link>
          </span>
          <span className="contentAge">
            {' · '}{this.props.contentAge}
          </span>
        </p>
        <p>
          {this.props.isPreview ? (
            <div className="postPreview">
              <h3 className="postTitle">
                <Link to={`/post/${this.props.id}`}>{this.props.title}</Link>
              </h3>
            </div>
          ) : (
            <div className="postContent">
              <h3 className="postTitle">{this.props.title}</h3>
              <h3 className="postSubtitle">{this.props.subtitle}</h3>
              <p className="contentText">{this.props.content}</p>
            </div>
          )}
        </p>
        <p className="postMetrics">
        <div style={{ padding: '20px' }}>
          <UseAnimations
            className="heartButton"
            reverse={this.state.liked}
            onClick={() => this.setLiked(!this.state.liked)}
            size={40}
            wrapperStyle={{ marginTop: '5px' }}
            animation={heart}
          />
        </div>
          <span className="voteCount">
            {this.props.voteCount} {this.props.voteCount === 1 ? "like" : "likes"}
          </span>
          {" | "}
          <span className="commentCount">
            {this.props.commentCount} {this.props.commentCount === 1 ? "comment" : "comments"}
          </span>
        </p>
      </Card>
    )
  }
}

// export const Post = ({
//   isPreview = false, // hide content field, report or edit/delete actions if applicable
//   id,
//   username,
//   title,
//   subtitle,
//   content,
//   voteCount = 0,
//   commentCount = 0,
//   contentAge
// }) => (
//   <Card>
//     <p className="contentMeta">
//       <span className="contentAuthor">
//         <Link to={`/user/${username}`}>{username}</Link>
//       </span>
//       <span className="contentAge">
//         {'·'}{contentAge}
//       </span>
//     </p>
//     <p>
//       {isPreview ? (
//         <div className="postContent">
//           <h3 className="postTitle">
//             <Link to={`/post/${id}`}>{title}</Link>
//           </h3>
//         </div>
//       ) : (
//         <div className="postContent">
//           <h3 className="postTitle">{title}</h3>
//           <h3 className="postSubtitle">{subtitle}</h3>
//           <p className="contentText">{content}</p>
//         </div>
//       )}
//     </p>
//     <p className="postMetrics">
//       <button className="voteButton">
//         {}
//       </button>
//       <span className="voteCount">
//         {voteCount} {voteCount === 1 ? "like" : "likes"}
//       </span>
//       {" | "}
//       <span className="commentCount">
//         {commentCount} {commentCount === 1 ? "comment" : "comments"}
//       </span>
//     </p>
//   </Card>
// )