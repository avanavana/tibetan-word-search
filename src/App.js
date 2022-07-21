import React, { useEffect, useState } from 'react';

import Puzzle from './components/puzzle/Puzzle.js';
import Words from './components/words/Words.js';
import { TibetanWordSearch, displayPuzzle, generatePuzzle } from './lib';
import './App.css';

function App() {
  const [ solution, setSolution ] = useState([]);
  const [ words, setWords ] = useState([]);

  useEffect(() => {
    const wordList = [ 'སྐད་སྒྱུར།', 'འགྲེད་བདར་ཤོར་བ།', 'མིག་ཤེལ།', 'སྒྲ་གདངས།' ];
    setWords(wordList);
    setSolution(generatePuzzle(TibetanWordSearch(wordList).toStacks()));
  }, []);

  return (
    <div className="App">
      <h1>བོད་ཚིག་འཚོལ་བ།</h1>
      <Puzzle key="puzzle" solution={solution ? solution : []} size={solution ? solution.length : 0} />
      <Words key="key" words={words} size={solution ? solution.length : 0}/>
    </div>
  );
}

export default App;
