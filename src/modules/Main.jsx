import * as React from "react";
import Filters from './filters';
import Searcher from './Searcher';
import '../styles/main.scss';

class Main extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      filters: '',
    }

    this.getFilters = this.getFilters.bind(this);
  }

  getFilters(value){
    this.setState({filters: value});
  }


  render(){
    return(
      <main>
        <Filters getFilters={this.getFilters}/>
        <Searcher filterLink={this.state.filters} />
      </main>
    )
  }
}

export default Main;