import classes from './Cell.module.css';

function Cell({ stack, index }) {
  return <a className={classes.Cell}>{stack}</a>;
}

export default Cell;
