import React, { Component } from 'react';
import './App.css';
const arrwords = ['caminar','correr','silabario','patinar','cantando','espantoso','conquistar'];

export default class App extends Component {
  constructor(props){
    super(props);
    this.state = {
      all : arrwords,
      currentWord : '',
      currentWordPosition: 0,
      time: 0,
      timer: ''
    }
    document.onkeydown = (e) => {this.keyPress(e)};
    this.getWord = this.getWord.bind(this);
  }
  componentWillMount(){
    this.getWord();
    this.setState({
      timer: setInterval( () => {
        this.setState({
          time: this.state.time + 1
        });
      },1000)
    });
  }
  getWord(){
    let random = Math.floor(Math.random()*this.state.all.length);
    this.setState((prevState) => ({
      currentWord: prevState.all[random],
      all: prevState.all.filter((_, i) => i !== random),
      currentWordPosition: 0
    }));
    document.querySelectorAll('ul li').forEach( (li) => {
      li.style.color = 'white';
      li.style.fontWeight ='100';
    });
    console.log('estilos de la palabra reseteados...');
  }
  keyPress(e){
    let key = e.key;
    let word = this.state.currentWord.split('');
    if(this.state.currentWordPosition <= word.length){
      if(word[this.state.currentWordPosition] == key){
        document.querySelector(`[data-id='${this.state.currentWordPosition}']`).style.color ='#4a9cf3';
        document.querySelector(`[data-id='${this.state.currentWordPosition}']`).style.fontWeight ='900';
        this.setState({
          currentWordPosition : this.state.currentWordPosition + 1
        });
      }
    }
    if(this.state.currentWordPosition == word.length){
      if(this.state.all.length <= 0){
        clearInterval(this.state.timer);
        alert('Ganaste! tu tiempo es '+this.state.time+', se cargarán de nuevo las palabras');
        this.setState({
          all: arrwords,
          time: 0,
          timer: setInterval( () => {
            this.setState({
              time: this.state.time + 1
            });
          },1000)
        });
      }
      this.getWord();
    }
  }
  render() {
    return (
      <div className="listContainer">
        <ul className="list-inline">
          {this.state.currentWord.split('').map( (k,i) => 
            <li key={i} data-id={i} className="list-inline-item"> {k} </li>
          )}
        </ul>
        <p id="time">{this.state.time}</p>
      </div>
    );
  }
}
