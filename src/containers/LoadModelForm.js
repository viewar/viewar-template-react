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
    handleInsertModel: ({ modelId, viewarApi, setLoading }) => async () => {
      setLoading(true);
      const model = await viewarApi.modelManager.getModelFromRepository(modelId);
      await viewarApi.sceneManager.insertModel(model, { pose: { position: { x: 0, y: 0, z: 0 }}});
      setLoading(false);
    }
  }),
)(LoadModelForm);
