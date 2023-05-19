import * as React from "react";
import '../styles/header.scss';

class Header extends React.Component{

  constructor(props){
    super(props);

    this.goBackButton = this.goBackButton.bind(this);
  }

  componentDidMount(){
    const logo = document.querySelector('.logo-wrapper');

    logo.addEventListener('click', this.goBackButton);
  }

  goBackButton(){
    const vacancyDescriptionBlock = document.querySelector('.vacancy-description-block');
    const searchAndResultBlock = document.querySelector('.show-vacancies-wrapper');
    const filterAsideMenu = document.querySelector('.filters-aside-menu');
    const descriptionWrapper = document.querySelector('.description-wrapper');

    vacancyDescriptionBlock.style.display = 'none';
    searchAndResultBlock.style.display = 'block';
    filterAsideMenu.style.display = 'block';
    
    if(descriptionWrapper){
      descriptionWrapper.remove();
    }
  }

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