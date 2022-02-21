import React, { Component } from "react";
import Slide from "react-reveal";

class Work extends Component {
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

    const works = this.props.data.works.map(function (works) {
      return (
        <div key={works.company}>
          <h3>{works.company}</h3>
          <p className="info">
            {works.title}
            <span>&bull;</span> <em className="date">{works.years}</em>
          </p>
          <pre>{works.description}</pre>
        </div>
      );
    });

    return (
      <section id="work">

        <Slide left duration={1300}>
          <div className="row work">
            <div className="three columns header-col">
              <h1>
                <span>Work Experience</span>
              </h1>
            </div>

            <div className="nine columns main-col">{works}</div>
          </div>
        </Slide>
      </section>
    );
  }
}

export default Work;
