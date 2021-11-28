import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { getPost, listComments } from '../graphql/queries';
import { updatePost as updatePostMutation, deletePost as deletePostMutation, createComment as createCommentMutation } from '../graphql/mutations';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../components/Post';
import { Comment } from '../components/Comment';
import { AddComment } from '../components/AddComment';
import { Loading } from '../components/Loading';
import { PostDialog } from '../components/PostDialog';
import { DeleteDialog } from '../components/DeleteDialog';
import './PostPage.css';

export const PostPage = (props) => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [editDialogVisible, setEditDialogVisible] = useState();
  const [deleteDialogVisible, setDeleteDialogVisible] = useState();
  const location  = useLocation();
  const navigate = useNavigate();

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
      const comments = commentData.data.listComments.items
        .sort((a,b) => b.createdAt.localeCompare(a.createdAt));
      setComments(comments);
    }
  }

  async function createComment(comment) {
    const date = new Date();
    const user = await Auth.currentAuthenticatedUser();
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
    // also update comment count and activity
    const updatedPostParams = {
      id: post.id,
      commentCount: post.commentCount + 1,
      lastActivityAt: date.toISOString()
    };
    await API.graphql({
      query: updatePostMutation,
      variables: {input: updatedPostParams }
    });
    fetchPostAndComments();
    props.successSnackbarHandler("Comment submitted!");
  }

  const showEditDialog = () => {
    setEditDialogVisible(true);
  }

  const hideEditDialog = () => {
    setEditDialogVisible(false);
  }

  const showDeleteDialog = () => {
    setDeleteDialogVisible(true);
  }

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  }

  async function updatePost(values) {
    const date = new Date();
    const updatedPostParams = {
      id: post.id,
      title: values.title,
      subtitle: values.subtitle,
      content: values.content,
      updatedAt: date.toISOString(),
      lastActivityAt: date.toISOString()
    };
    await API.graphql({
      query: updatePostMutation,
      variables: {input: updatedPostParams }
    });
    fetchPostAndComments();
    props.successSnackbarHandler("Argot updated!");
  }

  async function deletePost() {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id: post.id } }
    });
    navigate("/", { state: { successText: "Post deleted!" } });
  }

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
            contentAge={moment(post.createdAt).fromNow()}
            isLiked={post.isLiked}
            isOwnedByUser={post.isOwnedByUser}
            editPostHandler={showEditDialog}
            deletePostHandler={showDeleteDialog}
          />
          <div className="commentsList">
            <AddComment onSubmitHandler={createComment} />
            {!!comments.length &&
              comments.map(comment => (
                <Comment
                  className="postComment"
                  key={comment.id}
                  content={comment.content}
                  username={comment.user.name}
                  contentAge={moment(comment.createdAt).fromNow()}
                />
              ))
            }
          </div>
          <PostDialog
            key={post.updatedAt}
            open={editDialogVisible}
            onClose={hideEditDialog}
            newPost={false}
            title={post.title}
            subtitle={post.subtitle}
            content={post.content}
            onSubmitHandler={updatePost}
          />
          <DeleteDialog
            open={deleteDialogVisible}
            onClose={hideDeleteDialog}
            onSubmitHandler={deletePost}
          />
        </div>
      ) : (
        <Loading isPreview={false} />
      )}
    </div>
  )
}