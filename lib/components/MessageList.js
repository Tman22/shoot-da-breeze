import React from 'react';
import Message from './Message'

const MessageList = ({messages}) => {
  return(
    <ul>
      {messages.map(message => <Message key={message.key} {...message} />)}
    </ul>
  );
};

export default MessageList
