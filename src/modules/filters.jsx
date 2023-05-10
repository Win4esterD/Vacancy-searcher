import * as React from "react";
import '../styles/filters.scss';

class Filters extends React.Component{
  constructor(props){
    super(props);
    this.addNumberToMinInput = this.addNumberToMinInput.bind(this);
    this.substractNumberFromMinInput = this.substractNumberFromMinInput.bind(this);
    this.addNumberToMaxInput = this.addNumberToMaxInput.bind(this);
    this.substractNumberFromMaxInput = this.substractNumberFromMaxInput.bind(this);
  }

  componentDidMount(){
    const minInput = document.querySelector('.min-counter');
    const maxInput = document.querySelector('.max-counter');
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
              <select className="industry-selector" name="industry-selector" id="industry-selector">
                <option className="industry-option" value="">Выберите отрасль
                </option>
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