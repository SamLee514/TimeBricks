import React, { useState, useEffect } from 'react';
import {Brick, List} from '../brick'
import * as styles from './today.module.css'
import Timer from '../timer/timer'
import { nominalTypeHack } from 'prop-types';


// const list = new List
// list.add(new Brick('Work on essay', 3600))
// list.add(new Brick('Play piano', 4800))
// list.add(new Brick('Mow the lawn', 1800))

// const duration = 0;

// const Timer = () => {
//   const [seconds, setSeconds] = useState(duration);
//   const [isActive, setIsActive] = useState(false);

//   function toggle() {
//     setIsActive(!isActive);
//   }

//   function reset() {
//     setSeconds(duration);
//     setIsActive(false);
//   }
// }

// const NamesList = () => {

//   const [list, setList] = useState(new List())
//   // TODO: is null valid here?
//   const [curBrick, setCurBrick] = useState(null);

//   const addToEnd = () => {
//     // TODO: Need to make this parameterized
//     const brick = new Brick('hi', 30)
//     const replaceList = new List([...list.list, brick])
//     setList(replaceList)
//   };
//   const addToTop = () => {
//     // TODO: Need to make this parameterized
//     const brick = new Brick('bye', 30);
//     const replaceList = new List([brick, ...list.list])
//     setList(replaceList)
//   };
//   // Pop off latest brick to be processed by timer
//   const pop = () => {
//     setCurBrick(list[list.list.length - 1]);
//     // TODO: There's defo a better way to update than by remaking the whole thing lol
//     setList(new List(list.list.slice(0, list.list.length - 1)));
//   };

//   return(
//     <div>
//     <div>
//       <ul>{list.list.map(brick =>
//         <li key={brick.name}> {brick.name} {brick.dur}</li>
//       )}</ul>
//     </div>
//     <button onClick={addToTop}>Add to top</button>
//     <button onClick={addToEnd}>Add to bottom</button>
//     <Timer 
//     </div>
//   )
// };

// export default NamesList;


// const sloth = ()

