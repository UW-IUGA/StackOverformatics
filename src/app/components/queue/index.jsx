import React, { Component } from "react";
import firebase from 'firebase';

import './queue.scss';

class Queue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: []
		};

		firebase.database().ref('queue').on('value', (snapshot) => {
			var queue = [];
			snapshot.forEach((innerSnapshot) => {
				var queuer = innerSnapshot.val()
				queue.push(
					<li key={queuer.name + queuer.timestamp} className="list-group-item">
						<span className="badge badge-button badge-error" onClick={() => this.dequeue(innerSnapshot)}>X</span>
						<span className="badge">{queuer.room}</span>
						<span className="badge">{queuer.class}</span>
						{queuer.name}
					</li>
				);
			})
			this.setState({
				queue: queue
			});
		});

		firebase.database().ref("password").once('value').then((snapshot) => {
			this.password = snapshot.val();
		});

	}

	dequeue(queuer) {
		var password = window.prompt("Password?");
		if (password === this.password) {
			var data = queuer.val();
			data.dequeued = firebase.database.ServerValue.TIMESTAMP;
			firebase.database().ref('dequeued').push(data);
			queuer.ref.remove();
		}
	}

	render() {
		return (
			<div>
				<h2>Queue</h2>

				<ul className="list-group">
					{this.state.queue}
				</ul>

			</div>
		);
	}
}

export default Queue;
