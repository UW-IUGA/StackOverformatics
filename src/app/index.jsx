import React, { Component, cloneElement } from 'react';
import { IndexLink } from 'react-router'

import firebase from 'firebase';

import iugaImage from './images/iuga.png';

class App extends Component {
	constructor(props) {
		super(props);

		this.state = {
			user: null,
			loading: true
		};

		this.firebaseRefs = [];
	}

	componentWillMount() {
		console.log("MOUNT", this);
		this.firebaseRefs.push(firebase.auth().onAuthStateChanged((user) => {
			console.log(user);
			this.setState({
				user: user,
				loading: false
			});
		}));
	}

	componentWillUnmount() {
		console.log(this.firebaseRefs);
		this.firebaseRefs.forEach((ref) => ref());
	}

	logout() {
		firebase.auth().signOut();
	}

	render() {
		return (
			<div>

				<header className="container">
					<div className="row">
						<div className="col-xs-12 col-sm-6 col-md-8 col-lg-10">
							<h1><IndexLink to="/">StackOverformatics</IndexLink></h1>
						</div>
						<div className="col-xs-12 col-sm-6 col-md-4 col-lg-2">
							<h1>
								<img src={iugaImage} className="img-responsive" alt="IUGA logo" />
							</h1>
						</div>
					</div>
					{
						(!this.state.loading && this.state.user != null) ?
							<div className="row">
								<div className="col-xs-12 col-sm-12 col-md-12 col-lg-12">
									<h5 className="text-right">
										<span>Welcome {this.state.user.displayName} / </span>
										<button
											type="button"
											onClick={(e) => this.logout(e)}
											className="btn btn-sm btn-default"
										>Logout</button>
									</h5>
								</div>
							</div>
						: null
					}
				</header>


				<main>
					{
						this.state.loading ?
							<div className="container"><h1>Loading...</h1></div>
						:
							<div>
								{
									cloneElement(this.props.children, {
										user: this.state.user
									})
								}
							</div>
					}
				</main>

				<footer></footer>

			</div>
		);
	}
}

export default App;
