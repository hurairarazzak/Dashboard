import { Link, Route, Routes } from "react-router-dom";
import Dashboard from "../pages/dashboard";
import Todo from "../pages/todo";
import Comment from "../pages/comment";

export default function Home() {
  return (
    <>
      <div className="grid grid-cols-12 h-screen">
        <div className="col-span-3 bg-black text-white">
          <Link
            className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)]"
            to={"/posts"}
          >
            Post
          </Link>
          <Link
            className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)]"
            to={"/todo"}
          >
            Todo
          </Link>
          <Link
            className="p-2 rounded-lg bg-[rgba(255,255,255,.5)] block m-2 hover:bg-[rgba(255,255,255,.2)]"
            to={"/comment"}
          >
            Comment
          </Link>
        </div>
        <div className="col-span-9">
          <Routes>
            <Route path="/posts" element={<Dashboard />} />
            <Route path="/todo" element={<Todo />} />
            <Route path="/comment" element={<Comment />} />
          </Routes>
        </div>
      </div>
    </>
  );
}
