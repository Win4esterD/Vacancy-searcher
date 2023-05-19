import * as React from "react";
import '../styles/vacancy-description.scss';

class VacancyDescription extends React.Component{

  componentDidUpdate(){
    this.parseVacancyRichText();
  }

  parseVacancyRichText(){  
    
    if(this.props.vacancyObject.vacancyRichText){
      const wrapper = document.createElement('div');
      const requirements = document.querySelector('.requirements-innerblock');
      requirements.innerHTML = this.props.vacancyObject.vacancyRichText;
      wrapper.className = 'description-wrapper';
    }
  }

  render(){
    return(
      <section className="vacancy-description-block">
        <div className="result-wrapper-descr">
          <div className="result-block-descr">
            <div className="result-inner-block">
              <p href="#" className="job-name-descr" id={this.props.vacancyObject.id}>
                {this.props.vacancyObject.profession}
              </p>
              <img className="favourite" src="./assets/img/star-not-selected.png" alt="favourite" />
              <div className="conditions">
                <p className="salary-offer-descr">{this.props.determinePayment(this.props.vacancyObject)} {this.props.vacancyObject.currency}</p>
                <p className="spot">•</p>
                <p className="working-day-descr">{this.props.vacancyObject.type_of_work? this.props.vacancyObject.type_of_work.title: ''}</p>
              </div>
              <div className="geolocation">
                <img src="./assets/img/geo-logo.png" alt="geo-logo" width="20px" height="20px" className="geo-logo" />
                <p className="location-name">{this.props.vacancyObject.town? this.props.vacancyObject.town.title: ''}</p>
              </div>
            </div>
          </div>
        </div>
        <div className="requirements">
          <div className="requirements-innerblock">

          </div>
        </div>
      </section>
    )
  }
}

export default VacancyDescription;