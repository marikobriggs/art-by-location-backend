import React from 'react'
import Menu from './components/Menu'
import './index.css';

function App() {
  const countries = [
    "Canada", "France", "Netherlands", "Poland", "United States"
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
