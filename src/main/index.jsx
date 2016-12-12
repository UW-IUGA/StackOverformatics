import React, { Component } from 'react';

import Queue from "./components/queue";
import Enqueue from "./components/enqueue";

import './main.scss';

import firebase from 'firebase';

class Main extends Component {


	componentWillMount(transition) {
		if (this.props.user == null) {
			this.props.router.push("/login");
		}
	}

	render() {

		console.log("render", this);

		return (
			<div className="container">

				<div className="row">

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<Queue
							user={this.props.user}
						/>
					</div>

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<Enqueue
							user={this.props.user}
						/>
					</div>
				</div>

			</div>
		);
	}
}

export default Main;
