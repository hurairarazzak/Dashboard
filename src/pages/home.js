// src/pages/home.js
import { Link, Route, Routes, NavLink } from "react-router-dom";
import Posts from "../pages/posts";
import Todo from "../pages/todo";
import Comment from "../pages/comment";
import AddPost from "../pages/addPost";
import AddCommentPage from "./photo";
import Album from "./album";
import Login from "./login";
import SignUp from "./signup";
import { FaUser } from "react-icons/fa";
import { MdOutlinePostAdd } from "react-icons/md";
import { LuListTodo } from "react-icons/lu";
import { FaCommentDots } from "react-icons/fa6";
import { IoMdPhotos } from "react-icons/io";
import { IoLogIn } from "react-icons/io5";
import { HiUserAdd } from "react-icons/hi";

export default function Home() {
  return (
    <div className="grid grid-cols-11 h-screen">
      <div className="col-span-2 bg-[#111827] text-white">
        <h1 className="m-5 text-2xl font-bold">Dashboard</h1>
        {/* Using NavLink for active class management */}
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/users"
        >
          <FaUser className="h-6" />
          <span>Users</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/posts"
        >
          <MdOutlinePostAdd className="h-6" />
          <span>Post</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/todo"
        >
          <LuListTodo className="h-6" />
          <span>Todo</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/comment"
        >
          <FaCommentDots className="h-6" />
          <span>Comment</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/addComment"
        >
          <IoMdPhotos className="h-6" />
          <span>Photos</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/album"
        >
          <IoMdPhotos className="h-6" />
          <span>Album</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/login"
        >
          <IoLogIn className="h-6" />
          <span>Login</span>
        </NavLink>
        <NavLink
          className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)] flex items-center space-x-2"
          to="/signup"
        >
          <HiUserAdd className="h-6" />
          <span>Sign Up</span>
        </NavLink>
      </div>

      <div className="col-span-9 p-4">
        {/* Define Routes inside the main content area */}
        <Routes>
          <Route path="/posts" element={<Posts />} />
          <Route path="/addPost" element={<AddPost />} />
          <Route path="/todo" element={<Todo />} />
          <Route path="/comment" element={<Comment />} />
          <Route path="/addComment" element={<AddCommentPage />} />
          <Route path="/album" element={<Album />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<SignUp />} />
        </Routes>
      </div>
    </div>
  );
}
