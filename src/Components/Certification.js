import React, { Component } from "react";
import Slide from "react-reveal";

class Certification extends Component {
    getRandomColor() {
      let letters = "0123456789ABCDEF";
      let color = "#";
      for (let i = 0; i < 6; i++) {
        color += letters[Math.floor(Math.random() * 16)];
      }
      return color;
    }
  
    render() {
      if (!this.props.data) return null;
  
      const certificates = this.props.data.certificates.map(function (certificates) {
        return (
          <div key={certificates.origin}>
            <h3>{certificates.origin}</h3>
            <p className="info">
              {certificates.title}
              <span>&bull;</span> <em className="date">{certificates.years}</em>
            </p>
            <pre>{certificates.description}</pre>
          </div>
        );
      });
  
      return (
        <section id="certification">
  
          <Slide left duration={1300}>
            <div className="row certification">
              <div className="three columns header-col">
                <h1>
                  <span>Certification</span>
                </h1>
              </div>
  
              <div className="nine columns main-col">{certificates}</div>
            </div>
          </Slide>
        </section>
      );
    }
  }



  export default Certification;