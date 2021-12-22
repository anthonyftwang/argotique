import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import { useLocation, useNavigate } from 'react-router-dom';
import moment from 'moment';
import {
  getPostService,
  updatePostContentService,
  deletePostService,
  updatePostCommentCountService,
} from 'services/Post';
import { listCommentsService, createCommentService } from 'services/Comment';
import { getCurrentUserService } from 'services/User';
import Post from 'components/Post';
import Comment from 'components/Comment';
import CommentForm from 'components/CommentForm';
import Loading from 'components/Loading';
import PostDialog from 'components/PostDialog';
import DeleteDialog from 'components/DeleteDialog';
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

  const sortComments = (list) => {
    // TODO - pagination with server-side sorting
    list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
    return list;
  };

  async function fetchPostAndComments() {
    const user = await getCurrentUserService();
    const postData = await getPostService(
      location.pathname.split('/').pop(),
      user.id
    );
    if (postData) {
      // only fetch comments if post query succeeded
      const commentData = await listCommentsService(postData.id);
      if (commentData.length) {
        sortComments(commentData);
      }
      setPost(postData);
      setComments(commentData);
    }
  }

  useEffect(() => {
    fetchPostAndComments();
  }, []);

  const createComment = async (comment) => {
    const user = await getCurrentUserService();
    await createCommentService(comment, user.id, post.id);

    // also update comment count and activity
    await updatePostCommentCountService(post.id, post.commentCount + 1);
    fetchPostAndComments();
    successSnackbarHandler('Comment submitted!');
  };

  const updatePost = async ({ title, subtitle, content }) => {
    await updatePostContentService(post.id, title, subtitle, content);
    fetchPostAndComments();
    successSnackbarHandler('Argot updated!');
  };

  const deletePost = async () => {
    await deletePostService(post.id);
    navigate('/', { state: { successText: 'Argot deleted!' } });
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
