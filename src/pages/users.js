// src/pages/UserPage.js
import { useEffect, useState } from "react";
import { getData } from "../config/firebase/firebaseFunctions";
import { Table } from "antd";

const UserPage = () => {
  const [userData, setUserData] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const data = await getData("users");
      if (data) {
        const userArray = Object.keys(data).map((key) => ({
          ...data[key],
          userID: key, // Map Firebase ID
        }));
        setUserData(userArray); // Set the user data to state
      }
    };

    fetchData();
  }, []);

  const columns = [
    { title: "UserName", dataIndex: "userName", key: "userName" },
    { title: "Email", dataIndex: "email", key: "email" },
    { title: "Gender", dataIndex: "gender", key: "gender" },
    { title: "User ID", dataIndex: "userID", key: "userID" }, // Show Firebase ID
  ];

  return (
    <div className="p-4">
      <h2 className="text-2xl mb-4">User Information</h2>
      <Table columns={columns} dataSource={userData} rowKey="userID" />
    </div>
  );
};

export default UserPage;
