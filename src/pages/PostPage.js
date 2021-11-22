import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { getPost, listComments } from '../graphql/queries';
import { updatePost, deletePost, createComment as createCommentMutation } from '../graphql/mutations';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import Snackbar from '@mui/material/Snackbar';
import MuiAlert from '@mui/material/Alert';
import { Post } from '../components/Post';
import { Comment } from '../components/Comment';
import { AddComment } from '../components/AddComment';
import { Loading } from '../components/Loading';
import './PostPage.css';

const Alert = React.forwardRef(function Alert(props, ref) {
  return <MuiAlert elevation={6} ref={ref} variant="filled" {...props} />;
});

export const PostPage = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [alertOpen, setAlertOpen] = useState();
  const location = useLocation();

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  async function fetchPostAndComments() {
    const postData = await API.graphql({
      query: getPost,
      variables: { id: location.pathname.split("/").pop() }
    });
    const user = await Auth.currentAuthenticatedUser();
    if (postData.data.getPost) {
      const post = {
        ...postData.data.getPost,
        isLiked: postData.data.getPost.votes.items.some(vote => vote.userID === user.attributes.sub),
        isOwnedByUser: postData.data.getPost.user.id === user.attributes.sub
      }
      // only fetch comments if post query succeeded
      const commentData = await API.graphql({
        query: listComments,
        variables: {
          filter: {
            postID: { eq: post.id}
          }
        }
      })
      setPost(post);
      setComments(commentData.data.listComments.items);
    }
  }

  async function createComment(comment) {
    let date = new Date();
    let user = await Auth.currentAuthenticatedUser();
    const params = {
      content: comment,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      userID: user.attributes.sub,
      postID: post.id
    };
    await API.graphql({
      query: createCommentMutation,
      variables: { input: params }
    });
    // also update comment count
    const updatedPostParams = {
      id: post.id,
      commentCount: post.commentCount + 1
    };
    await API.graphql({
      query: updatePost,
      variables: {input: updatedPostParams }
    });
    fetchPostAndComments();
    setAlertOpen(true);
  }

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") {
      return;
    }
    setAlertOpen(false);
  };

  return (
    <div className="postPageContainer">
      {post ? (
        <div className="postPage">
          <Post
            className="postDetailsCard"
            isPreview={false}
            id={post.id}
            username={post.user.name}
            title={post.title}
            subtitle={post.subtitle}
            content={post.content}
            voteCount={post.voteCount}
            commentCount={post.commentCount}
            contentAge={moment(post.lastActivityAt).fromNow()}
            isLiked={post.isLiked}
            isOwnedByUser={post.isOwnedByUser}
          />
          <div className="commentsList">
            <AddComment onSubmitHandler={createComment} />
            {!!comments.length &&
              comments.map(comment => (
                <Comment
                  className="postComment"
                  content={comment.content}
                  username={comment.user.name}
                  contentAge={moment(comment.createdAt).fromNow()}
                />
              ))
            }
          </div>
          <Snackbar open={alertOpen} autoHideDuration={6000} onClose={handleAlertClose}>
            <Alert onClose={handleAlertClose} severity="success" sx={{ width: '100%' }}>
              Comment submitted!
            </Alert>
          </Snackbar>
        </div>
      ) : (
        <Loading />
      )}
    </div>
  )
}