import React, { Component } from "react";
import { Fade, Slide } from "react-reveal";
import { init } from '@emailjs/browser';
init("user_ElsCAskOcn8YrjIAW4fV5");


const serviceId = 'service_7xjce1j';
const templateId = 'template_kvyf0v4';
const userId = 'user_ElsCAskOcn8YrjIAW4fV5';

class Contact extends Component {
  constructor(props) {
    super(props);
    this.state = { name: '', email: '', subject: '', message: '', errPromptMsg: '' };
    this.handleSubmit = this.handleSubmit.bind(this);
  }

  render() {
    if (!this.props.data) return null;

    const name = this.props.data.name;
    const street = this.props.data.address.street;
    const city = this.props.data.address.city;
    const state = this.props.data.address.state;
    const zip = this.props.data.address.zip;
    const phone = this.props.data.phone;
    const message = this.props.data.contactmessage;

    return (
      <section id="contact">
        <Fade bottom duration={1000}>
          <div className="row section-head">
            <div className="two columns header-col">
              <h1>
                <span>Get In Touch.</span>
              </h1>
            </div>

            <div className="ten columns">
              <p className="lead">{message}</p>
            </div>
          </div>
        </Fade>

        <div className="row">
          <Slide left duration={1000}>

            <div className="eight columns">
              <form action="" method="post" id="contactForm" name="contactForm">

                <div id="message-warning"> {this.state.errPromptMsg} </div>
                <div id="message-success">
                  <i className="fa fa-check"></i>Your message was sent, thank you!
                  <br />
                </div>

                <fieldset>
                  <div>
                    <label htmlFor="contactName">
                      Name <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactName"
                      name="contactName"
                      onChange={(e) => this.setState({ name: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactEmail">
                      Email <span className="required">*</span>
                    </label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactEmail"
                      name="contactEmail"
                      onChange={(e) => this.setState({ email: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactSubject">Subject</label>
                    <input
                      type="text"
                      defaultValue=""
                      size="35"
                      id="contactSubject"
                      name="contactSubject"
                      onChange={(e) => this.setState({ subject: e.target.value })}
                    />
                  </div>

                  <div>
                    <label htmlFor="contactMessage">
                      Message <span className="required">*</span>
                    </label>
                    <textarea
                      cols="50"
                      rows="12"
                      id="contactMessage"
                      name="contactMessage"
                      onChange={(e) => this.setState({ message: e.target.value })}
                    ></textarea>
                  </div>
                  <div>
                    <label >
                    </label>
                    <input type="button" value="Submit" className="btn btn--submit" onClick={this.handleSubmit} />
                  </div>

                </fieldset>
                {/* <button className="submit">Submit</button> */}
                {/* <span id="image-loader">
                      <img alt="" src="images/loader.gif" />
                    </span> */}

              </form>


            </div>
          </Slide>

          <Slide right duration={1000}>
            <aside className="four columns footer-widgets">
              <div className="widget widget_contact">
                <h4>Contact Information</h4>
                <p className="address">
                  {name}
                  {street} <br />
                  {city}, {state} {zip}
                  <br />
                  <span>{phone}</span>
                </p>
              </div>
            </aside>
          </Slide>
        </div>
      </section>
    );
  }

  handleSubmit(event) {
    if (this.state.name == '') {
      this.handleError('missingName')
    } else if (this.state.email == '') {
      this.handleError('missingEmail')
    } else if (/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(this.state.email) == false) {
      this.handleError('invalidEmail')
    } else if (this.state.message == '') {
      this.handleError('missingMessage')
    } else {
      const variables = { from_name: this.state.name, from_email: this.state.email, subject: this.state.subject, message: this.state.message };
      this.sendFeedback(serviceId, templateId, userId, variables)
    }
  }

  handleError(errType, err) {
    var errMsg = ''
    switch (errType) {
      case 'missingName':
        errMsg = 'Name is required'
        break;
      case 'missingEmail':
        errMsg = 'Email is required'
        break;
      case 'invalidEmail':
        errMsg = 'Please enter a valid email'
        break;
      case 'missingMessage':
        errMsg = 'Message is required'
        break;
      case 'emailJS':
        errMsg = 'An error occurred internally when sending the email. (Status: ' + err.status + ', Message: ' + err.text + ')'
        break;
      default:
        errMsg = 'Unknown Error'
    }
    this.setState({ errPromptMsg: errMsg })
    this.handlePrompts("message-warning", 6000)
  }

  sendFeedback(serviceId, templateId, userId, variables) {
    window.emailjs.send(
      serviceId, templateId, variables, userId
    ).then(res => {
      this.handlePrompts("message-success", 3000)
      // console.log('Email successfully sent!')
    })
      // Handle errors here however you like, or use a React error boundary
      .catch(err => this.handleError("emailJS", err))
  }

  handlePrompts(promptId, fadeTime) {
    var p = document.getElementById(promptId)
    p.style.display = 'block'
    p.style.opacity = '100'
    setTimeout(function () {
      p.style.transition = '.5s';
      p.style.opacity = '0';
    }, fadeTime);
    setTimeout(function () {
      p.style.display = 'none';
    }, fadeTime + 250);
  }
}

export default Contact;
