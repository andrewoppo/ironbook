import linkedinLogo from "./linkedin.png";
import React from 'react';
import users from "./users";
import './App.css';

class App extends React.Component {

  state = {
    usersArray: users,
    searchName: '',
    isStudent: false,
    isTeacher: false,
    campus: ''

  }
  handleSubmit = event => {
    const usersCopy = this.state.usersArray
    event.preventDefault();
    this.setState({
      usersArray: usersCopy.filter(user => user.firstName.includes(event.target.name) || user.lastName.includes(event.target.name))
    })
  }
  handleChange = event => {
    const searchName = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [searchName]: value
    })
  }
  render() {
    const list = this.state.usersArray.map(user => {
      // if (user.linkedIn) {

      // }
      return (
        <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          {user.linkedin ? <td><a href={user.linkedin}><img src={linkedinLogo} width="15px"/></a></td> : <td></td>}
        </tr>
      )
    })
    return (
      <div className="App">
        <h1>IronBook</h1>
        <form onSubmit={this.handleSubmit}>
          <label htmlFor="searchName">Search by name </label>
          <input
            type="text"
            name="searchName"
            id="searchName"
            value={this.state.searchName}
            onChange={this.handleChange}
          />
          <label htmlFor="isStudent">Student: </label>
          <input
            type="checkbox"
            name="isStudent"
            id="isStudent"
            checked={this.state.isStudent}
            onChange={this.handleChange}
          />
          <label htmlFor="isTeacher">Teacher: </label>
          <input
            type="checkbox"
            name="isTeacher"
            id="isTeacher"
            checked={this.state.isTeacher}
            onChange={this.handleChange}
          />
          <button type="submit">Filter Results</button>
        </form>
        <table className="userList">
          <tbody>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Link</th>
            </tr>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
