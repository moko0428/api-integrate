import axios from "axios";
import React, { useReducer, useEffect } from "react";
import useAsync from "./useAsync";

async function getUsers() {
  const response = await axios.get(
    `https://jsonplaceholder.typicode.com/users`
  );
  return response.data;
}

const User = () => {
  const [state, refetch] = useAsync(getUsers, []);

  const { loading, data: users, error } = state; //state.data 를 users 키워드로 조회

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
      <button onClick={refetch}>다시 불러오기</button>
    </>
  );
};

export default User;
