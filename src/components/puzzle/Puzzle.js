import Cell from '../cell/Cell.js';
import classes from './Puzzle.module.css';

function Puzzle({ solution, size }) {
  const puzzle = solution.map((cell, i) => <Cell stack={cell} key={[...cell].map((_, n) => cell.charCodeAt(n)).join('-') + '-' + i} />);

  return (
    size > 0 ? <div className={classes.Grid} style={{ gridTemplateColumns: `repeat(${Math.sqrt(size)}, 60px)`, gridTemplateRows: `repeat(${Math.sqrt(size)}, 60px)`, height: `${(Math.sqrt(size) * 60) + 5 * (Math.sqrt(size) - 1)}px`, width: `${(Math.sqrt(size) * 60) + 5 * (Math.sqrt(size) - 1)}px` }}>{puzzle}</div> : <p>No puzzle.</p>
  );
}

export default Puzzle;
