import React from 'react';

const UsersList = ({messages, handleClick}) => {
  let allUsers = messages.reduce((users, message) => {
    let {uid, email, displayName} = message.user;
    users[uid] = {email: email, displayName: displayName};
    return users;
  }, {});
  return (
    <div>
      {Object.keys(allUsers).map((key)=>
        <li key={key} onClick={()=>handleClick(key)}>
          {allUsers[key].displayName}: {allUsers[key].email} 
        </li>)}
    </div>
  );
};

export default UsersList;
