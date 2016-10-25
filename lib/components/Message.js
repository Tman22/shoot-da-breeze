import React from 'react';
import moment from 'moment';

const Message = ({date, message, user}) => {
  return (
      <li>
        <strong>{moment(date).format('dddd, MMMM Do YYYY, h:mm a')}</strong><br/>
        {user.displayName}: {message}
      </li>
  );
};

export default Message
