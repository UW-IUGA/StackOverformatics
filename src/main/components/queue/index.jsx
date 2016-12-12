import React, { Component } from "react";
import firebase from 'firebase';

import './queue.scss';

class Queue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			queue: (<li className="list-group-item">Loading...</li>)
		};

		this.firebaseRefs = [];
	}

	componentWillMount() {
		var queueReferance = firebase.database().ref('queue');
		queueReferance.orderByChild("timestamp").on('value', (snapshot) => {
			var queue = [];
			snapshot.forEach((innerSnapshot) => {
				var queuer = innerSnapshot.val()
				queue.push(
					<li key={queuer.name + queuer.timestamp} className="list-group-item">
						{
							this.props.user.uid === queuer.uid ?
								<span className="badge badge-button badge-error" onClick={() => this.dequeue(innerSnapshot)}>X</span>
							: null
						}
						<span className="badge">{queuer.room}</span>
						<span className="badge">{queuer.class}</span>
						<h5>{queuer.name}</h5>
						<p>{queuer.sd}</p>
					</li>
				);
			})
			this.setState({
				queue: queue
			});
		})
		this.firebaseRefs.push(() => queueReferance.off());
	}

	componentWillUnmount() {
		console.log("UnMount Queue", this);
		this.firebaseRefs.forEach((ref) => ref());
	}

	dequeue(queuer) {
		var data = queuer.val();
		if (this.props.user.uid === data.uid) {
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
					{
						this.state.queue.length > 0 ?
							this.state.queue
						:
							<li className="list-group-item">No one in Queue</li>
					}
				</ul>

			</div>
		);
	}
}

export default Queue;
