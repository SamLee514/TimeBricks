import React, { useState, useEffect } from 'react';
import * as styles from './timer.module.css'
import Brick from '../brick';

const TimerRunner = props => {
  // Make this constant for now
  const defaultBrickList = [
    new Brick('Y333333 BRICKS', 10),
    new Brick('brick brick brick', 1),
    new Brick('I am the third brick', 1),
    new Brick('I am the second brick', 300)
  ];

  const [brickList, updateBrickList] = useState(defaultBrickList);
  const [isActive, setIsActive] = useState(false);
  // TODO: this placeholder is prone to user abuse -> figure out a way to use null
  const [currentBrick, setCurrentBrick] = useState(new Brick('I am a placeholder', 0));
  const [dur, updateDur] = useState(currentBrick.dur); // TODO: a lil redundant
  const toggleActive = () => setIsActive(!isActive);

  // TODO: is null valid here?
  const [curBrick, setCurBrick] = useState(null);

  const addToEnd = () => {
    // TODO: Need to make this parameterized
    const brick = new Brick('hi', 3);
    const newList = [...brickList];
    newList.push(brick);
    updateBrickList(newList);
  };
  const addToTop = () => {
    // TODO: Need to make this parameterized
    const brick = new Brick('bye', 3);
    const newList = [brick, ...brickList];
    updateBrickList(newList);
  };

  // Wrapper function for updateBrickList because idk if u can directly update
  const getNextBrick = () => {
    const newList = [...brickList];
    const brick = newList.pop()
    updateBrickList(newList);
    return brick;
  }

  useEffect(() => {
    let interval = null;
    // TODO: might be worth it to fix the logic on this thing
    if (isActive) {
      interval = setInterval(() => {
        console.log('Timer running!');
        if (dur == 0 && brickList.length != 0) {
          const nextBrick = getNextBrick();
          setCurrentBrick(nextBrick);
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
      <div id={styles.currentBrick}>{currentBrick.name} {dur}</div>
      {/* TODO: Temporary solution to toggle active, will need something more integrated later */}
      {/* <form>
        <label htmlFor='brickName'>Brick name</label>
        <br></br>
        <input type='text' id='brickName'></input>
      </form> */}
      <button onClick={toggleActive}>Toggle</button>
      <button onClick={addToEnd}>Add to end</button>
      <button onClick={addToTop}>Add to top</button>
     
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