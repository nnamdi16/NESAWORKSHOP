import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { NavLink } from 'react-router-dom';
import '../css/header.css';
import Header from './Header'
// import '../inline.js';
import {Button, ButtonToolbar} from 'reactstrap'
import { Top, BodyContainer, Footer, SocialMedia } from "./util"
import '../css/bootstrap.min.css';
import Modal from 'react-modal';

Modal.setAppElement('#root')

const customStyles = {
    content:{
        top:'50%',
        left:'50%',
        right:'auto',
        bottom:'auto',
        marginRight:'-50%',
        transform:'translate(-50%,-50%)'
    }
};

const inputStyles = {
    "border": "none",
    "borderBottom": "1px solid #f58b3b",
    "outline":"none",
}

const buttonStyles = {
    "border": "1px solid #f58b3b",
    "color": "#f58b3b",
    "background": "#fff",
    "borderRadius": "10px",
    "outline":"none"
}

const closeButtonStyle = {
    "width": "50%",
    "height": "50%",
    "borderRadius": "25%",
    "float":"right"
}

class ClientWorkshop extends Component {
    constructor(props) {
        super(props)

let dLocation = "22 joy avenue ajao estate lagos";
 dLocation.toString().replace(/\s+/g, '+');
// const url =`https://maps.google.com/maps?q=${dLocation}&t=k&z=19&ie=UTF8&iwloc=&output=embed`;
    const { location: { state: { workshop } } } = this.props;
    console.log(workshop);
    const {startDate,endDate, time, title, fee, bannerUrl,description, id, no_of_seats, applications} = workshop;
    console.log(workshop);
    this.workshopId = id;
    const top = {
        startDate,
        endDate,
        time,
        title,
        fee,
 
    }

    const bottom = {
        bannerUrl,
        time,
        startDate,
        endDate,
        description
    }


    this.state ={
        top,
        bottom,
        fee,
        no_of_seats,
        applications,
        modalIsOpen:false,
        messageModalOPen:false,
        modal:{
            title:"",
            message:""
        }
    }

    console.log(this.state)


        // this.state = {
        //     top: {
        //         day: "June 2018",
        //         time: "8AM - 12AM",
        //         title: "React and Redux Fundamentals",
        //         cost: "5000 "
        //     },
        //     fulldate: "Saturday, June 3, 2018",
        //     fulltime: "08:00AM to 12:00PM",
        //     content:"In this workshop we delve into one of the most powerful but often confusing concepts in programming: functions that call themselves. We’ll take a look at recursion under the hood to better understand how and when to use this powerful technique.",
        //     url:url

        // }

    }

    openModal = () => {
        this.setState({modalIsOpen:true});
    }

    afterOpenModal = () => {
        //references are now sync'd and can be opened
        this.subtitle.style.color = '#f56111';
    }

    closeModal = () => {
        this.setState({modalIsOpen:false});
    }
    
    openMessageModal = (title,message)=>{

        this.setState({
            messageModalOPen:true,
            modal:{title, message}
        })
    }

    closeMessageModal =()=>{
        this.setState({
            messageModalOPen:false,
            modal:{title:"",message:""}
        })
    }


   
    initPayment = (e)=>{
    //     const email = prompt("Please enter email");
    //     if((email === null) || email === "") {
    //         alert("Email field missing");
    //         return;
    // }
    //     const amount = this.state.top.fee;
        e.preventDefault();
        const data = {
            "email": e.target.email.value,
            "amount": this.state.top.fee,
            "fullname":e.target.fullname.value,
            "phone":e.target.phone.value,
            "workshop_id":this.workshopId
        }
        this.closeModal()

        console.log(data)
        this.payWithPaystack(data)

    }

