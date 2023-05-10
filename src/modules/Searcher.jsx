import * as React from "react";
import '../styles/searcher.scss';

class Searcher extends React.Component{
  async componentDidMount(){
    const link = "https://startup-summer-2023-proxy.onrender.com/2.0/"
    let result = await this.requestVacancies(link + 'vacancies');
    console.log(result)

  }
  
  async requestVacancies(url){

    let response = await fetch(url, {
      headers: {
      'x-secret-key': 'GEU4nvd3rej*jeh.eqp',
      'X-Api-App-Id': 'v3.r.137440105.ffdbab114f92b821eac4e21f485343924a773131.06c3bdbb8446aeb91c35b80c42ff69eb9c457948',
    },
    head: JSON.stringify({a: 1, b: 'Textual content'})
  });


    if (response.ok) { // если HTTP-статус в диапазоне 200-299
      // получаем тело ответа (см. про этот метод ниже)
      // let json = await response.json();
      const content = await response.json();
      return content;
    }else {
      console.log("Ошибка HTTP: " + response.status);
    }
  }


  render(){
    return(
      <section className="search-and-result">
        <div className="search-input-wrapper">
          <input type="text" className="search" placeholder="Введите название вакансии"/>
          <img src="./assets/img/search-icon.png" alt="search icon" className="search-icon" />
          <button className="search-button">Поиск</button>
        </div>
        <div className="result-wrapper">
          <div className="result-block">
            <div className="result-inner-block">
              <a href="#" className="job-name">
                Менеджер-дизайнер
              </a>
              <img className="favourite" src="./assets/img/star-not-selected.png" alt="favourite" />
              <div className="conditions">
                <p className="salary-offer">з/п от 70000 rub</p>
                <p className="spot">•</p>
                <p className="working-day">Полный рабочий день</p>
              </div>
              <div className="geolocation">
                <img src="./assets/img/geo-logo.png" alt="geo-logo" width="20px" height="20px" className="geo-logo" />
                <p className="location-name">Новый Уренгой</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    )
  }

}

export default Searcher;
