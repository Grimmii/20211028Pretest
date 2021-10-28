import React , {Component } from 'react'
import Select from 'react-select'
import './App.css';



function isPrime(num) {
  for(var i = 2; i < num; i++)
    if(num % i === 0) return false;
  return num > 1;
}

function isPerfectSquare( x){
    let s = parseInt(Math.sqrt(x));
    return (s * s == x);
}
 
// Returns true if n is a Fibinacci Number, else false
function isFibonacci( n){
    return isPerfectSquare(5 * n * n + 4) ||
    isPerfectSquare(5 * n * n - 4);
}

class App extends Component {

  constructor(props){
    super(props);
    this.onChangeNumberInput = this.onChangeNumberInput.bind(this);
    this.onChangeSelect = this.onChangeSelect.bind(this);
    this.state = {
      numberInput: '',
      mode : { label : 'isPrime' , value : 'isPrime'}
    }
  }

  onChangeNumberInput = e => {
    let value = e.target.value;
    if (value <0 ) this.setState({...this.state , numberInput : 1})
    else this.setState({...this.state , numberInput : Math.round(value) || ''})
  }

  onChangeSelect = e => {
    this.setState({...this.state , mode : e});
  }

  render() {
    const containerStyle = {
      width : '100%',
      height : '100%',
      display : 'inline-flex',
    }
    const firstColumnStyle = {
      width: '200px',
      maxWidth : '200px',
      border : '1px solid black',
    }
    const secondColumnStyle = {
      display:'flex',
      width: '-webkit-fill-available',
      border : '1px solid black',
      minWidth :'100px',
    }
    const thirdColumnStyle = {
      width: '300px',
      maxWidth : '300px',
      border : '1px solid black',
    }
    const dropdownoption = [
    { label : 'isPrime' , value : 'isPrime'},
    { label : 'IsFibanacci' , value : 'IsFibanacci'}
    ]
  return (
    <div style={containerStyle} >
      <div style={firstColumnStyle} >
      <input 
      type="number"
       pattern="[0-9]*"
        onChange={this.onChangeNumberInput}
         value={this.state.numberInput} />
      </div>
      <div style={secondColumnStyle} >
      <Select 
        options={dropdownoption}
        onChange={this.onChangeSelect}
        value={this.state.mode}
      />
        
      </div>
      <div style={thirdColumnStyle} >
        { this.state.numberInput && (this.state.mode.value == 'isPrime' ? isPrime(this.state.numberInput).toString() : isFibonacci(this.state.numberInput).toString())}
      </div>
    </div>
  );
  }
}

export default App;
