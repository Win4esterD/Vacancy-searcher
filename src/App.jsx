import './styles/App.scss';
import * as React from "react";
import Header from "./modules/Header.jsx";
import Main from "./modules/Main.jsx";

class App extends React.Component {
  render(){
    return (
      <div className="App">
        <Header />
        <Main />
      </div>
    );
  }
}

export default App;
