import React from 'react';
import { withLoading } from '../../lib/viewar-react';
import { lifecycle, withProps, compose, withState } from 'recompose';

import viewarApi from 'viewar-api';

import { Spinner } from '../../components/Spinner';
import { Sidebar } from '../../components/Sidebar';
import { Progress } from '../../components/Progress';

import LoadModelForm from '../LoadModelForm';
import InfoBox from '../InfoBox';

import styles from './main.scss';

const Main = ({ loading, selection, progress, setProgress }) => (
  <div className={styles.container}>
    <Spinner show={!progress && loading} />
    <Progress progress={progress} />
    <Sidebar>
      <LoadModelForm onProgress={setProgress} />
      <InfoBox selection={selection} />
    </Sidebar>
  </div>
);

export default compose(
  withLoading(),
  withState('selection', 'setSelection', null),
  withState('progress', 'setProgress', null),
  withProps({
    viewarApi,
  }),
  lifecycle({
    componentDidMount() {
      const { viewarApi, setSelection } = this.props;
      viewarApi.sceneManager.on('selectionChanged', setSelection);
    },
    componentWillUnmount() {
      const { viewarApi, setSelection } = this.props;
      viewarApi.sceneManager.off('selectionChanged', setSelection);
    },
  })
)(Main);
