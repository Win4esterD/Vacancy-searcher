import * as React from "react";
import '../styles/searcher.scss';
import SearchInput from "./Search-input";
import Paginator from "./Paginator";

class Searcher extends React.Component{

  constructor(props){
    super(props);
    this.state = {
      vacancies: [],
      selectedPageIndex: 0,
      filterLink: '',
    }

    this.getSelectedPage = this.getSelectedPage.bind(this);
    this.setVacancies = this.setVacancies.bind(this);
  }

  componentDidMount(){
    this.setVacancies();
  }

  componentDidUpdate(){
    this.setVacancies(this.props.filterLink);
  }



  async setVacancies(url){
    const link = "https://startup-summer-2023-proxy.onrender.com/2.0/vacancies/"
    const response = await this.requestVacancies(link + url);

    if(response){
      this.setState({vacancies: response.map((item, index) => {
        return this.generateVacancy(item, index + 1);
      })}) 
    }
  }

  componentWillUnmount(){
    const oldVacancies = document.querySelectorAll('.result-wrapper');
    oldVacancies.forEach((element) => {
      element.remove();
    })
  }
  
  //Makes a request to the server to fetch Array with vacancie objects
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
      return content.objects;
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

  //generates vacancy to upload it to the view page
  generateVacancy(obj, num){
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

  //dives into "Paginator" as prop, to pull the selected page
  getSelectedPage(index){
    this.setState({selectedPageIndex: index})
  }

  //Shows vacancies according to selected page
  showVacanciesAccordingToSelectedPage(){
    if(this.state.selectedPageIndex === 0){
      return this.state.vacancies.slice(0, 4);
    }
    else if(this.state.selectedPageIndex === 1){
      return this.state.vacancies.slice(4, 8);
    }else if(this.state.selectedPageIndex === 2){
      return this.state.vacancies.slice(8, 12);
    }else{
      return this.state.vacancies.slice(12, 16);
    }
  }


  render(){
    return(
      <section className="search-and-result">
       <SearchInput />
        {this.showVacanciesAccordingToSelectedPage()}
        <Paginator vacanciesLength={this.state.vacancies.length} getSelectedPage={this.getSelectedPage}/>
      </section>
    )
  }

}

export default Searcher;
