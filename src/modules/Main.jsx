import * as React from "react";
import Filters from './filters';
import Searcher from './Searcher';
import '../styles/main.scss';

class Main extends React.Component{

  render(){
    return(
      <main>
        <Filters />
        <Searcher />
      </main>
    )
  }
}

export default Main;