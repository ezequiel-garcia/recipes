import classes from './Search.module.css';

const Search = ({ input, setInput }) => {
  return (
    <input
      className={classes.input}
      type="text"
      value={input}
      placeholder="Search..."
      onChange={(e) => setInput(e.target.value)}
    />
  );
};

export default Search;
