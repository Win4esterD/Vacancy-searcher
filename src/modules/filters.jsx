import * as React from "react";
import '../styles/filters.scss';

class Filters extends React.Component{
  constructor(props){
    super(props);
    this.state = {
      industries: [],
      requestLink: '',
    }

    this.addNumberToMinInput = this.addNumberToMinInput.bind(this);
    this.substractNumberFromMinInput = this.substractNumberFromMinInput.bind(this);
    this.addNumberToMaxInput = this.addNumberToMaxInput.bind(this);
    this.substractNumberFromMaxInput = this.substractNumberFromMaxInput.bind(this);
    this.acceptFilters = this.acceptFilters.bind(this);
  }

  async componentDidMount(){
    const minInput = document.querySelector('.min-counter');
    const maxInput = document.querySelector('.max-counter');
    const industries = await this.getIndustries();
    const filtersButton = document.querySelector('.filters-submit');
    filtersButton.addEventListener('click', this.acceptFilters);
    
    const searchInput = document.querySelector('.search-button');

    searchInput.addEventListener('click', this.acceptFilters);


    this.setState({industries:industries.map((item) => {
      return (
        <option className="industry-option" key={item.key} value={item.key}>{item.title_rus}</option>
      )
    }) })

    minInput.addEventListener('change', () => {
      if(Number(minInput.value) < 0){
        minInput.value = 0;
      }
    })

    maxInput.addEventListener('change', () => {
      if(Number(maxInput.value) < 0){
        maxInput.value = 0;
      }
    })
  }

  async getIndustries(){
    const industries = await fetch('https://startup-summer-2023-proxy.onrender.com/2.0/catalogues/', {
      headers: {
        'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
        'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
      },
      head: JSON.stringify({a: 1, b: 'Textual content'})
    });

    if(industries.ok){
      return await industries.json();
    }else{
      console.log("Ошибка HTTP: " + industries.status)
    }
  }

  addNumberToMinInput(){
    const minInput = document.querySelector('.min-counter');
    minInput.value = Number(minInput.value) + 1;
  }

  substractNumberFromMinInput(){
    const minInput = document.querySelector('.min-counter');
    if(Number(minInput.value) > 0){
      minInput.value = Number(minInput.value) - 1;
    }
  }

  addNumberToMaxInput(){
    const maxInput = document.querySelector('.max-counter');
    maxInput.value = Number(maxInput.value) + 1;
  }

  substractNumberFromMaxInput(){
    const maxInput = document.querySelector('.max-counter');
    if(Number(maxInput.value) > 0){
      maxInput.value = Number(maxInput.value) - 1;
    }
  }

  acceptFilters(){
    const industry = document.querySelector('.industry-select');
    const minInput = document.querySelector('.min-counter');
    const maxInput = document.querySelector('.max-counter');
    const keywordInput = document.querySelector('.search');
    
    const minSalary = parseInt(minInput.value)? minInput.value: '0';
    const maxSalary = parseInt(maxInput.value)? maxInput.value: '0';
    const keyword = keywordInput.value? `&&keyword=${keywordInput.value}`: '';
    let industryQuery = '';

    if(industry.value !== "Выберите отрасль"){
      industryQuery = `&&catalogues=${industry.value}`;
    }

    const resultLink = `?payment_from=${minSalary}&&payment_to=${maxSalary}${keyword}${industryQuery}&&published=1`;
    this.props.getFilters(resultLink);
  }

  render(){
    return(
      <aside className="filters-aside-menu">
        <div className="filters-wrapper">
          <div className="filter-menu">
            <div className="filter-menu-head">
              <p className="filters">Фильтры</p>
              <p className="drop-all">Сбросить все <span><img src="./assets/img/cross.png" alt="cross" /></span></p>
            </div>
            <div className="industry">
              <p className="industry-header">Отрасль</p>
              <select className="industry-select" name="industry-selector" id="industry-selector">
                <option className="industry-option" value="Выберите отрасль">Выберите отрасль
                </option>
                {this.state.industries}
              </select>
            </div>
            <div className="salary-inputs">
              <p className="salary">Оклад</p>
              <input className="salary-counter min-counter" min="0" type="number" name="from" placeholder="От" />
              <div className="up-down-min-arrows">
                <img src="./assets/img/up-arrow.png" alt="up-arrow" className="up-arrow" onClick={this.addNumberToMinInput}/>
                <img src="./assets/img/down-arrow.png" alt="down-arrow" className="down-arrow" onClick={this.substractNumberFromMinInput}/>
              </div>
              <div className="up-down-max-arrows">
                <img src="./assets/img/up-arrow.png" alt="up-arrow" className="up-arrow" onClick={this.addNumberToMaxInput}/>
                <img src="./assets/img/down-arrow.png" alt="down-arrow" className="down-arrow" onClick={this.substractNumberFromMaxInput}/>
              </div>
              <input className="salary-counter max-counter" type="number" name="to" placeholder="До" />
            </div>

            <button type="submit" className="filters-submit">Применить</button>
          </div>
        </div>
      </aside>
    )
  }
}

export default Filters;