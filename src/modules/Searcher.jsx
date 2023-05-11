import * as React from "react";
import '../styles/searcher.scss';

class Searcher extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      vacancies: [],
    }
  }

  async componentDidMount(){
    const link = "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/"
    // this.link2 = "https://api.superjob.ru/2.0/";
    const response = await this.requestVacancies(link);
    const result = response.objects;
    this.setState({vacancies: result.map((item, index) => {
      return this.getVacancy(item, index + 1);
    })}) 
  }

  async componentDidUpdate(){
    const link = "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/";
    const response = await this.requestVacancies(link + this.props.filterLink);
    const result = response.objects;
    this.setState({vacancies: result.map((item, index) => {
      return this.getVacancy(item, index + 1);
    })}) 
  }

  componentWillUnmount(){
    const oldVacancies = document.querySelectorAll('.result-wrapper');
    oldVacancies.forEach((element) => {
      element.remove();
    })
  }
  
  async requestVacancies(url){

    let response = await fetch(url, {
      headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    },
    head: JSON.stringify({a: 1, b: 'Textual content'})
  });


    if (response.ok) {
      const content = await response.json();
      return content;
    }else {
      console.log("Ошибка HTTP: " + response.status);
    }
  }

  //Determines, what salary to show in the vacancy block
  determinePayment(obj){
    if(obj.payment_from && obj.payment_to){
      return `з/п ${obj.payment_from} - ${obj.payment_to}`;
    }else if(obj.payment_from && !obj.payment_to){
      return `з/п от ${obj.payment_from}`;
    }else if(!obj.payment_from && obj.payment_to){
      return `з/п до ${obj.payment_to}`;
    }else{
      return `з/п ${" Не указана"}`;
    }
  }

  getVacancy(obj, num){
    return(
      <div className="result-wrapper" key={num}>
          <div className="result-block">
            <div className="result-inner-block">
              <a href="#" className="job-name">
                {obj.profession}
              </a>
              <img className="favourite" src="./assets/img/star-not-selected.png" alt="favourite" />
              <div className="conditions">
                <p className="salary-offer">{this.determinePayment(obj)} {obj.currency}</p>
                <p className="spot">•</p>
                <p className="working-day">{obj.type_of_work.title}</p>
              </div>
              <div className="geolocation">
                <img src="./assets/img/geo-logo.png" alt="geo-logo" width="20px" height="20px" className="geo-logo" />
                <p className="location-name">{obj.town.title}</p>
              </div>
            </div>
          </div>
        </div>
    )
  }

  render(){
    return(
      <section className="search-and-result">
        <div className="search-input-wrapper">
          <input type="text" className="search" placeholder="Введите название вакансии"/>
          <img src="./assets/img/search-icon.png" alt="search icon" className="search-icon" />
          <button className="search-button">Поиск</button>
        </div>
        {this.state.vacancies}
      </section>
    )
  }

}

export default Searcher;
