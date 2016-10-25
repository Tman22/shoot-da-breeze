import React from 'react';
import firebase, {reference, signIn} from '../firebase';
import moment from 'moment';
export default class Application extends React.Component {
  constructor() {
    super();
    this.state = {
      messages: [],
      user: null,
      filter: ''
    };
  }

  componentDidMount() {
    let newArray;
    reference.on('value', (snapshot) => {
      let messages = snapshot.val();
      newArray = this.returnArray(messages);
      this.setState({messages: newArray });
    });
    firebase.auth().onAuthStateChanged(user => this.setState({ user }));
  }


  submitMessage(message) {
    const { user } = this.state;
    let userMessage = Object.assign(message,
       {user: {
         displayName: user.displayName,
         email: user.email,
         uid: user.uid
       },
        date: Date.now() } );

    reference.push(userMessage);
  }

  returnArray(messages) {
    return Object.keys(messages ? messages : []).map((key) => {
      let singleMessage = messages[key];
      singleMessage['key'] = key;
      return singleMessage;
    });
  }

  render() {
    var cool = this.state.messages.filter(({message}) => {
      return message.indexOf(this.state.filter) >= 0;
    });
    if(this.state.user) {
      return(
        <div>
          <input onChange={(e)=> this.setState({filter: e.target.value})} />
          <InputMessage submitMessage={this.submitMessage.bind(this)} />
          <MessageList messages={cool}/>
        </div>
      );
    }
    return (<Login deteremineLog={signIn} logs={(response)=>this.setState({user: response.user})} text='Login' />);
  }
}

const Login = ({deteremineLog, logs, text}) => {
  return (
      <button onClick={()=>deteremineLog().then((response)=> logs(response))}>{text}</button>
  );
};

const MessageList = ({messages}) => {
  return(
    <ul>
      {messages.map(message => <Message key={message.key} {...message} />)}
    </ul>
  );
};

const Message = ({date, message, user}) => {
  return (
      <li>
        <strong>{moment(date).format('dddd, MMMM Do YYYY, h:mm a')}</strong><br/>
        {user.displayName}: {message}
      </li>
  );
};

class InputMessage extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  handleClick() {
    this.props.submitMessage(this.state);
    this.setState({message: ''});
  }

  render() {
    return(
      <div>
        <input type='text' value={this.state.message} onChange={(e)=>this.setState({message: e.target.value}) }/>
        <input type='submit' onClick={this.handleClick.bind(this)} />
      </div>
    );
  }
}
