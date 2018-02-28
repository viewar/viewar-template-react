import React from 'react';
import { withLoading } from "../../lib/viewar-react";
import { lifecycle, withProps, compose, withState } from 'recompose';

import viewarApi from 'viewar-api';

import { Spinner } from '../../components/Spinner';
import { Sidebar } from '../../components/Sidebar';
import LoadModelForm from '../LoadModelForm';
import InfoBox from '../InfoBox';

import styles from './main.css';


const Main = ({ loading, selection }) =>
  <div className={styles.container}>
    <Spinner show={loading} />
    <Sidebar>
      <LoadModelForm />
      <InfoBox selection={selection} />
    </Sidebar>
  </div>;

export default compose(
  withLoading(),
  withState('selection', 'setSelection', null),
  withProps({
    viewarApi
  }),
  lifecycle({
    componentDidMount() {
      const { viewarApi, setSelection } = this.props;
      viewarApi.sceneManager.on('selectionChanged', setSelection);
    },
    componentWillUnmount() {
      const { viewarApi, setSelection } = this.props;
      viewarApi.sceneManager.off('selectionChanged', setSelection);
    }
  })
)(Main);

