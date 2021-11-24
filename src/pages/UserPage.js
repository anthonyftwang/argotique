import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { listPostVotes, listPosts, listUsers } from '../graphql/queries';
import moment from 'moment';
import { Link, useLocation } from 'react-router-dom';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import './UserPage.css';

export const UserPage = () => {
  const [posts, setPosts] = useState([]);
  const location = useLocation();
  const [owner, setOwner] = useState(`${location.pathname.split("/").pop()}'s`);

  useEffect(() => {
    fetchPosts();
  }, []);

  async function fetchPosts() {
    const user = await Auth.currentAuthenticatedUser();
    // Need owner's userID from their username... first get all users
    const ownerName = location.pathname.split("/").pop()
    const ownerDataList = await API.graphql({
      query: listUsers,
      variables: {
        filter: {
          name: { eq: ownerName }
        }
      }
    });
    // Then match the userID to a user from the list
    // (exactly one item in this list, so same as items[0])
    const ownerData = ownerDataList.data.listUsers.items.find(user => user.name === ownerName);
    const ownerID = ownerData.id; // should always exist...
    // ... (make name a primary key????)
    // set owner state variable ("My" | ${user}"'s") to dynamically generate page heading
    const owner = (ownerID === user.attributes.sub) ? "My" : `${ownerName}'s`
    setOwner(owner)
    // Finally, get posts filtered by owner's userID
    const postData = await API.graphql({
      query: listPosts,
      variables: {
        filter: {
          userID: { eq: ownerID }
        }
      }
    });
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
    setPosts(posts);
  }

  return (
    <div className="userPage">
      <h2>{owner} Posts</h2>
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
    </div>
  )
}