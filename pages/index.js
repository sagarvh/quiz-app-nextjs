import React, { useState, useRef, useEffect } from "react";
import Document from "./document";
import StartCard from "./components/StartCard";
import Footer from "./components/Footer";
import Question from "./components/Question";
import questions1 from "./../database/questions";
import questions2 from "./../database/questions2";
import questions3 from "./../database/questions3";
import questions4 from "./../database/questions4";
import questions5 from "./../database/questions5";
import HighScores from "./components/HighScores";
import AllDone from "./components/AllDone";
import Github from "./components/Github";
import TimeUp from "./components/TimeUp";
var questions = "";
  const rndInt = randomIntFromInterval(1, 5);
  switch (rndInt) {
    case 1:
      questions = questions1;
      console.log("1");
      break;
    case 2:
      questions = questions2;
      console.log("2");
      break;
    case 3:
      questions = questions3;
      console.log("3");
      break;
    case 4:
      questions = questions4;
      console.log("4");
      break;
    case 5:
      questions = questions5;
      console.log("5");
      break;
    default:
      questions = questions3;
  }

  function randomIntFromInterval(min, max) { // min and max included 
    return Math.floor(Math.random() * (max - min + 1) + min)
  }

const Home = () => {
  const [state, setState] = useState("start");
  const [questionNo, setQuestionNO] = useState(0);
  const [score, setScore] = useState(0);

  //Handleing the Questions Coming One by One.

  const handleQuestion = () => {
    if (questions.length > questionNo + 1) {
      setQuestionNO(questionNo + 1);
    } else {
      setState("done");
      setTimeout(() => {
       // setTimerOn(false);
       // setTime(50000);
      }, 900);
    }
  };

  const handleReset = () => {
    setQuestionNO(0);
  };

  //Hnadleing the State of the Application

  const handleState = (newState) => {
    setState(newState);
  };


  //Handleing the Score

  const handleScore = (UserScore) => {
    setScore(UserScore);
  };

  //Handleing the Timer
/*
  const [time, setTime] = useState(50000);
  const [timerOn, setTimerOn] = useState(false);
  const [deduct, setDeduct] = useState(false);

  useEffect(() => {
    let interval = null;
    if (timerOn) {
      interval = setInterval(() => {
        setTime((prevTime) => prevTime - 1000);
      }, 1000);
    } else if (!timerOn) {
      clearInterval(interval);
    }

    if (deduct) {
      setTime((prevTime) => prevTime - 10000);
      setDeduct(false);
    }
    return () => clearInterval(interval);
  }, [timerOn, deduct]);

  useEffect(() => {
    if (time <= 0) {
      setTimeout(() => {
        setTimerOn(false);
        setTime(50000);
      }, 900);
      setState("timeup");
    }
  }, [time]);

  //Functions to Start the timer
  const handleTimerStart = () => {
    setTimerOn(false);
  }; 

  const handleWrongAnswer = () => {
    setDeduct(false);
  }; */

  //Hanlde The High Scores

  const [highScore, setHighScore] = useState([]);
  const handleHighScore = (newScore) => {
    setHighScore((prevScores) => {
      return [...prevScores, newScore];
    });
  };

  //Clear High Scores
  const hadleClearHighScore = () => {
    setHighScore([]);
  };

  return (
    <div className="h-screen">
      <Document />
      <div className=" bg-skin-main py-5 px-7 flex items-center justify-between shadow-lg fixed w-screen top-0 z-40">
        <div className="flex items-center">
          <p
            className="text-left text-white font-light mr-3 cursor-pointer hover:text-gray-200 transition-all"
            onClick={() => {
              handleState("highscore");
            }}
          >
            View HighScores
          </p>
          <i className="fas fa-hand-point-left fa-lg text-white"></i>
        </div>
        <p className="text-right text-white font-light">Blockchain Quiz</p>
      </div>
      <div className="flex flex-col min-h-screen">
        <div className=" justify-center">
          {state === "start" && (
            <StartCard
              handleState={handleState}
              //handleTimerStart={handleTimerStart}
            />
          )}
          {state === "quiz" && (
            <Question
              questionText={questions[questionNo].questionText}
              options={questions[questionNo].options}
              answer={questions[questionNo].answer}
              handleQuestion={handleQuestion}
              handleState={handleState}
              handleScore={handleScore}
             // handleWrongAnswer={handleWrongAnswer}
            />
          )}
          {state === "highscore" && (
            <HighScores
              handleState={handleState}
              highScore={highScore}
              hadleClearHighScore={hadleClearHighScore}
            />
          )}
          {state === "done" && (
            <AllDone
              score={score}
              handleHighScore={handleHighScore}
              handleState={handleState}
              handleReset={handleReset}
            />
          )}
          {state === "timeup" && (
           <TimeUp 
             handleState ={handleState}
           />

          )}
        </div>
      <Github />
        <Footer />
      </div>
    </div>
  );
};

export default Home;
