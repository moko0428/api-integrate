import axios from "axios";
import React from "react";
import { useEffect } from "react";
import { useState } from "react";

const User = () => {
  const [users, setUsers] = useState(null);
  const [loading, setLoding] = useState(false);
  const [error, setEror] = useState(null);

  const fetchUsers = async () => {
    try {
      //요청이 시작할 땐 error와 users를 초기화하고
      setEror(null);
      setUsers(null);
      setLoding(true);
      const response = await axios.get(
        "https://jsonplaceholder.typicode.com/users"
      );
      setUsers(response.data); //데이터는 reponse.data안에 들어있음.
    } catch (e) {
      setEror(e);
    }
    setLoding(false);
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  if (loading) return <div>로딩 중...</div>;
  if (error) return <div>에러가 발생했습니다.</div>;
  if (!users) return null;
  return (
    <>
      <ul>
        {users.map((user) => (
          <li key={user.id}>
            {user.username}({user.name})
          </li>
        ))}
      </ul>
      <button onClick={fetchUsers}>다시 불러오기</button>
    </>
  );
};

export default User;
