import React, { Component } from "react";
import firebase from 'firebase';

class Enqueue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classes: [],
			rooms: []
		};

		firebase.database().ref('classes').on('value', (snapshot) => {
			var classes = [];
			snapshot.forEach((innerSnapshot) => {
				var classData = innerSnapshot.val();
				if (!classData.active) return;
				classes.push(<option key={classData.value} value={classData.value}>{classData.name}</option>);
			})
			this.setState({
				classes: classes
			});
		});
		firebase.database().ref('rooms').on('value', (snapshot) => {
			var rooms = [];
			snapshot.forEach((innerSnapshot) => {
				var roomData = innerSnapshot.val();
				if (!roomData.active) return;
				rooms.push(<option key={roomData.value} value={roomData.value}>{roomData.name}</option>);
			})
			this.setState({
				rooms: rooms
			});
		});
	}

	submitForm(e) {
		e.preventDefault();
		var data = {
			name: this.refs.name.value,
			class: this.refs.class.value,
			room: this.refs.room.value,
			sd: this.refs.sd.value,
			timestamp: firebase.database.ServerValue.TIMESTAMP
		}
		firebase.database().ref("queue").push(data);
	}

	render() {
		return (
			<div>
				<h2>Enqueue</h2>

				<form role="form" onSubmit={(e) => this.submitForm(e)}>
					<legend></legend>

					<div className="form-group">
						<label htmlFor="name">Name</label>
						<input type="text" className="form-control" name="name" ref="name" placeholder="John Appleseed" />
					</div>

					<div className="form-group">
						<label htmlFor="sd">Short Description</label>
						<input type="text" className="form-control" name="sd" ref="sd" placeholder="(React, Firebase, etc)" />
					</div>

					<div className="form-group">
						<label htmlFor="class">Class</label>

						<select name="class" ref="class" className="form-control">
							{
								this.state.classes.length > 1 ? (
									<option value="">-- Select One --</option>
								) : null
							}
							{this.state.classes}
						</select>
					</div>

					<div className="form-group">
						<label htmlFor="room">Room</label>

						<select name="room" ref="room" className="form-control">
							{
								this.state.rooms.length > 1 ? (
									<option value="">-- Select One --</option>
								) : null
							}
							{this.state.rooms}
						</select>
					</div>

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
		);
	}
}

export default Enqueue;
