import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts } from '../graphql/queries';
import { createPost as createPostMutation } from '../graphql/mutations';
import moment from 'moment';
import { Link, useNavigate } from 'react-router-dom';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { PageTitle } from '../components/PageTitle';
import { PostDialog } from '../components/PostDialog';
import './HomePage.css';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);
  const [sort, setSort] = useState("Top");
  const [dialogVisible, setDialogVisible] = useState();
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({ query: listPosts });
    const user = await Auth.currentAuthenticatedUser();
    const likeData = await API.graphql({
      query: listPostVotes,
      variables: {
        filter: {
          userID: { eq: user.attributes.sub }
        }
      }
    });
    const posts = postData.data.listPosts.items.map(post => ({
      ...post,
      isLiked: likeData.data.listPostVotes.items.some(like => like.postID === post.id)
    }));
    posts.sort((a,b) => (b.voteCount - a.voteCount)
      || b.lastActivityAt.localeCompare(a.lastActivityAt));
    setPosts(posts);
  }

  const sortPosts = (method) => {
    setSort(method);
    // TODO - pagination with server-side sorting
    switch (method) {
      case "Newest":
        posts.sort((a,b) => b.createdAt.localeCompare(a.createdAt));
        break;
      case "Active":
        posts.sort((a,b) => b.lastActivityAt.localeCompare(a.lastActivityAt));
        break;
      case "Top":
      default:
        posts.sort((a,b) => (b.voteCount - a.voteCount)
          || b.lastActivityAt.localeCompare(a.lastActivityAt));
    }
    setPosts(posts);
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

  return (
    <div className="homePage">
      <PageTitle
        titleText={`${sort} Posts`}
        showSort={true}
        sortChangeHandler={sortPosts}
        addPostHandler={showAddDialog}
      />
      <div className="postList">
        {posts.length ? (
          posts.map(post => (
            <Link to={`/post/${post.id}`}>
              <Post
                key={post.id}
                isPreview={true}
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
        newPost={true}
        onSubmitHandler={createPost}
      />
    </div>
  )
}