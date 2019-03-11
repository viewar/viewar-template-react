import React from 'react';
import {
  compose,
  renderNothing,
  branch,
  withHandlers,
  withProps,
} from 'recompose';

import viewarApi from 'viewar-api';
import { withLoading } from '../../lib/viewar-react';

import { Thumbnail } from '../../components/Thumbnail';

import styles from './infoBox.scss';

const Container = ({ children }) => (
  <div className={styles.container}>{children}</div>
);
const Label = ({ children }) => <div className={styles.label}>{children}</div>;
const SubLabel = ({ children }) => (
  <div className={styles.subLabel}>{children}</div>
);

const InfoBox = ({
  selection,
  materials,
  handleRemove,
  handlePropertyChange,
}) => (
  <Container>
    <Label>Name</Label>
    <div>{selection.model.name}</div>
    <Label>Materials</Label>
    {materials.map(material => (
      <div key={material.name}>
        <SubLabel>{material.name}</SubLabel>
        {material.options.map(option => (
          <Thumbnail
            active={material.value.key === option.key}
            onClick={() =>
              handlePropertyChange({ [material.name]: option.key })
            }
            key={option.key}
            src={option.imageUrl}
          />
        ))}
      </div>
    ))}
    <button onClick={handleRemove}>Remove</button>
  </Container>
);

export default compose(
  branch(({ selection }) => !selection, renderNothing),
  withProps(({ selection }) => ({
    viewarApi,
    materials: Object.values(selection.properties).filter(
      p => p.type === 'material' && p.options.length > 1
    ),
  })),
  withLoading(),
  withHandlers({
    handlePropertyChange: ({ selection, setLoading }) => async values => {
      setLoading(true);
      await selection.setPropertyValues(values);
      setLoading(false);
    },
    handleRemove: ({ selection, setLoading, viewarApi }) => async () => {
      setLoading(true);
      await viewarApi.sceneManager.removeNode(selection);
      setLoading(false);
    },
  })
)(InfoBox);
