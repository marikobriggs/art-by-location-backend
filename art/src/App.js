import React from 'react'
import Menu from './components/Menu'
import './index.css';

function App() {
  const countries = [
    "Egypt", "France", "Japan", "China", "Chile" 
  ]

  return (
    <div className="flex h-screen">
      <div className="m-auto">
      <header className="App-header">
        <Menu options={countries}/>
      </header>
      </div>
    </div>
  );
}

export default App;
