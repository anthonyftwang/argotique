import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';
import requiredIf from 'react-required-if';
import { Link, useNavigate } from 'react-router-dom';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import moment from 'moment';
import { createPost as createPostMutation } from 'graphql/mutations';
import Post from 'components/Post/Post';
import Loading from 'components/Loading/Loading';
import PostListHeader from 'components/PostListHeader/PostListHeader';
import PostDialog from 'components/PostDialog/PostDialog';

function PostList({
  fetchPosts,
  makeTitleText,
  showSort,
  showAdd,
  defaultSort,
}) {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState(defaultSort);
  const [dialogVisible, setDialogVisible] = useState(false);
  const navigate = useNavigate();

  const showAddDialog = () => {
    setDialogVisible(true);
  };

  const hideAddDialog = () => {
    setDialogVisible(false);
  };

  const sortPosts = (method, list) => {
    setSort(method);
    // TODO - pagination with server-side sorting
    switch (method) {
      case 'New':
        list.sort((a, b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case 'Active':
        list.sort((a, b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
        break;
      case 'Top':
      default:
        list.sort(
          (a, b) =>
            b.voteCount - a.voteCount ||
            b.commentCount - a.commentCount ||
            b.lastActivityAt.localeCompare(a.lastActivityAt)
        );
    }
    return list;
  };

  const updatePostSort = (method) => {
    const [...resortedPosts] = posts;
    sortPosts(method, resortedPosts);
    setPosts(resortedPosts);
  };

  const getTitleText = () => {
    if (showSort) {
      return `${sort} argots`;
    }
    return makeTitleText();
  };

  const fetchPostList = async () => {
    const postList = await fetchPosts();
    if (postList.length) {
      sortPosts(defaultSort, postList);
    }
    setPosts(postList);
  };

  useEffect(() => {
    fetchPostList();
  }, []);

  const createPost = async (values) => {
    const date = new Date();
    const user = await Auth.currentAuthenticatedUser();
    const params = {
      title: values.title,
      subtitle: values.subtitle,
      content: values.content,
      createdAt: date.toISOString(),
      updatedAt: date.toISOString(),
      lastActivityAt: date.toISOString(),
      voteCount: 0,
      commentCount: 0,
      userID: user.attributes.sub,
    };
    const newPost = await API.graphql({
      query: createPostMutation,
      variables: { input: params },
    });
    // redirect user to new page with snackbar
    navigate(`./post/${newPost.data.createPost.id}`, {
      state: { successText: 'Argot created!' },
    });
  };

  return (
    <div className="postList">
      <PostListHeader
        className="listHeader"
        titleText={getTitleText()}
        showSort={showSort}
        showAdd={showAdd}
        sortChangeHandler={updatePostSort}
        addPostHandler={showAddDialog}
      />
      <div className="postList">
        {posts.length ? (
          posts.map((post) => (
            <Link to={`/post/${post.id}`} key={post.id} as="li">
              <Post
                isPreview
                id={post.id}
                username={post.user.name}
                title={post.title}
                subtitle={post.subtitle}
                content={post.content}
                voteCount={post.voteCount}
                commentCount={post.commentCount}
                contentAge={moment(post.createdAt).fromNow()}
                isLiked={post.isLiked}
              />
            </Link>
          ))
        ) : (
          <Loading isPreview />
        )}
      </div>
      <PostDialog
        open={dialogVisible}
        onClose={hideAddDialog}
        newPost
        onSubmitHandler={createPost}
      />
    </div>
  );
}

PostList.propTypes = {
  fetchPosts: PropTypes.func.isRequired,
  makeTitleText: requiredIf(PropTypes.func, (props) => !props.showSort),
  showSort: PropTypes.bool,
  showAdd: PropTypes.bool,
  defaultSort: PropTypes.oneOf(['Top', 'New', 'Active']).isRequired,
};

PostList.defaultProps = {
  makeTitleText: null,
  showSort: false,
  showAdd: false,
};

export default PostList;
