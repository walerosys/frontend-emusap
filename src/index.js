import React, { Fragment, useState, useEffect } from 'react';
import ReactDOM from 'react-dom';
import './index.scss';
import './assets/css/Swal.css';
import App from './components/app';
// import * as serviceWorker from './serviceWorker';
import { Provider } from 'react-redux'
import store from './store/index'
import ConfigDB from './data/customizer/config'

const Root = (props) => {
  const [anim, setAnim] = useState("");
  const animation = localStorage.getItem("animation") || ConfigDB.data.router_animation || 'fade'
  const abortController = new AbortController();

  useEffect(() => {
    setAnim(animation)
    console.ignoredYellowBox = ['Warning: Each', 'Warning: Failed'];
    console.disableYellowBox = true;
    return function cleanup() {
      abortController.abort();
    }
    // eslint-disable-next-line
  }, []);

  return (
    <Fragment>
      <Provider store={store}>
        <App anim={anim} />
      </Provider>
    </Fragment>
  )
}
ReactDOM.render(<Root />,
  document.getElementById('root')
);

