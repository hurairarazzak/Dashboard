// src/pages/Todo.js

import React, { useState, useEffect } from 'react';
import { Input, Button, List } from 'antd';
import { database, ref, push, onValue, remove, update } from '../config/firebase/firebaseconfig';
import { EditOutlined, DeleteOutlined } from '@ant-design/icons';

const Todo = () => {
  const [todo, setTodo] = useState('');
  const [todos, setTodos] = useState([]);

  // Fetch todos from Firebase on component load
  useEffect(() => {
    const todosRef = ref(database, 'todos');
    onValue(todosRef, (snapshot) => {
      const data = snapshot.val();
      const todoList = data ? Object.keys(data).map((key) => ({ id: key, ...data[key] })) : [];
      setTodos(todoList);
    });
  }, []);

  // Add a new todo to Firebase
  const addTodo = () => {
    if (todo.trim()) {
      const todosRef = ref(database, 'todos');
      push(todosRef, { text: todo });
      setTodo(''); // Clear input
    }
  };

  // Delete a todo from Firebase
  const deleteTodo = (id) => {
    const todoRef = ref(database, `todos/${id}`);
    remove(todoRef);
  };

  // Edit a todo via prompt
  const editTodo = (id, currentText) => {
    const newText = prompt('Edit your todo:', currentText);  // Show prompt with the current text pre-filled
    if (newText && newText.trim() !== currentText) {
      const todoRef = ref(database, `todos/${id}`);
      update(todoRef, { text: newText.trim() }); // Update todo if new text is provided
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-3xl pb-5 font-semibold">Todo App</h1>
      <div className="flex mb-4">
        <Input
          value={todo}
          onChange={(e) => setTodo(e.target.value)}
          placeholder="Add a new todo"
          className="mr-2"
        />
        <Button type="primary" onClick={addTodo}>
          Add Todo
        </Button>
      </div>
      <List
        bordered
        dataSource={todos}
        renderItem={(item) => (
          <List.Item
            actions={[
              <Button
                type="link"
                onClick={() => editTodo(item.id, item.text)}
                icon={<EditOutlined />}
              />,
              <Button
                type="link"
                onClick={() => deleteTodo(item.id)}
                icon={<DeleteOutlined />}
              />,
            ]}
          >
            {item.text}
          </List.Item>
        )}
      />
    </div>
  );
};

export default Todo;
