import classes from './Background.module.css';

const Background = ({ children }) => {
  return (
    <div className={classes.image}>
      <div className={classes.lighter}>{children}</div>
    </div>
  );
};

export default Background;
