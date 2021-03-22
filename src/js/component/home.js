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

	async loadTodos() {
		var requestOptions = {
			method: "GET"
		};
		try {
			let res = await fetch(link, requestOptions);
			let result = await res.json();
			let todoList = result.map((element, index) => {
				element.id = index;
				return element;
			});
			this.setState({ ...this.state, contacts: todoList });
		} catch (error) {
			console.log("error", error);
		}
	}

	componentDidMount() {
		this.loadTodos();
	}

	addListItems = e => {
		let key = e.which || e.keyCode || 0;
		if (key !== 13) return;

		if (this.state.input != "") {
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
		}
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
				<div className="header m-auto d-flex justify-content-center">
					<h1>Todos</h1>
					<button
						type="button"
						className="btn btn-warning ml-5"
						onClick={() => this.setState({ contacts: [] })}>
						clear all
					</button>
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
