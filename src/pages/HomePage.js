import React from 'react';
import { useState, useEffect } from 'react';

import { API } from 'aws-amplify';
import { getPost, listPosts } from '../graphql/queries';
import { createPost as createPostMutation, deletePost as deletePostMutation } from '../graphql/mutations';

import { withRouter } from 'react-router-dom';
import moment from 'moment';
import { Post } from '../components/Post';
import { Loading } from '../components/Loading';
import { ErrorMessage } from '../components/ErrorMessage';
import './HomePage.css';

export const HomePage = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        fetchPosts();
    }, []);

    async function fetchPosts() {
        const apiData = await API.graphql({ query: listPosts });
        setPosts(apiData.data.listPosts.items);
    }

    return (
        <div className="homePage">
            <h2>Top Posts</h2>
            <div className="postList">
                {posts.length ? (
                    posts.map(post => (
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
                        />
                    ))
                ) : (
                    <Loading />
                )}
            </div>
        </div>
    )
}