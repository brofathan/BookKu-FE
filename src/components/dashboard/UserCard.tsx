import React from "react";

export type User = {
  id: string;
  username: string;
  password: string;
  role: string;
  name: string;
  email: string;
  phone: string;
  cartId: string;
  historyId: string;
};

export default function UserCard(user: User) {
  return (
    <div className="m-8">
      <div className="text-xl">{user.name}</div>
      <div className="text-sm">{user.username}</div>
    </div>
  );
}
