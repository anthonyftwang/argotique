import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import moment from 'moment';
import { getPost, listComments } from 'graphql/queries';
import {
  updatePost as updatePostMutation,
  deletePost as deletePostMutation,
  createComment as createCommentMutation,
} from 'graphql/mutations';
import Post from 'components/Post/Post';
import Comment from 'components/Comment/Comment';
import CommentForm from 'components/CommentForm/CommentForm';
import Loading from 'components/Loading/Loading';
import PostDialog from 'components/PostDialog/PostDialog';
import DeleteDialog from 'components/DeleteDialog/DeleteDialog';
import './PostPage.css';

function PostPage({ successSnackbarHandler }) {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
  const [editDialogVisible, setEditDialogVisible] = useState(false);
  const [deleteDialogVisible, setDeleteDialogVisible] = useState();
  const location = useLocation();
  const navigate = useNavigate();

  const showEditDialog = () => {
    setEditDialogVisible(true);
  };

  const hideEditDialog = () => {
    setEditDialogVisible(false);
  };

  const showDeleteDialog = () => {
    setDeleteDialogVisible(true);
  };

  const hideDeleteDialog = () => {
    setDeleteDialogVisible(false);
  };

  async function fetchPostAndComments() {
    const postData = await API.graphql({
      query: getPost,
      variables: { id: location.pathname.split('/').pop() },
    });
    const user = await Auth.currentAuthenticatedUser();
    if (postData.data.getPost) {
      const fetchedPost = {
        ...postData.data.getPost,
        isLiked: postData.data.getPost.votes.items.some(
          (vote) => vote.userID === user.attributes.sub
        ),
        isOwnedByUser: postData.data.getPost.user.id === user.attributes.sub,
      };
      // only fetch comments if post query succeeded
      const commentData = await API.graphql({
        query: listComments,
        variables: {
          filter: {
            postID: { eq: fetchedPost.id },
          },
        },
      });
      setPost(fetchedPost);
      const fetchedComments = commentData.data.listComments.items.sort((a, b) =>
        b.createdAt.localeCompare(a.createdAt)
      );
      setComments(fetchedComments);
    }
  }

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const createComment = async (comment) => {
    const date = new Date();
    const user = await Auth.currentAuthenticatedUser();
    const params = {
      content: comment,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      userID: user.attributes.sub,
      postID: post.id,
    };
    await API.graphql({
      query: createCommentMutation,
      variables: { input: params },
    });
    // also update comment count and activity
    const updatedPostParams = {
      id: post.id,
      commentCount: post.commentCount + 1,
      lastActivityAt: date.toISOString(),
    };
    await API.graphql({
      query: updatePostMutation,
      variables: { input: updatedPostParams },
    });
    fetchPostAndComments();
    successSnackbarHandler('Comment submitted!');
  };

  const updatePost = async (values) => {
    const date = new Date();
    const updatedPostParams = {
      id: post.id,
      title: values.title,
      subtitle: values.subtitle,
      content: values.content,
      updatedAt: date.toISOString(),
      lastActivityAt: date.toISOString(),
    };
    await API.graphql({
      query: updatePostMutation,
      variables: { input: updatedPostParams },
    });
    fetchPostAndComments();
    successSnackbarHandler('Argot updated!');
  };

  const deletePost = async () => {
    await API.graphql({
      query: deletePostMutation,
      variables: { input: { id: post.id } },
    });
    navigate('/', { state: { successText: 'Post deleted!' } });
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
            contentAge={moment(post.createdAt).fromNow()}
            isLiked={post.isLiked}
            isOwnedByUser={post.isOwnedByUser}
            editPostHandler={showEditDialog}
            deletePostHandler={showDeleteDialog}
          />
          <div className="commentsList">
            <CommentForm onSubmitHandler={createComment} />
            {!!comments.length &&
              comments.map((comment) => (
                <Comment
                  className="postComment"
                  key={comment.id}
                  content={comment.content}
                  username={comment.user.name}
                  contentAge={moment(comment.createdAt).fromNow()}
                />
              ))}
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
  );
}

PostPage.propTypes = {
  successSnackbarHandler: PropTypes.func,
};

PostPage.defaultProps = {
  successSnackbarHandler: null,
};

export default PostPage;
