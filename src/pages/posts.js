// src/pages/Posts.js

import React, { useState, useEffect } from 'react';
import { addData, getData, editData, deleteData } from '../config/firebase/firebaseFunctions';
import { Button, Input, List } from 'antd';

const Posts = () => {
  const [posts, setPosts] = useState({});
  const [newPost, setNewPost] = useState('');
  const [editingId, setEditingId] = useState(null);
  const [editingContent, setEditingContent] = useState('');

  // Fetch posts from Firebase on component mount
  useEffect(() => {
    fetchPosts();
  }, []);

  const fetchPosts = async () => {
    const data = await getData('posts');
    if (data) {
      setPosts(data);
    } else {
      setPosts({}); // Set to empty object if no data found
    }
  };

  const handleAddPost = async () => {
    if (newPost.trim() === '') return;
    await addData('posts', { content: newPost });
    setNewPost('');
    fetchPosts(); // Refresh post list
  };

  const handleEditPost = async (id) => {
    await editData(`posts/${id}`, { content: editingContent });
    setEditingId(null);
    setEditingContent('');
    fetchPosts(); // Refresh post list
  };

  const handleDeletePost = (id) => {
    deleteData(`posts/${id}`);
    fetchPosts(); // Refresh post list after deletion
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Posts</h1>
      
      {/* Add New Post */}
      <Input
        placeholder="Enter new post content"
        value={newPost}
        onChange={(e) => setNewPost(e.target.value)}
        style={{ marginBottom: '10px' }}
      />
      <Button type="primary" onClick={handleAddPost}>Add New Post</Button>

      {/* List of Posts */}
      <List
        itemLayout="horizontal"
        dataSource={Object.entries(posts)}
        renderItem={([id, post]) => (
          <List.Item
            actions={[
              <Button onClick={() => { setEditingId(id); setEditingContent(post.content); }}>Edit</Button>,
              <Button danger onClick={() => handleDeletePost(id)}>Delete</Button>
            ]}
          >
            <List.Item.Meta
              title={editingId === id ? (
                <Input
                  value={editingContent}
                  onChange={(e) => setEditingContent(e.target.value)}
                  onPressEnter={() => handleEditPost(id)}
                  onBlur={() => handleEditPost(id)}
                />
              ) : (
                <span>{post.content}</span>
              )}
            />
          </List.Item>
        )}
      />
    </div>
  );
};

export default Posts;
