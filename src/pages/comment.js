// src/pages/CommentsPage.js
import React, { useState, useEffect } from 'react';
import { database, ref, push, onValue } from '../config/firebase/firebaseconfig';
import { Button, Input, List, Typography, Card } from 'antd';

const { TextArea } = Input;
const { Paragraph, Text } = Typography;

const CommentsPage = () => {
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');
  const [replyText, setReplyText] = useState({});

  useEffect(() => {
    const commentsRef = ref(database, 'comments');
    onValue(commentsRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        const commentsArray = Object.entries(data).map(([id, comment]) => ({
          id,
          ...comment,
        }));
        setComments(commentsArray);
      }
    });
  }, []);

  const handleAddComment = () => {
    if (newComment.trim()) {
      const commentsRef = ref(database, 'comments');
      push(commentsRef, {
        text: newComment,
        replies: [],
      });
      setNewComment('');
    }
  };

  const handleAddReply = (commentId) => {
    if (replyText[commentId]?.trim()) {
      const commentRef = ref(database, `comments/${commentId}/replies`);
      push(commentRef, {
        text: replyText[commentId],
      });
      setReplyText((prev) => ({ ...prev, [commentId]: '' }));
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Comments Section</h1>
      <TextArea
        placeholder="Write a comment..."
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={3}
      />
      <Button type="primary" onClick={handleAddComment} className="mt-2">
        Add Comment
      </Button>

      <List
        className="mt-6"
        dataSource={comments}
        renderItem={(comment) => (
          <List.Item>
            <Card title="Comment">
              <Paragraph>
                <Text strong>{comment.text}</Text>
              </Paragraph>
              <TextArea
                placeholder="Write a reply..."
                value={replyText[comment.id] || ''}
                onChange={(e) =>
                  setReplyText((prev) => ({
                    ...prev,
                    [comment.id]: e.target.value,
                  }))
                }
                rows={2}
              />
              <Button
                type="link"
                onClick={() => handleAddReply(comment.id)}
                className="mt-1"
              >
                Reply
              </Button>

              {comment.replies && (
                <List
                  dataSource={Object.values(comment.replies)}
                  renderItem={(reply) => (
                    <List.Item>
                      <Card>
                        <Paragraph>
                          <Text>{reply.text}</Text>
                        </Paragraph>
                      </Card>
                    </List.Item>
                  )}
                />
              )}
            </Card>
          </List.Item>
        )}
      />
    </div>
  );
};

export default CommentsPage;
