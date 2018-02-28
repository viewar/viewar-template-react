import React from 'react';
import classNames from 'classnames';

import styles from './sidebar.css';

export const Sidebar = ({ style, children, right }) =>
    <div style={style} className={classNames(styles.sidebar, right && styles.right)}>
      { children }
    </div>;
