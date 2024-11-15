// src/pages/Posts.js

import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getData, deleteData } from '../config/firebase/firebaseFunctions';
import { Button, Card } from 'antd';

const Posts = () => {
  const [posts, setPosts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getData('posts');
    setPosts(data || {});
  };

  const handleDeletePost = (id) => {
    deleteData(`posts/${id}`);
    fetchPosts();
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl pb-5 font-semibold">Posts</h1>
        <Button type="primary" onClick={() => navigate('/addPost')}>
          Add New Post
        </Button>
      </div>
      
      {/* Display posts in a grid layout */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {Object.entries(posts).map(([id, post]) => (
          <Card
            key={id}
            hoverable
            className="bg-white shadow-md rounded-lg overflow-hidden"
            cover={post.imageUrl ? (
              <img
                src={post.imageUrl}
                alt={post.title}
                className="h-48 w-full object-cover"
              />
            ) : null}
          >
            <div className="p-4">
              <h2 className="text-xl font-bold mb-2">{post.title}</h2>
              <p className="text-gray-600 mb-4">{post.description}</p>
              <div className="flex justify-end space-x-2">
                <Button type="danger" onClick={() => handleDeletePost(id)}>
                  Delete
                </Button>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
};

export default Posts;