    payWithPaystack = ({ email, amount, fullname, phone, workshop_id })=>{
        var that = this;
    var handler = window.PaystackPop.setup({
      key: 'pk_test_4edb6704ac9c9db84e986ca247970a5160fe5651',
      email,
      amount,
      ref: ''+Math.floor((Math.random() * 1000000000) + 1), // generates a pseudo-unique reference. Please replace with a reference you generated. Or remove the line entirely so our API will generate one for you
      metadata: {
         custom_fields: [
                    {
                        fullname,
                        phone,
                        workshop_id
                    }
                ]
      },
      callback: function(response){
          that.openMessageModal('success','Thank you for registering for this workshop')
          console.log(response)
      },
      onClose: function(){
          that.closeMessageModal()
      }
    });
    handler.openIframe();
  }

    render() {
        return (
            <div>
                 <Header />
                <Top openModal={this.openModal} top={this.state.top} seatsLeft={this.state.no_of_seats - this.state.applications} />
                <BodyContainer bottom={this.state.bottom} />
                <SocialMedia openModal={this.openModal} fee={this.state.fee} seatsLeft={this.state.no_of_seats - this.state.applications} />
                <Footer />
                <div>
                    {/*<button onClick={this.openModal}>Open Modal</button>*/}
                    <Modal
                        isOpen={this.state.modalIsOpen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeModal}
                        style={customStyles}
                        contentLabel="Modal for registeration"
                    >
{/*
                        <div style={closeButtonStyle}><button onClick={this.closeModal}>X</button>
                        </div>*/}
                        <h4 ref={subtitle => this.subtitle = subtitle}>Fill out details</h4><br />
                        <form onSubmit={this.initPayment}>
                            <div style={{"color":"#f58b3b"}}>Fullname</div>
                            <p><input  name="fullname" required type="text" style={inputStyles} /></p>
                            <div style={{"color":"#f58b3b"}}>Phone</div>
                            <p><input name="phone" required type="tel" style={inputStyles}  /></p>
                            <div style={{"color":"#f58b3b"}}>Email</div>
                            <p><input  name="email" required type="email" style={inputStyles} /></p><br />
                            <div style={{"float":"right"}}><button type="submit" style={buttonStyles}>Submit</button></div>

                        </form>
                    </Modal>

                    {/*message modal*/}
                    <Modal
                        isOpen={this.messageModalOPen}
                        onAfterOpen={this.afterOpenModal}
                        onRequestClose={this.closeMessageModal}
                        style={customStyles}
                        contentLabel="Modal For successful payment"
                    >

                        <h4 ref={subtitle => this.subtitle = subtitle}>{this.state.modal.title}</h4><br />
                        <p>{this.state.modal.message}</p>
                        {/*<form onSubmit={this.initPayment}>
                            <div style={{"color":"#f58b3b"}}>Fullname</div>
                            <p><input  name="fullname" required type="text" style={inputStyles} /></p>
                            <div style={{"color":"#f58b3b"}}>Phone</div>
                            <p><input name="phone" required type="tel" style={inputStyles}  /></p>
                            <div style={{"color":"#f58b3b"}}>Email</div>
                            <p><input  name="email" required type="email" style={inputStyles} /></p><br />
                            <div style={{"float":"right"}}><button type="submit" style={buttonStyles}>Submit</button></div>

                        </form>*/}
                    </Modal>
                    {/*end message modal*/}
                </div>
                {/*gjjghjg*/}
                
                {/*<ButtonToolbar>
        <Button bsStyle="primary" onClick={this.handleShow}>
          Launch demo modal
        </Button>

        <Modal
          {...this.props}
          show={this.state.show}
          onHide={this.handleHide}
          dialogClassName="custom-modal"
        >
          <Modal.Header closeButton>
            <Modal.Title id="contained-modal-title-lg">
              Modal heading
            </Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <h4>Wrapped Text</h4>
            <p>
              Ipsum molestiae natus adipisci modi eligendi? Debitis amet quae
  cumque dolorem.
            </p>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleHide}>Close</Button>
          </Modal.Footer>
        </Modal>
      </ButtonToolbar>*/}
            </div>
        )
    }
}

export default ClientWorkshop;