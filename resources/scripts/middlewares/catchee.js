import { ipcRenderer } from 'electron';

function removeTempListeners(action) {
  ipcRenderer.removeAllListeners(action.type + '_SUCCESSFUL');
  ipcRenderer.removeAllListeners(action.type + '_FAILED');
}

export default function catchee({ getState, dispatch }) {
  return (next) => (action) => {
    if(action.type.charAt(0) == '_') {
      setTimeout(function() {
        action.type = action.type.split('_').removeFirst().stringify('_');
        
        ipcRenderer.on(action.type + '_FAILED', (event, arg) => {
          removeTempListeners(action);
          dispatch({
            type: action.type + '_FAILED',
            ...arg
          });
        });

        ipcRenderer.on(action.type + '_SUCCESSFUL', (event, arg) => {
          removeTempListeners(action);
          dispatch({
            type: action.type + '_SUCCESSFUL',
            ...arg
          });
        });

        ipcRenderer.send(action.type, {...action});
      }, 1);
    }

    next(action);
  }
}