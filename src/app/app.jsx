import React, { Component } from 'react';

import Queue from "./components/queue";
import Enqueue from "./components/enqueue";

import './app.scss';

class App extends Component {
	render() {

		return (
			<div className="container">

				<div className="row">

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<Queue />
					</div>

					<div className="col-xs-12 col-sm-6 col-md-6 col-lg-6">
						<Enqueue />
					</div>
				</div>

			</div>
		);
	}
}

export default App;
