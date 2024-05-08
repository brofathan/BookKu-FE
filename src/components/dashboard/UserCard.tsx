import React from 'react'

export type User = {
  id: string,
  foto: string,
  nama: string,
}

export default function UserCard(user: User) {
  return (
    <div className='m-8'>
      <div>
        <img src={user.foto} alt="" />
      </div>
      <div>
        <div className='text-xl'>{user.nama}</div>
      </div>
    </div>
  )
}
