import React, { useState, useEffect } from 'react';
import * as styles from './timer.module.css'

// TODO: this should be manipulated by the interface
const duration = 3;


const Timer = () => {
  const [seconds, setSeconds] = useState(duration);
  const [isActive, setIsActive] = useState(false);

  function toggle() {
    setIsActive(!isActive);
  }

  function reset() {
    setSeconds(duration);
    setIsActive(false);
  }

  useEffect(() => {
    let interval = null;
    if (isActive) {
      // Tells React to run setSeconds at intervals of 1000 ms
      interval = setInterval(() => {
        setSeconds(seconds => seconds - 1);
      }, 1000);
    } else if (!isActive && seconds !== duration) {
      // Tells React to stop running the intervals
      clearInterval(interval);
    }
    return () => clearInterval(interval);
    // NOTE: the following line is telling useEffect which vars to watch for
  }, [isActive, seconds]);

  return (
    <div className='app'>
      <div className='time'>
        {/* TODO: Modify this so it displays in HH:MM:SS format*/}
        {seconds}s
      </div>
      <div className='row'>
        <button className={`button button-primary button-primary-${isActive ? 'active' : 'inactive'}`} onClick={toggle}>
          {isActive ? 'Pause' : 'Start'}
        </button>
        <button className='button' onClick={reset}>
          Reset
        </button>
      </div>
    </div>
  );
};

export default Timer;







// const calculateTimeLeft = () => {
//   const difference = new Date('2020-08-01').getTime() + new Date().getTime();
//   let timeLeft = {};

//   if (difference > 0) {
//     timeLeft = {
//       hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
//       minutes: Math.floor((difference / (1000 * 60)) % 60),
//       seconds: Math.floor((difference / 1000) % 60)
//     };
//   }

//   return timeLeft;
// }

// const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());

// // useEffect allows the effect to take place at every re-reender.
// // It also allows the effects to happen asynchronously
// // 
// useEffect(() => {
//   setTimeout(() => {
//     setTimeLeft(calculateTimeLeft());
//   }, 1000);
// })

// const timerComponents = [];

// Object.keys(timeLeft).forEach(interval => {
//   if (!timeLeft[interval]) {
//     return;
//   }

//   timerComponents.push(
//     <span>
//       {timeLeft[interval]} {interval}{" "}
//     </span>
//   );
// });






// const About: React.FC<{}> = () => {
//   <link href="https://unpkg.com/nes.css/css/nes.css" rel="stylesheet" />
//   const topText = 'Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum'
//   const bottomText = 'Jeffrey Woods, also more commonly known as Jeff the Killer, is the titular villainous protagonist of the creepypasta story of the same name by the brother of GameFuelTv, who loses his sanity and becomes a serial killer to satisfy his homicidal urges. Jeff became one of the largest creepypasta icons to date, even rivaling Slender Man of all creepypastas. He is a teenage boy, who was a caring youth and deeply cared about his brother Liu. As a killer, this changed and he became a vengeful, dangerous, and bloodthirsty sociopath.'
//   const [arrowDirection, setArrowDirection] = useState('down');
//   const [content, setContent] = useState(topText)
//   function toggleDisplay() {
//     arrowDirection == 'up' ? setArrowDirection('down') : setArrowDirection('up');
//     content == topText ? setContent(bottomText) : setContent(topText);
//   }
//   return (
//     <div id={styles.about} className='nes-container is-dark is-rounded'>
//       <div id={styles.text}>
//         {content}
//         {/* TODO: Make the text slide up and down */}
//       </div>
//       <img id={styles[arrowDirection]} onClick={toggleDisplay} src={DownArrow} alt="DownArrow" />
//     </div>
//   )
// }
// export default About