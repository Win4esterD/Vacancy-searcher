import * as React from "react";
import '../styles/paginator.scss';

class Paginator extends React.Component{

  componentDidMount(){
    this.eventListenerForPages()
  }

  componentDidUpdate(){
    this.eventListenerForPages()
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
        }, 1000)
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
    let pagesToGenerate = 0;

    const pagesNumber = Math.ceil(Number(this.props.vacanciesLength) / 4);

    if(pagesNumber >= 3){
      pagesToGenerate = 4
    }else{
      pagesToGenerate = pagesNumber;
    }

    for(let i = 1; i < pagesToGenerate; i++){
      arr.push(<div className="page page-number" key={i} id={i===1?'page-selected':''}>{i}</div>)
    }

    return arr;
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