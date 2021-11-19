import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts } from '../graphql/queries';
import { createPost } from '../graphql/mutations';
import moment from 'moment';
import { Link } from 'react-router-dom';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import './HomePage.css';

export const HomePage = () => {
  const [posts, setPosts] = useState([]);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const postData = await API.graphql({ query: listPosts });
    const user = await Auth.currentAuthenticatedUser();
    const userFilter = {
      userID: {
        eq: user.attributes.sub
      }
    }
    const likeData = await API.graphql({
      query: listPostVotes,
      variables: { filter: userFilter }
    });
    const posts = postData.data.listPosts.items.map(post => ({
      ...post,
      isLiked: likeData.data.listPostVotes.items.some(like => like.postID === post.id)
    }));
    setPosts(posts);
  }

  return (
    <div className="homePage">
      <h2>Top Posts</h2>
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
                contentAge={moment(post.lastActivityAt).fromNow()}
                isLiked={post.isLiked}
              />
            </Link>
          ))
        ) : (
          <Loading />
        )}
      </div>
    </div>
  )
}