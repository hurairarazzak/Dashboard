// src/pages/home.js

import { Link, Route, Routes } from "react-router-dom";
import Posts from "../pages/posts"; // Use Posts instead of Dashboard
import Todo from "../pages/todo";
import Comment from "../pages/comment";
import AddPost from "../pages/addPost"; // Import AddPost component
import { FaUser } from "react-icons/fa";
import { LuListTodo } from "react-icons/lu";
import { FaCommentDots } from "react-icons/fa6";

export default function Home() {
  return (
    <div className="grid grid-cols-11 h-screen">
      <div className="col-span-2 bg-[#111827] text-white">
        <h1 className="m-5 text-2xl font-bold">Dashboard</h1>
        <Link
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/posts"
        >
          <FaUser className="h-50" />
          <span>Post</span>
        </Link>
        <Link
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/todo"
        >
          <LuListTodo className="h-50"/>
          <span>Todo</span>
        </Link>
        <Link
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/comment"
        >
          <FaCommentDots className="h-50"/>
          <span>Comment</span>
        </Link>
      </div>
      <div className="col-span-9">
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/addPost" element={<AddPost />} /> {/* Route for AddPost */}
          <Route path="/todo" element={<Todo />} />
          <Route path="/comment" element={<Comment />} />
        </Routes>
      </div>
    </div>
  );
}
