import React from 'react';
import firebase, {reference, signIn} from '../firebase';
import Login from './Login'
import MessageList from './MessageList'
import InputMessage from './InputMessage'

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
