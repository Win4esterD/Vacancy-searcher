import './styles/App.scss';
import * as React from "react";
import Header from "./modules/Header.jsx";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header />
      </div>
    );
  }
}

export default App;
