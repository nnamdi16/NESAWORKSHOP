import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import '../css/login.css';
import '../css/font-awesome.css';



class AdminLogin extends Component{
	constructor(props){
		super(props)

		window.firebase.auth().onAuthStateChanged(function(user) {
			if (user) {
			  // User is signed in.
			  alert("there is a user")
			  console.log(user);
			} else {
			  // No user is signed in.
			  alert("No user")

			}
		  })


	}

	// componentDidMount(){
	// 	console.log("mounted")
	// 	window.firebase.auth().onAuthStateChanged(function(user) {
	// 		if (user) {
	// 		  // User is signed in.
	// 		  alert("therws is a user")
	// 		  console.log(user);
	// 		} else {
	// 		  // No user is signed in.
	// 		  alert("No user")

	// 		}
	// 	  })
	// }
	
	login =(e)=>{
		e.preventDefault();
		
		
		let email = e.target.email.value;
		let password = e.target.password.value;
		let username = e.target.username.value;
		
		window.firebase.auth().signInWithEmailAndPassword(email, password)
		.then((res) => {
			console.log("success",res);
			//route admin to workshops page
		})
		.catch(
			function(err) {
				console.log(err.code);
				
			}
		)
		e.target.reset();
	}


	render(){
	return(
		<div>
		<section className="login-maintop">
		<div className="login-main">
		<header><h1 className="admin_title">nesa workshop admin login</h1></header>
		<div className="login-form">
		<h2 className="admin_title">Login</h2>
		<form onSubmit = {this.login}>
				<span><i className="fa fa-user-o" aria-hidden="true"></i></span>
				<input type="text" name="username" placeholder="Username" required=""/>
				<span><i className="fa fa-envelope-o" aria-hidden="true"></i></span>
				<input type="email" name="email" placeholder="Email" required=""/>
				<span><i className="fa fa-unlock-alt" aria-hidden="true"></i></span>
				<input type="password" name="password" placeholder="Password" required=""/>
				{/* <input type="submit" value="login"/> */}
				<button className="admin_button">Login</button>
			</form>
			<div className="login-password">
				<span><a href="#">forgot password</a></span>
			</div>
			<div className="login-input">
			
			</div>
			<div className="social-icons">
				<ul>
					<li><a href="#"><i className="fa fa-facebook" aria-hidden="true"></i></a></li>
					<li><a href="#"><i className="fa fa-twitter" aria-hidden="true"></i></a></li>
					<li><a href="#"><i className="fa fa-google-plus" aria-hidden="true"></i></a></li>
				</ul>
				
			</div>
		</div>
	</div>
		</section>
	</div>
	);
	}
}

export default AdminLogin;

