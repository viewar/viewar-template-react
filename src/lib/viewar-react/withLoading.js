import { connect } from 'react-redux';
import { setLoading } from './actions';

export const withLoading = () => connect(
  ({ viewar_general }) => ({ loading: viewar_general.get('loading') }),
  { setLoading }
);