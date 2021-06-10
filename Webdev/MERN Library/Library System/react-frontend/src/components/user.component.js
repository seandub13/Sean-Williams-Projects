import React, { Component } from "react";
import UserDataService from "../services/user.service";
let passwordMatch = false;

export default class User extends Component {
  constructor(props) {
    super(props);
    this.onChangeUserName = this.onChangeUserName.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.getUser = this.getUser.bind(this);
    this.onChangeConfirmPassword = this.onChangeConfirmPassword.bind(this);
    this.updateUser = this.updateUser.bind(this);
    this.deleteUser = this.deleteUser.bind(this);

    this.state = {
      currentUser: {
        username: "",
        email: "",
        password: "",
        isAdmin: true,
        image: null
      },
      message: ""
    };
  }

  componentDidMount() {
    this.getUser(this.props.match.params.id);
  }

  onChangeUserName(e) {
    const username = e.target.value;

    this.setState(function(prevState) {
      return {
        currentUser: {
          ...prevState.currentUser,
          username: username
        }
      };
    });
  }

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      image: btoa(binaryString)
    })
  }

  onChangeImage = e => {
    //this.setState({ image: event.target.files[0] });
    console.log("file to upload:", e.target.files[0])
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
  
      reader.onload = this._handleReaderLoaded.bind(this)
  
      reader.readAsBinaryString(file)
  
  }
}

  onChangePassword(e) {
    const password = e.target.value;
    
    this.setState(prevState => ({
      currentUser: {
        ...prevState.currentUser,
        password: password
      }
    }));
  }

  onChangeConfirmPassword(e) {
    const password = this.state.currentUser.password
    const passwordConfirm = e.target.value
    if (password !== passwordConfirm) {
      passwordMatch = false;
    } else {
      passwordMatch = true;
    }
  }
  getUser(id) {
    UserDataService.get(id)
      .then(response => {
        this.setState({
          currentUser: response.data
        });
        console.log(response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  updateUser() {
    if (passwordMatch === true) {
    UserDataService.update(
      this.state.currentUser.id,
      this.state.currentUser
    )
      .then(response => {
        console.log(response.data);
        this.setState({
          message: "The User was updated successfully!"
        });
      })
      .catch(e => {
        console.log(e);
      });
  } else {
    alert("Passwords do not match")
  }
}

  deleteUser() {    
    UserDataService.delete(this.state.currentUser.id)
      .then(response => {
        console.log(response.data);
        this.props.history.push('/users')
      })
      .catch(e => {
        console.log(e);
      });
  }

  render() {
    const { currentUser } = this.state;

    return (
      <div>
        {currentUser ? (
          <div className="edit-form">
            <h4>User</h4>
            <form>
              <div className="form-group">
                <label htmlFor="email">Email</label>
                <input
                  type="text"
                  className="form-control"
                  id="email"
                  value={currentUser.email}
                  readOnly
                />
              </div>
              <div className="form-group">
                <label htmlFor="username">Username</label>
                <input
                  type="text"
                  className="form-control"
                  id="username"
                  value={currentUser.username}
                  onChange={this.onChangeUserName}
                />
              </div>
              <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={currentUser.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>
            <div className="form-group">
              <label htmlFor="passwordConfirm">Confirm Password</label>
              <input
                type="password"
                className="form-control"
                id="passwordConfirm"
                required
                value={this.state.passwordConfirm}
                onChange={this.onChangeConfirmPassword}
                name="passwordConfirm"
              />
            </div>

            <div className="form-group">
              <div><label htmlFor="Book Cover">Book Cover</label></div>
                <input type="file" onChange={this.onChangeImage}  name="image" id="file" accept=".jpeg , jpg"  /> 
              </div>
            </form>

            <button
              className="badge badge-danger mr-2"
              onClick={this.deleteUser}
            >
              Delete
            </button>

            <button
              type="submit"
              className="badge badge-success"
              onClick={this.updateUser}
            >
              Update
            </button>
            <p>{this.state.message}</p>
          </div>
        ) : (
          <div>
            <br />
            <p>Please click on a User...</p>
          </div>
        )}
      </div>
    );
  }
}