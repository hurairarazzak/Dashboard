// src/pages/AddPost.js

import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { addData } from '../config/firebase/firebaseFunctions';
import { Button, Input, Form } from 'antd';

const AddPost = () => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [imageUrl, setImageUrl] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async () => {
    if (title.trim() && description.trim()) {
      await addData('posts', { title, description, imageUrl });
      navigate('/posts'); // Redirect back to posts page
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Add New Post</h1>
      
      <Form layout="vertical" onFinish={handleSubmit}>
        <Form.Item label="Title" required>
          <Input
            placeholder="Enter title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Description" required>
          <Input
            placeholder="Enter description"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Image URL">
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" htmlType="submit">Submit</Button>
      </Form>
    </div>
  );
};

export default AddPost;
