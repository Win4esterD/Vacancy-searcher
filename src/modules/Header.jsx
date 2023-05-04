import * as React from "react";
import '../styles/header.scss';

class Header extends React.Component{
  render(){
    return (
      <header>
        <div className="logo-wrapper">
          <img className="logo" src="./assets/img/Union.png" alt="logo"/>
          <p className="site-name">Jobored</p>
        </div>
        <div className="interface">
          <p className="vacancy-search">Поиск Вакансий</p>
          <p className="favourites">Избранное</p>
        </div>
      </header>
    )
  }
}

export default Header;