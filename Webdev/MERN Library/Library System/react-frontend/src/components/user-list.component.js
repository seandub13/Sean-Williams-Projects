import React, { Component } from "react";
import UserDataService from "../services/user.service";
import { Link } from "react-router-dom";
export default class UsersList extends Component {
  constructor(props) {
    super(props);
    this.onChangeSearchEmail = this.onChangeSearchEmail.bind(this);
    this.retrieveUsers = this.retrieveUsers.bind(this);
    this.refreshList = this.refreshList.bind(this);
    this.setActiveUser = this.setActiveUser.bind(this);
    this.removeAllUsers = this.removeAllUsers.bind(this);
    this.searchEmail = this.searchEmail.bind(this);

    this.state = {
      users: [],
      currentUser: null,
      currentIndex: -1,
      searchEmail: ""
    };
  }

  componentDidMount() {
    this.retrieveUsers();
  }

  onChangeSearchEmail(e) {
    const searchEmail = e.target.value;

    this.setState({
      searchEmail: searchEmail
    });
  }

  retrieveUsers() {
    UserDataService.getAll()
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  refreshList() {
    this.retrieveUsers();
    this.setState({
      currentUser: null,
      currentIndex: -1
    });
  }

  setActiveUser(user, index) {
    this.setState({
      currentUser: user,
      currentIndex: index
    });
  }

  removeAllUsers() {
    UserDataService.deleteAll()
      .then(response => {
        console.log(response.data);
        this.refreshList();
      })
      .catch(e => {
        console.log(e);
      });
  }

  searchEmail() {
    this.setState({
      currentUser: null,
      currentIndex: -1
    });

    UserDataService.findByEmail(this.state.searchEmail)
      .then(response => {
        this.setState({
          users: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { searchEmail, users, currentUser, currentIndex } = this.state;

    return (
      <div className="list row">
        <div className="col-md-8">
          <div className="input-group mb-3">
            <input
              type="text"
              className="form-control"
              placeholder="Search by email"
              value={searchEmail}
              onChange={this.onChangeSearchEmail}
            />
            <div className="input-group-append">
              <button
                className="btn btn-outline-secondary"
                type="button"
                onClick={this.searchEmail}
              >
                Search
              </button>
            </div>
          </div>
        </div>
        <div className="col-md-6">
          <h4>Users List</h4>

          <ul className="list-group">
            {users &&
              users.map((user, index) => (
                  <li
                    className={
                      "list-group-item " +
                      (index === currentIndex ? "active" : "")
                    }
                    onClick={() => this.setActiveUser(user, index)}
                    key={index}
                  >
                    {user.username}
                  </li>
              ))}
          </ul>
        </div>
        <div className="col-md-6">
          {currentUser ? (
            <div>
              <h4>User</h4>
              <div>
                <label>
                  <strong>Email:</strong>
                </label>{" "}
                {currentUser.email}
              </div>
              <div>
                <label>
                  <strong>Username:</strong>
                </label>{" "}
                {currentUser.username}
              </div>
    
              <div>
                <img src={"data:image/jpeg;base64,"+currentUser.image} width="40%" height="40%" max-width="500px" max-height="500px"/>
              </div>

              <Link
                to={"/users/" + currentUser.id}
                className="badge badge-warning"
              >
                Edit
              </Link>
            </div>
          ) : (
              <div>
                <br />
                <p>Please click on a User...</p>
              </div>
            )}
        </div>
      </div>
    );
  }
}