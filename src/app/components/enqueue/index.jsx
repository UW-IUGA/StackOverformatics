import React, { Component } from "react";
import firebase from 'firebase';

class Enqueue extends Component {
	constructor(props) {
		super(props);

		this.state = {
			classes: []
		};

		firebase.database().ref('classes').on('value', (snapshot) => {
			var classes = [];
			snapshot.forEach((innerSnapshot) => {
				var classData = innerSnapshot.val();
				classes.push(<option key={classData.value} value={classData.value}>{classData.name}</option>);
			})
			this.setState({
				classes: classes
			});
		});
	}

	submitForm(e) {
		e.preventDefault();
		var data = {
			name: this.refs.name.value,
			class: this.refs.class.value,
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

					<button type="submit" className="btn btn-primary">Submit</button>
				</form>

			</div>
		);
	}
}

export default Enqueue;
