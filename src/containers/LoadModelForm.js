import React from 'react';
import { compose, withState, withProps, withHandlers } from 'recompose';
import { withLoading } from "../lib/viewar-react";

import viewarApi from 'viewar-api';

const LoadModelForm = ({ modelId, setModelId, handleInsertModel }) =>
  <div>
    <input value={modelId} onChange={({ target }) => setModelId(target.value)} />
    <button onClick={handleInsertModel}>Insert Model</button>
  </div>;

export default compose(
  withState('modelId', 'setModelId', '36651'),
  withProps({
    viewarApi
  }),
  withLoading(),
  withHandlers({
    handleTransferProgress: ({ onProgress }) => (id, percent) => {
      console.log(percent);
      onProgress(percent);
    }
  }),
  withHandlers({
    handleInsertModel: ({ modelId, viewarApi, setLoading, handleTransferProgress, onProgress }) => async () => {
      setLoading(true);
      const model = await viewarApi.modelManager.getModelFromRepository(modelId);
      viewarApi.coreInterface.on('transferProgress', handleTransferProgress);
      await viewarApi.sceneManager.insertModel(model, { pose: { position: { x: 0, y: 0, z: 0 }}});
      viewarApi.coreInterface.on('transferProgress', handleTransferProgress);
      setLoading(false);
      onProgress(null);
    }
  }),
)(LoadModelForm);
