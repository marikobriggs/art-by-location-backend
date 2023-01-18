import React from 'react'
import Menu from './components/Menu'
import './index.css';

function App() {
  return (
    <div className="flex h-screen">
      <div className="m-auto">
      <header className="App-header">
        <Menu/>
      </header>
      </div>
    </div>
  );
}

export default App;
