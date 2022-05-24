import React, { Component } from 'react';
import Header from './components/Header';
import Tile from './components/Tile';
import Keyboard from './components/Keyboard';
import './App.css';



class App extends Component {
  constructor(props) {
    super(props);
   
    this.state = {
      answer: 'ADIEU',
      gameBoard:[
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}],
        [{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"},{letter:"",status:"white"}]
      ],
      headerMessage: "" ,
      userGuess: '',
      currentRow: 0,
      preciseList:[],  
      appearsList: [],   
      usedList:[]     
    };
  }

  wordleLogic = (enteredWord,checkLetter) => {

    let lettersList = enteredWord.split('');
    const counts = {};

    for (const num of lettersList) {
      counts[num] = counts[num] ? counts[num] + 1 : 1;
    }

    let actualWordArray = this.state.answer.split('');
    let countsActual = {};

    for (const num of actualWordArray) {
      countsActual[num] = countsActual[num] ? countsActual[num] + 1 : 1;
    }
   
    let appearsCounter = 0;
    let preciseSpot = false;
    
    for(let i =0;i<5;i++){

      if(enteredWord[i]===this.state.answer[i] && enteredWord[i]===checkLetter){
        preciseSpot=true;
        appearsCounter++;
      }

      if(preciseSpot){
        if(countsActual[checkLetter]<=appearsCounter){
          return true
        }
      }

      preciseSpot=false;
    }
    return false;
  }


  enterWord = (enteredWord) => {
    let guessBox = document.getElementById("attemptBox");

    if(!this.state.gameOver){
     let currentBoard = [...this.state.gameBoard];
     let answer = this.state.answer;
     let boardRow = this.state.currentRow;
     let headerMessage= this.state.headerMessage;
     let preciseList = this.state.preciseList;
     let appearsList = this.state.appearsList;
     let usedList = this.state.usedList;
     let tileColor="lightgray";
     let newRow = [];

     for(let i =0; i<enteredWord.length;i++){
       usedList.push(enteredWord[i]);
        if(answer.includes(enteredWord[i])){
        appearsList.push(enteredWord[i])

          if(answer[i]===enteredWord[i]){
            tileColor="lightgreen";
            preciseList.push(enteredWord[i]);
          }
          
          else{
              if(this.wordleLogic(enteredWord,enteredWord[i])){
                tileColor="lightgray"
              }
                
              else {
                tileColor="lightyellow";
              }
          }
      }

      newRow[i]={
        letter: enteredWord[i],
        status: tileColor
      }

      tileColor="lightgray";
     }
     
     currentBoard[boardRow]=newRow;
     boardRow++;
     let gameOver = false
     if(boardRow>5) {
       gameOver=true;
       headerMessage="Unlucky, the word was " + answer;
     }

     if(enteredWord===answer){
       headerMessage="WINNER!"
       gameOver=true;
     }

     this.setState({
       gameBoard:currentBoard,
       currentRow:boardRow,
       gameOver:gameOver,
       headerMessage: headerMessage,
       usedList:usedList,
       appearsList:appearsList,
       preciseList:preciseList,
     }) 
     guessBox.value='';
    }
  }

  handleInputBoxChange = (event) => {
    this.setState({
      headerMessage:String.fromCharCode(160)
    })
    event.target.value=event.target.value.toUpperCase();
    if(event.key==="Enter"){
      this.typeKeyboard("Enter");
    }
  }


  typeKeyboard = (keyClicked) => {

   this.setState({
     headerMessage:String.fromCharCode(160)
   })

   let headerMessage = String.fromCharCode(160);
   let userGuess= '';
   let gameOver = this.state.gameOver;
   let guessBox = document.getElementById("attemptBox");

   if(guessBox && !gameOver) {
    if(keyClicked==="Enter" && guessBox.value.length>=5){
      this.enterWord(guessBox.value);
    } 
    
    else {
      if(guessBox.value.length<=5){
        if(keyClicked==="←"){
        guessBox.value = guessBox.value.substring(0, guessBox.value.length - 1);
        userGuess=guessBox.value; 
        }
        
        else{ 
          if(keyClicked!=="Enter"){guessBox.value+=keyClicked.toUpperCase();}
        }

        userGuess=guessBox.value;

      }
        else {
          headerMessage="5 letter words only";
          userGuess='';
          guessBox.value='';
          this.setState({
          headerMessage:headerMessage
          })
        } 
    }
    }
  
  this.setState({
    userGuess:userGuess
  })

  }

  render(){
    console.log(this.state.answer);

    return (
      <div className="App">
      
        <header className="App-header">
          <Header headerMessage={this.state.headerMessage}/>
          <div style={{width:'180px'}}>
                {this.state.gameBoard.map((gameBoard,idx)=>{
                return (
                <div key = {idx}>
                    {gameBoard.map((row,idx)=>{
                    return(
                    <div><Tile letter={row.letter} color={row.status} key={idx}/></div>
                    )
                    })
                    }  
                </div>
                )
                })}
          </div>
            
            <input autoFocus style={{textTransform:'uppercase'}} type="text" id="attemptBox" defaultValue={this.state.userGuess} maxlength="5" className='inputBox' onKeyDown={this.handleInputBoxChange} />
            
            <Keyboard typeKeyboard={this.typeKeyboard} usedList={this.state.usedList} appearsList={this.state.appearsList} preciseList={this.state.preciseList} />
            
        </header>
      </div>
    )
  }
}

export default App;