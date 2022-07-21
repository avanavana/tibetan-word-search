import classes from './Words.module.css';

function Words({ words, size }) {
  return (
    words.length > 0 ? <ol className={classes.WordList} style={{ width: `${(Math.sqrt(size) * 60) + 5 * (Math.sqrt(size) - 1)}px` }}>{words.map((word) => <li key={[...word].map((_, n) => word.charCodeAt(n)).join('-')}>{word}</li>)}</ol> : <p>No words.</p>
  );
}

export default Words;
