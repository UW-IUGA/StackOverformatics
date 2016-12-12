import React, { Component } from 'react';

import firebase from 'firebase';

class Login extends Component {
	constructor(props) {
		super(props);

		this.state = Object.assign({}, this.props.location.state);
	}

	componentWillMount(transition) {
		if (this.props.user != null) {
			this.props.router.push("/");
		}
	}

	login(e) {
		var provider = new firebase.auth.GoogleAuthProvider();
		provider.addScope('email');
		provider.setCustomParameters({
			'hd': 'uw.edu'
		});
		firebase.auth().signInWithRedirect(provider);
	}

	render() {

		console.log("render", this);

		return (
			<div className="container">

				<div className="row">

					<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">


						{ this.state.error != null &&
							<div className="alert alert-danger">
								<strong>Error</strong> {this.state.error}
							</div>
						}

						<button
							type="button"
							onClick={(e) => this.login(e)}
							className="btn btn-lg btn-block btn-default"
						>Login with UW Google</button>

					</div>

				</div>

			</div>
		);
	}
}

export default Login;
