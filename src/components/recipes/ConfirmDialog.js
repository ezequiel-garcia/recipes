import React from 'react';
import classes from './ConfirmDialog.module.css';

function ConfirmDialog({ handleDelete, setShowConfirmation }) {
  return (
    <div className={classes['confirmation-window']}>
      <p>Are you sure you want to delete this item?</p>
      <div className={classes['buttons-container']}>
        <button className={classes['button']} onClick={handleDelete}>
          Yes
        </button>
        <button
          className={`${classes['button']} ${classes['button-no']}`}
          onClick={() => setShowConfirmation(false)}
        >
          No
        </button>
      </div>
    </div>
  );
}

export default ConfirmDialog;
