// import React, { useState } from "react";
// import ReactDOM from "react-dom";
// import { CountdownCircleTimer } from "react-countdown-circle-timer";

// import "./styles.css";

// const renderTime = ({ remainingTime }) => {
//   if (remainingTime === 0) {
//     return <div className="timer">Too lale...</div>;
//   }

//   return (
//     <div className="timer">
//       <div className="text">Remaining</div>
//       <div className="value">{remainingTime}</div>
//       <div className="text">seconds</div>
//     </div>
//   );
// };

// function App() {
//   const [key, setKey] = useState(0);
//   return (
//     <div className="App">
//       <h1>
//         CountdownCircleTimer
//         <br />
//         React Component
//       </h1>
//       <div className="timer-wrapper">
//         <CountdownCircleTimer
//           key={key}
//           isPlaying
//           duration={10}
//           colors={[["#004777", 0.33], ["#F7B801", 0.33], ["#A30000"]]}
//           onComplete={() => [true, 1000]}
//         >
//           {renderTime}
//         </CountdownCircleTimer>
//       </div>
//       <div className="button-wrapper">
//         <button onClick={() => setKey(prevKey => prevKey + 1)}>
//           Restart Timer
//         </button>
//       </div>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// ReactDOM.render(<App />, rootElement);


import React, { useState, useEffect } from 'react';
import * as styles from './timer.module.css'
import Brick from '../brick';
import { CountdownCircleTimer } from 'react-countdown-circle-timer'

const TimerRunner = props => {
  // Make this constant for now
  const defaultBrickList = [
    new Brick('Y333333 BRICKS', 1),
    new Brick('brick brick brick', 2),
    new Brick('I am the third brick', 1),
    new Brick('I am the second brick', 4)
  ];

  const [brickList, updateBrickList] = useState(defaultBrickList);
  const [isActive, setIsActive] = useState(false);
  // TODO: this placeholder is prone to user abuse -> figure out a way to use null
  const [currentBrick, setCurrentBrick] = useState(new Brick('I am a placeholder', 0));
  const [dur, updateDur] = useState(currentBrick.dur); // TODO: a lil redundant
  const toggleActive = () => setIsActive(!isActive);

  // Wrapper function for updateBrickList because idk if u can directly update
  const getNextBrick = () => {
    const newList = [...brickList];
    const brick = newList.pop()
    updateBrickList(newList);
    return brick;
  }

  const updateTimer = nextBrick => {
    setCurrentBrick(nextBrick);
  }

  useEffect(() => {
    let interval = null;
    // TODO: might be worth it to fix the logic on this thing
    if (isActive) {
      interval = setInterval(() => {
        console.log('Timer running!');
        if (dur == 0 && brickList.length != 0) {
          const nextBrick = getNextBrick();
          updateTimer(nextBrick);
          updateDur(nextBrick.dur);
        } else if (dur != 0) {
          updateDur(dur - 1);
        } else {
          clearInterval(interval)
        }
      }, 1000);
    }
    else {
      clearInterval(interval);
    }

    // cleanup, though I don't yet understand the repercussions of not cleaning
    return () => clearInterval(interval);
  }, [isActive, brickList, currentBrick, dur]);

  // TODO: factor out into a new component
  // functions for setting brick with tesxt input
  const [newNameField, setNewNameField] = useState('Default Brick!');
  const [newTimeField, setNewTimeField] = useState('3');
  const handleNameChange = e => setNewNameField(e.target.value);
  const handleTimeChange = e => setNewTimeField(e.target.value);

  const handleSubmit = e => {
    const brick = new Brick(newNameField, Number(newTimeField));
    const newList = [...brickList];
    newList.push(brick);
    updateBrickList(newList);
    e.preventDefault();
  }

  return(
    <div id={styles.timer}>
      {/* <CountdownCircleTimer
        onComplete={() => {
          console.log('Hello world')
        }}
        isPlaying
        duration={10}
        colors={[
          ['#004777', 0.4],
          ['#F7B801', 0.4],
          ['#A30000', 0.2],
        ]}
      >
        {dur}
      </CountdownCircleTimer> */}
      <div id={styles.currentBrick}>{currentBrick.name} {dur}</div>
      <button onClick={toggleActive}>Toggle</button>
     
      {/* TODO: Should move away from using index for key */}
      <ul>{brickList.map((brick, index) =>
        <div className={styles.brick}> {brick.name} {brick.dur}</div>
      )}</ul>
      
      <form onSubmit={handleSubmit}>
        <input type="text" value={newNameField} onChange={handleNameChange}/>
        <input type="text" value={newTimeField} onChange={handleTimeChange}/>
        <input type='submit' value='Add' />
      </form>
      
    </div>
  )
}

export default TimerRunner