import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommentCreate from './CommentCreate';
import CommentLists from './CommentLists';

const PostLists = () => {
    const [posts, setPosts] = useState({});

    useEffect(() => {
        fetchPosts();
    }, []);

    const fetchPosts = async () => {
        const res = await axios.get('http://localhost:4002/posts');
        setPosts(res.data);
    };

    const renderedPosts = Object.values(posts).map((post, i) => {
        return (
            <div
                key={post.id}
                className="card"
                style={{ width: '30%', marginBottom: '20px' }}
            >
                <div className="card-body">
                    <h3>{post.title}</h3>
                    <CommentLists comments={post.comments} />
                    <CommentCreate postId={post.id} />
                </div>
            </div>
        );
    });

    return (
        <div className="d-flex flex-row flex-wrap justify-content-between">
            {renderedPosts}
        </div>
    );
};

export default PostLists;
