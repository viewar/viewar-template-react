import React from 'react';
import classNames from 'classnames';

import styles from './thumbnail.css';

export const Thumbnail = ({ active, ...props }) =>
  <img className={classNames(styles.thumbnail, active && styles.active )} {...props} />;
