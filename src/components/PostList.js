import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { createPost as createPostMutation } from '../graphql/mutations';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { PageTitle } from '../components/PageTitle';
import { PostDialog } from '../components/PostDialog';
import './PostList.css';

export const PostList = (props) => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("Top");
  const [dialogVisible, setDialogVisible] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const posts = await props.fetchPosts();
    sortPosts(props.defaultSort, posts);
    setPosts(posts);
  }

  const sortPosts = (method, list) => {
    setSort(method);
    // TODO - pagination with server-side sorting
    switch (method) {
      case "New":
        list.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "Active":
        list.sort((a,b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
        break;
      case "Top":
      default:
        list.sort((a,b) => (b.voteCount - a.voteCount)
          || (b.commentCount - a.commentCount)
          || b.lastActivityAt.localeCompare(a.lastActivityAt));
    }
    return list;
  }

  const updatePostSort = (method) => {
    const [...resortedPosts] = posts;
    sortPosts(method, resortedPosts);
    setPosts(resortedPosts);
  }

  const showAddDialog = () => {
    setDialogVisible(true);
  }

  const hideAddDialog = () => {
    setDialogVisible(false);
  }

  async function createPost(values) {
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
      userID: user.attributes.sub
    };
    const newPost = await API.graphql({
      query: createPostMutation,
      variables: { input: params }
    });
    // redirect user to new page with snackbar
    navigate(`./post/${newPost.data.createPost.id}`, { state: { successText: "Post created!" } })
  }

  const makeTitleText = () => {
    if (props.showSort) {
      return `${sort} argots`;
    }
    else {
      return props.makeTitleText();
    }
  }

  return (
    <div className="postList">
      <PageTitle
        className="listHeader"
        titleText={makeTitleText()}
        showSort={props.showSort}
        showAdd={props.showAdd}
        sortChangeHandler={updatePostSort}
        addPostHandler={showAddDialog}
      />
      <div className="postList">
        {posts.length ? (
          posts.map(post => (
            <Link to={`/post/${post.id}`}>
              <Post
                key={post.id}
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
          <Loading />
        )}
      </div>
      <PostDialog
        open={dialogVisible}
        onClose={hideAddDialog}
        newPost
        onSubmitHandler={createPost}
      />
    </div>
  )
}