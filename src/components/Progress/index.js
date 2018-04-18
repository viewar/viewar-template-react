import React from 'react';
import styles from './progress.css';
import classNames from "classnames";

export const Progress = ({ progress }) =>
  <div className={classNames(styles.container, {[styles.hidden] : !progress})}>
    <div className={styles.progressBar}>
      <div className={styles.progress} style={{ width : `${progress}%` }}/>
    </div>
  </div>;