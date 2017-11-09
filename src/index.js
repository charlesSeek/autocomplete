import React from 'react';
import ReactDOM from 'react-dom';
import '../style/app.scss';
import AutoComplete from './AutoComplete';
const App = () => {
  return (
    <AutoComplete/>
  );
};

ReactDOM.render(<App />, document.getElementById('root'));
