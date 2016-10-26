import React from 'react';

class InputMessage extends React.Component {
  constructor() {
    super();
    this.state = {message: ''};
  }

  handleClick(e) {
    e.preventDefault();
    this.props.submitMessage(this.state);
    this.setState({message: ''});
  }

  determainInput(value){
    let charactersLeft = 140 - value;
    if (charactersLeft <= 0){
      return 0;
    }else{
      return charactersLeft;
    }
  }

  render() {
    let buttonState = true;
    if(this.state.message.length < 140 && this.state.message) buttonState = false
    return(
      <div>
        <input type='text' value={this.state.message} onChange={(e)=>this.setState({message: e.target.value}) }/>
        {this.determainInput(this.state.message.length)}
        <input type='submit' disabled={buttonState} onClick={this.handleClick.bind(this)} />
        <button disabled={buttonState} onClick={() => {this.setState({message: ''})}}>Clear</button>
      </div>
    );
  }
}

export default InputMessage
