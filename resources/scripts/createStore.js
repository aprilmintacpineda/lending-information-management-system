import { compose, createStore, applyMiddleware } from 'redux';
import { ipcRenderer } from 'electron';

// middlewares
import catchee from './middlewares/catchee';

// reducers
import reducers from './reducers';

export default (compose(
  applyMiddleware(catchee)
)(createStore)(reducers));