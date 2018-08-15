import React, { Component } from 'react';
// import ReactDOM from 'react-dom';
// import { NavLink } from 'react-router-dom';
import { Applicant, Logout } from './util';
import '../css/bootstrap.min.css';
import '../css/applicants.css';
import '../css/index.css'

class Applicants extends Component {
    constructor(props) {
        super(props)

        const that = this;
        window.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			  // User is signed in.
			  console.log("there is a user")
			  console.log(user);
			} else {
			  // No user is signed in.
			  console.log("No user");
              that.props.history.push('/')

			}
		  })


        const id = this.props.match.params.workshopId;
    const { location: { state: { workshopTitle } } } = this.props;
    this.title = workshopTitle;

        this.id = Boolean(id) ? id : 'undefined';
        console.log(this.props)

        // this.state = {
        //     applicants: [
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         },
        //         {
        //             display_name: "Jane Dole",
        //             email: "janedoe@gmail.com"
        //         },
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         },
        //         {
        //             display_name: "John Doe",
        //             email: "johndoe@gmail.com"
        //         }
        //     ]
        // }

        this.state = {
            applicants: [{}, {}, {}, {}]
        }
    }

    componentDidMount() {
        let db = window.firebase.firestore();
        // const firestore = firebase.firestore();
        const settings = { timestampsInSnapshots: true };
        db.settings(settings);
        this.db = db;

        if (this.id !== 'undefined') {
            this.getApplicants(this.id);
        }
    }

    logout = (e) => {
        e.preventDefault();
        console.log("logging you out")
        const that = this;
        window.firebase.auth().signOut().then(function () {
            // Sign-out successful.
            that.props.history.push('/')
        }).catch(function (error) {
            // An error happened.
            alert('you have not successful');
        });
    }

    filterApplicants = (e, searchItem) => {
        console.log(e.target.value)
        let applicants = this.state.applicants.filter(applicant => {
            console.log(applicant.display_name.includes(e.target.value))
            return applicant.display_name.includes(e.target.value);
        })
        // console.log(applicants)
        // this.setState({applicants})
    }

    getApplicants = (id) => {
        let db = this.db.collection("Applicants")
        db.where("workshop_id", "==", id)
            .get()
            .then((docs) => {
                this.handleSuccess(docs)
            })
            .catch(function (error) {
                console.error("Error getting Workshop Applicants: ", error);
                alert("Error getting Workshop Applicants: ");

            });
    }

    handleSuccess = (docs) => {

        const data = [];
        docs.forEach(function (doc) {
            // doc.data() is never undefined for query doc snapshots
            data.push({ id: doc.id, ...doc.data() })
        });
        this.setState({ applicants: [...data] })
    }

    deleteApplicant = (id) => {
        this.db.collection("Applicants").doc(id).delete()
            .then(function () {
                console.log("Document successfully deleted!");
                const applicants = this.state.applicants.filter(function (applicant) {
                    return applicant.id !== id;
                })
                this.setState({
                    applicants
                })
            }).catch(function (error) {
                console.error("Error removing document: ", error);
            });

    }


    render() {
        return (
            <div>
                <Logout logout={this.logout} />
                <div id="background" className="container">
                    <div>
                        <div className="d-flex flex-row p-3">
                        <h1>Applicants</h1><br /> 
                        </div>
                        <div className="d-flex n_searchItem flex-lg-row-reverse flex-md-row-reverse p-3 ">
                        <input onChange={this.filterApplicants} className=" mt-0" type="search" id="input" placeholder="search" />
                        </div>
                        <div className="d-flex flex-row p-3">
                        <h2>{this.title}</h2>
                        </div>
                        <hr className="half-rule" />
                    </div><br />
                    {this.state.applicants.map((applicant, i) => (
                        <div>
                            <Applicant key={i} deleteApplicant={() => { this.deleteApplicant(applicant.id) }} key={i} applicant={applicant} />
                            {/*<hr className="half-rule" />*/}
                        </div>
                    ))}
                </div>
            </div>
        )
    }
}

export default Applicants;