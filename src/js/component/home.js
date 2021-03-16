import React from "react";

var link = "https://assets.breatheco.de/apis/fake/todos/user/ablue968";

//create your first component
export class Home extends React.Component {
	constructor() {
		super();
		this.state = {
			contacts: [],
			input: ""
		};
	}

	addListItems = e => {
		let key = e.which || e.keyCode || 0;
		if (key !== 13) return;

		let newContacts = this.state.contacts;
		let newObject = { label: this.state.input, done: false };
		newContacts.push(newObject);
		fetch(link, {
			method: "PUT",
			body: JSON.stringify(newContacts),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(newRes => newRes.text())
			.then(response => {
				console.log(response);
				this.setState({
					contacts: newContacts,
					input: ""
				});
			})
			.catch(error => console.error("Error:", error));
	};

	deleteListItems = index => {
		let updatedContacts = this.state.contacts;
		updatedContacts[index].done = true;
		fetch(link, {
			method: "PUT",
			body: JSON.stringify(updatedContacts),
			headers: {
				"Content-Type": "application/json"
			}
		})
			.then(newRes => newRes.text())
			.then(response => {
				console.log(response);
				this.setState({
					contacts: updatedContacts
				});
			})
			.catch(error => console.error("Error:", error));
	};

	render() {
		return (
			<div className="container-fluid">
				<div className="header">
					<h1>Todos</h1>
				</div>
				<div className="text-center toDos">
					<input
						id="addItem"
						type="text"
						className="mb-3"
						placeholder="What needs to be done?"
						onKeyPress={this.addListItems}
						value={this.state.input}
						onChange={e => this.setState({ input: e.target.value })}
					/>
					<ul className="mx-auto">
						{this.state.contacts.map((item, index) => {
							return (
								<li
									className="flexItems d-flex justify-content-between"
									key={index}>
									<div className="listItem">
										{item.label} {item.done && " - Done"}
									</div>
									<div className="deleter">
										<button
											type="button"
											className="btn btn-outline-danger"
											onClick={() =>
												this.deleteListItems(index)
											}>
											X
										</button>
									</div>
								</li>
							);
						})}
						<li className=" d-flex justify-content-center">
							{this.state.contacts.length === 1
								? this.state.contacts.length + " total item"
								: this.state.contacts.length + " total items"}
						</li>
					</ul>
				</div>
			</div>
		);
	}
}
