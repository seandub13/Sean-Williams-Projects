import React, { Component } from "react";
import UserDataService from "../services/user.service";

export default class AddUser extends Component {
  constructor(props) {
    super(props);
    this.onChangeEmail = this.onChangeEmail.bind(this);
    this.onChangeUsername = this.onChangeUsername.bind(this);
    this.onChangePassword = this.onChangePassword.bind(this);
    this.saveUser = this.saveUser.bind(this);
    this.newUser = this.newUser.bind(this);
    this.onchangeImage2 = this.onChangeImage2.bind(this);
    this.onChangeImage = this.onChangeImage.bind(this);

    this.state = {
        id: "",
        username: "",
        email: "",
        password: "",
        image: "",

        admin: false,
        submitted: false
    };
  }

  onChangeEmail(e) {
    this.setState({
      email: e.target.value
    });
  }

  _handleReaderLoaded = (readerEvt) => {
    let binaryString = readerEvt.target.result
    this.setState({
      image: btoa(binaryString)
    })
  }

  onChangeImage = e => {
    console.log("file to upload:", e.target.files[0])
    let file = e.target.files[0]
    if (file) {
      const reader = new FileReader();
      reader.onload = this._handleReaderLoaded.bind(this)
      reader.readAsBinaryString(file)
  }
  }

  onChangeUsername(e) {
    this.setState({
      username: e.target.value
    });
  }

  onChangeImage2(e) {
    this.setState({
      image: e.target.value
    });
  }

  onChangePassword(e) {
    this.setState({
      password: e.target.value
    });
  }
  saveUser() {
    var data = {
      email: this.state.email,
      username: this.state.username,
      password: this.state.password,
      image: this.state.image,
      admin: this.state.admin
    };
    console.log(data)
    UserDataService.create(data)
      .then(response => {
        this.setState({
          id: response.data.id,
          email: response.data.email,
          username: response.data.username,
          password: response.data.password,
          image: response.data.image,
          admin: response.data.admin,

          submitted: true
        });
        console.log("backEndResponse: ",response.data);
      })
      .catch(e => {
        console.log(e);
      });
  }

  newUser() {
    this.setState({
      id: null,
      username: "",
      email: "",
      password: "",
      image: "",

      admin: false,
      submitted: false
    });
  }

  render() {
    return (
      <div className="submit-form">
        {this.state.submitted ? (
          <div>
            <h4>You submitted the user successfully!</h4>
            <button className="btn btn-success" onClick={this.newUser}>
              Add
            </button>
          </div>
        ) : (
          <div>
            <div className="form-group">
              <label htmlFor="username">Username</label>
              <input
                type="text"
                className="form-control"
                id="username"
                required
                value={this.state.username}
                onChange={this.onChangeUsername}
                name="username"
              />
            </div>
            <div className="form-group">
              <label htmlFor="email" >Email</label>
              <input
                type="email"
                className="form-control"
                id="email"
                required
                value={this.state.email}
                onChange={this.onChangeEmail}
                name="email"
              />
            </div>
            <div className="form-group">
              <label htmlFor="password">Password</label>
              <input
                type="password"
                className="form-control"
                id="password"
                required
                value={this.state.password}
                onChange={this.onChangePassword}
                name="password"
              />
            </div>

            <div className="form-group">
              <label htmlFor="image">Profile Picture *Only accepts .jpeg/jpg</label>
              </div>
              <div>
              <input type="file" onChange={this.onChangeImage}  name="image" id="file" accept="image/jpg, image/jpeg"/> 
              </div>
              <div>
              
                <br></br>
            <button onClick={this.saveUser} className="btn btn-success">
              Submit
            </button>
            </div>
          </div>
        )}
      </div>
    );
  }
}