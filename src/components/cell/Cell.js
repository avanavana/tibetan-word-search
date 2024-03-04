import classes from './Cell.module.css';

function Cell({ stack, index }) {
  return <button className={classes.Cell}>{stack}</button>;
}

export default Cell;
