import React from 'react';
import { useState, useEffect } from 'react';
import { API } from 'aws-amplify';
import Auth from '@aws-amplify/auth';
import { getPost, listComments } from '../graphql/queries';
import { updatePost, deletePost, createComment } from '../graphql/mutations';
import { useLocation } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../components/Post';
import { Comment } from '../components/Comment';
import { Loading } from '../components/Loading';
import './PostPage.css';

export const PostPage = () => {
  const [post, setPost] = useState();
  const [comments, setComments] = useState([]);
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

  return (
    <div className="postPage">
      {post ? (
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
      ) : (
        <Loading />
      )}
      {!!comments.length &&
        <div className="commentsList">
          <h2>Comments</h2>
          {comments.map(comment => (
            <Comment
              className="postComment"
              content={comment.content}
              username={comment.user.name}
              contentAge={moment(comment.createdAt).fromNow()}
            />
          ))}
        </div>
      }
    </div>
  )
}