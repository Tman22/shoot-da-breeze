import React from 'react';

const UsersList = ({messages, handleClick}) => {
  let users = {};
  let allUsers = messages.map((message) => {
    let {uid, email, displayName} = message.user;
    return users[uid] = {email: email, displayName: displayName};
  });
  let keyArray = Object.keys(users);
  return (
    <div>
      {keyArray.map((key)=> <li key={key} onClick={()=>handleClick(key)}>{users[key].email} </li>)}
    </div>
  );
};

export default UsersList;
