import * as React from "react";
import '../styles/search-input.scss';

class SearchInput extends React.Component{
  render(){
    return(
      <div className="search-input-wrapper">
        <input type="text" className="search" placeholder="Введите название вакансии"/>
        <img src="./assets/img/search-icon.png" alt="search icon" className="search-icon" />
        <button className="search-button">Поиск</button>
    </div>
    )
  }
}

export default SearchInput;