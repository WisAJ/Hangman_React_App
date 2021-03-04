import React, { Component } from "react";
import  { randomWord } from "./words"
import "./Hangman.css";

import img0 from "./imgs/0.jpg";
import img1 from "./imgs/1.jpg";
import img2 from "./imgs/2.jpg";
import img3 from "./imgs/3.jpg";
import img4 from "./imgs/4.jpg";
import img5 from "./imgs/5.jpg";
import img6 from "./imgs/6.jpg";


class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */
  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6],
    alts: ['0 wrong guesses', '1 wrong guesses',  '2 wrong guesses', '3 wrong guesses', '4 wrong guesses', '5 wrong guesses', '6 wrong guesses' ]
  };

  constructor(props) {
    super(props);
    this.state = { nWrong: 0,  guessed: new Set(),  answer:  randomWord()  };
    this.handleGuess = this.handleGuess.bind(this);
    this.reset = this.reset.bind(this);
  }

  reset () {
    return this.setState({
      nWrong: 0,
      guessed: new Set(),
      answer: randomWord()
    })
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }


  /** render: render game */
  render() {

    const  gameOver = this.state.nWrong >= this.props.maxWrong
    const isWinner =  this.guessedWord().join("") === this.state.answer
    // console.log(this.guessedWord().join(""))   

   
    return (
      <div className='Hangman'>

        <h1>Hangman</h1>
        <img src={this.props.images[this.state.nWrong]} alt={this.props.alts[this.state.nWrong]}/>
        <p className='Hangman-wrong'>Number of wrong guesses: {this.state.nWrong ? this.state.nWrong : "👌😊" }</p>
        <p className='Hangman-word'>{ !gameOver ? this.guessedWord(): this.state.answer}</p>
        <p className='Hangman-btns'> { isWinner ?   " You Win 👍"  :   ( !gameOver ? this.generateButtons() : "You Lose") }</p> 
         <p className='btns' onClick={this.reset} >Restart </p> 

      </div>
    );
  }
}

export default Hangman;


//  this is another way around :

// let gameState = this.generateButtons()
// if (isWinner) gameState = "You Win";
// if (isLoser) gameState = "You Lose";
