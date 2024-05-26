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
    <div className="bg-white shadow-md rounded-lg p-6 m-4 w-80">
      <div className="flex items-center mb-4">
        <div className="bg-gray-100 rounded-full w-12 h-12 flex items-center justify-center text-xl font-semibold text-gray-700">
          {user.name[0]}
        </div>
        <div className="ml-4">
          <div className="text-xl font-semibold text-gray-900">{user.name}</div>
          <div className="text-sm text-gray-500">{user.email}</div>
        </div>
      </div>
      <div className="text-gray-700">
        <p className="mb-2">
          <span className="font-semibold">Username:</span> {user.username}
        </p>
      </div>
    </div>
  );
}
