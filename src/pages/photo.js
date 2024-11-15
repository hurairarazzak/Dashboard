import React, { useState, useEffect } from 'react';
import { Button, Input, Form, message, Card, Col, Row } from 'antd';
import { ref, push, database,onValue } from '../config/firebase/firebaseconfig'; // Import Firebase functions

const PhotoPage = () => {
  const [imageUrl, setImageUrl] = useState('');
  const [imageTitle, setImageTitle] = useState('');
  const [photos, setPhotos] = useState([]); // To store the added photos

  const handleAddPhoto = () => {
    if (imageUrl.trim() && imageTitle.trim()) {
      // Save to Firebase Realtime Database
      const photosRef = ref(database, 'photos');
      push(photosRef, {
        imageUrl,
        imageTitle,
      })
        .then(() => {
          // Clear the input fields and display success message
          setImageUrl('');
          setImageTitle('');
          message.success('Photo added successfully!');
        })
        .catch((error) => {
          message.error('Failed to add photo: ' + error.message);
        });
    } else {
      message.error('Please fill in both the image URL and title');
    }
  };

  // Fetch photos from Firebase and update the state
  const fetchPhotos = () => {
    const photosRef = ref(database, 'photos');
    onValue(photosRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const photosArray = Object.entries(data).map(([id, photo]) => ({
          id,
          ...photo,
        }));
        setPhotos(photosArray);
      }
    });
  };

  useEffect(() => {
    fetchPhotos(); // Fetch photos when the component mounts
  }, []);

  return (
    <div className="photo-page" style={{ padding: '20px' }}>
      <h1 className="text-3xl pb-5 font-semibold">Add a Photo</h1>
      
      <Form layout="vertical">
        <Form.Item label="Image Title" required>
          <Input
            placeholder="Enter image title"
            value={imageTitle}
            onChange={(e) => setImageTitle(e.target.value)}
          />
        </Form.Item>

        <Form.Item label="Image URL" required>
          <Input
            placeholder="Enter image URL"
            value={imageUrl}
            onChange={(e) => setImageUrl(e.target.value)}
          />
        </Form.Item>

        <Button type="primary" onClick={handleAddPhoto}>
          Add Photo
        </Button>
      </Form>

      {/* Display added photos */}
      <div style={{ marginTop: '20px' }}>
        <h2 className='py-3 text-2xl'>Added Photos</h2>
        <Row gutter={16}>
          {photos.map((photo, index) => (
            <Col span={8} key={index}>
              <Card
                hoverable
                cover={<img alt={photo.imageTitle} src={photo.imageUrl} />}
              >
                <Card.Meta title={photo.imageTitle} />
              </Card>
            </Col>
          ))}
        </Row>
      </div>
    </div>
  );
};

export default PhotoPage;
