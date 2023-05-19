import * as React from "react";
import '../styles/paginator.scss';

class Paginator extends React.Component{

  componentDidMount(){
    this.eventListenerForPages();
    this.nextButton();
  }

  componentDidUpdate(){
    this.eventListenerForPages();
  }

  componentWillUnmount(){
    const pagesWrapper = document.querySelector('.pages-wrapper');
    pagesWrapper.remove();
  }


  eventListenerForPages(){
    const pages = document.querySelectorAll('.page-number');
    pages.forEach((page, index) => {
      page.addEventListener('click', (event) => {
        for(page of pages){
          page.removeAttribute('id');
        }
        event.target.setAttribute('id', 'page-selected');
        setTimeout(() => {
          this.props.getSelectedPage(index);
        }, 1000);
      })
    })
  }

  lessCharacter(){
    return "<";
  }

  greaterCharacter(){
    return ">";
  }

  generatePagination(){
    const arr = [];

    const pagesNumber = Math.ceil(Number(this.props.vacanciesLength) / 4);

    for(let i = 1; i < pagesNumber + 1; i++){
      if(i === 1){
        arr.push(<div className="page page-number first-page" key={i} id={i===1?'page-selected':''}>{i}</div>)
      }else{
        i < 4?arr.push(<div className="page page-number" key={i} id={i===1?'page-selected':''}>{i}</div>):arr.push(<div className="page page-number hidden" key={i} id={i===1?'page-selected':''}>{i}</div>)
      }
      
    }

    return arr;
  }

  nextButton(){
    const rightArrow = document.querySelector('.arrow-right');
    const leftArrow = document.querySelector('.arrow-left');

    rightArrow.addEventListener('click', () => {
      let currentPageSelected = document.querySelector('#page-selected');
      
      if(currentPageSelected.nextSibling.className !== "page arrow-right"){
        currentPageSelected.nextElementSibling.className = "page page-number";
        leftArrow.style.color = "#7B7C88";
        if(currentPageSelected.previousSibling.previousSibling && currentPageSelected.previousSibling.previousSibling.className !== "page arrow-left"){
          currentPageSelected.previousSibling.previousSibling.className = "page page-number hidden";
          if(currentPageSelected.nextSibling.nextSibling.className === "page arrow-right"){
            rightArrow.style.color = "#D5D6DC";
          }    
        }
        currentPageSelected.nextSibling.click();
      }
    });

    leftArrow.addEventListener('click', () => {
      let currentPageSelected = document.querySelector('#page-selected');
      if(currentPageSelected.previousSibling.className !== "page arrow-left"){
        currentPageSelected.previousElementSibling.className = "page page-number";
        rightArrow.style.color = "#7B7C88";
        if(currentPageSelected.nextSibling.nextSibling && currentPageSelected.nextSibling.nextSibling.className !== "page arrow-right"){
          currentPageSelected.nextSibling.nextSibling.className = "page page-number hidden";
          if(currentPageSelected.previousSibling.previousSibling.className === "page arrow-left"){
            leftArrow.style.color = "#D5D6DC";
          }    
        }
        currentPageSelected.previousSibling.click();
      }
    })
  }


  render(){
    return(
      <section className="pages-wrapper">
        <div className="page arrow-left">{this.lessCharacter()}</div>
        {this.generatePagination()}
        <div className="page arrow-right">{this.greaterCharacter()}</div>
      </section>
    )
  }

}

export default Paginator;