import axios from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import React, { useEffect, useState } from 'react'
import { hydrate } from 'react-dom'
import { easyWords } from '../src/wordList'
import styles from '../styles/Home.module.css'
import { MainWrap } from '../styles/MainStyle'


export const alphabet = ["A", "B", "C", "D", "E", "F", "G", "H", "I", "J", "K", "L", "M", "N", "O", "P", "Q","R", "S", "T", "U", "V", "W", "X", "Y", "Z"]

class Puzzle {
  correctAnswer: Array<string>;
  secretWord:Array<string>;
  definition: string;
  answerOptions:Array<string>;

  constructor(word:Array<string>,question:Array<string>, answers:Array<string>,definition:string) {
    this.correctAnswer = word,
    this.secretWord = question,
    this.definition = definition
    this.answerOptions= answers
  }
;

}







function getQuestion(count: number):Puzzle {

  var question =  easyWords[count] || easyWords[0]
  var questionSplitted = question.split("")
  var puzzleQuestion = makePuzzle(question)
  var theAnswers = makeAnswer(questionSplitted)


  console.log(question)
  var puz =  new Puzzle(question.split(""), puzzleQuestion, theAnswers, "loading...")
  return puz
}



function makePuzzle(word:string):Array<string> {
  var splitted = word.split("")
  for(var i=0; i<splitted.length; i++) {
    if(i !=0 && i!=splitted.length - 1) {
      splitted.splice(i,1,"_")
    } 
  }


 
  return splitted;
}

function makeAnswer(splittedVariants: Array<string>):Array<string> {
  var theAnswers = shuffle(splittedVariants)
  var extraAnswers: Array<string> = pickRandomItems(alphabet,4)
  for (let y=0; y<4; y++)  {
  theAnswers.push(extraAnswers[y])
}

  return theAnswers
}


const pickRandomItems = <T extends unknown> (arr: T[], n: number): T[] => {
  const shuffled = Array.from(arr).sort(() => 0.5 - Math.random());
  return shuffled.slice(0, n);
};






function shuffle<T>(array: T[]): T[] {
  let currentIndex = array.length,  randomIndex;

  // While there remain elements to shuffle.
  while (currentIndex != 0) {

    // Pick a remaining element.
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex--;

    // And swap it with the current element.
    [array[currentIndex], array[randomIndex]] = [
      array[randomIndex], array[currentIndex]];
  }

  return array;
};





export default function Home() {
  const [hydrated, setHydrated] = useState(false)
  const [anIndex, selectIndex] = useState(1)
  const [letter, setLetter] = useState("")
  const [questionCount, setQuestionCount]= useState(0)
  const [theCorrectWord, setCorrectWord] = useState(Array<string>)
  const [theQuestionWord, setQuestionWord] = useState(Array<string>)
  const [theQuestionDef, setQuestionDef] = useState("")
  const [theQUestionAnswers, setQuestionAnswers] = useState(Array<string>)
  const [totalTrials, setTrials] = useState(3)
  const [isGameFinished, setGameFinished] = useState(false)
  const [areYouLost, setYouLost] = useState(false)
  const [isDataLoaded, setDataLoaded] = useState(false)

  const [isWarningVisible, setWarningVisible] = useState(false)
  useEffect(() => {
      // setHydrated(true)
      var currentQuestion:Puzzle = getQuestion(questionCount)
      setCorrectWord(currentQuestion.correctAnswer)
      setQuestionWord(currentQuestion.secretWord)
      setQuestionDef(currentQuestion.definition)
      setQuestionAnswers(currentQuestion.answerOptions)
      console.log(theQuestionDef)
  }, []);
  // if(!hydrated) {
  //   return null
  // }



doGetRequest(theCorrectWord.join("").toString())
  
async function doGetRequest(needWord:string) {
  var res =  await axios.get(`https://api.dictionaryapi.dev/api/v2/entries/en/${needWord}`)
  .then(response => {
    var rsObjs = response.data[0].meanings[0].definitions[0].definition
    setQuestionDef(rsObjs)
    
  }).catch(err => {
    console.log(err)
    setDataLoaded(false)
    
  }).finally(() => {
    setDataLoaded(true)
    
  })
 
 
  // console.log(res.data[0].meanings[0].definitions[0].definition )
  // var wordRes:string = res.data[0].meanings[0].definitions[0].definition
  // return wordRes
}



  

  if(isDataLoaded) {
    
  return (
    <>
    <MainWrap>
    {isGameFinished ? <h1 className="win">Damn , you smart dude!</h1> : <>{areYouLost? <h2 className='lost'>you lost, learn english loser</h2> : <div className='gameOn'>
      <h2>Guess the word</h2>
    <p className='wordDef'>{theQuestionDef}</p>
    <div className="puzzleGrid">
    {theQuestionWord.map((e,index) => <li 
    className={anIndex == index ? "selectedOption" : "option"} 
    key={index}
    onClick={()=> selectIndex(index)}>{e}</li>)}
    </div>

    <div className='answers'>
    {theQUestionAnswers.map((e,index) => <li key={index}
    onClick={() => {
      // setLetter(e)
      console.log(e)
      console.log(theCorrectWord)
      console.log(theCorrectWord[anIndex])
      if(e == theCorrectWord[anIndex]) {
        console.log("it is correct")
        theQuestionWord.splice(anIndex, 1, e)
        selectIndex(anIndex + 1)
        console.log(anIndex)
        console.log(theCorrectWord, theQuestionWord)
        if(theQuestionWord.join("") == theCorrectWord.join("")) {
          console.log("you finished the word!")
          
            if(questionCount< easyWords.length -1) {
              var currentQuestion:Puzzle = getQuestion(questionCount+1)
              setQuestionCount(questionCount+1)  
              console.log(questionCount)
              setCorrectWord(currentQuestion.correctAnswer)
              console.log(currentQuestion)
              setQuestionWord(currentQuestion.secretWord)
              setQuestionDef(currentQuestion.definition)
              setQuestionAnswers(currentQuestion.answerOptions)
            } else {
              setGameFinished(true)
            }
          
        } 
      } else {
        console.log("wrong")
        setWarningVisible(true)
        setTrials(totalTrials-1)

        
        if (totalTrials <= 1) {
          setYouLost(true)
        }


        setTimeout(() => {
          setWarningVisible(false);
        }, 2500)

      }

      console.log(theQuestionWord)
      
      
    }}>{e}</li>)}
    </div>
    {/* <button onClick={() => {
      
      var currentQuestion:Puzzle = getQuestion(questionCount+1)
      setCorrectWord(currentQuestion.correctAnswer)
      console.log(currentQuestion)
      setQuestionWord(currentQuestion.secretWord)
      setQuestionDef(currentQuestion.definition)
      setQuestionAnswers(currentQuestion.answerOptions)
      }}>Next</button> */}

      <div className={isWarningVisible ? "warning" : "warning-invinsible"}>You have {totalTrials} trials left</div>
  
      </div>}</>}
      </MainWrap>
    </>
  )
  } if (isGameFinished) {
      return <h1>You won the game</h1>
  } else if(areYouLost) {
   return  <h1> You lost the game, learn english loser</h1>
  } else if(!isDataLoaded) {
    return <p>loading</p>
  }
}
