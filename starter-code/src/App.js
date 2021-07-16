import linkedinLogo from "./linkedin.png";
import React from 'react';
import users from "./users";
import './App.css';

class App extends React.Component {

  state = {
    searchName: '',
    student: true,
    teacher: true,
    campus: ''

  }


  handleChange = event => {
    const name = event.target.name;
    const value = event.target.type === 'checkbox' ? event.target.checked : event.target.value;
    this.setState({
      [name]: value
    })
  }

  render() {
    const campusList = [...new Set(users.map(user => user.campus))].map(campus => {
      return (
        <option value={campus} key={campus}>{campus}</option>
      )
    });

    const filtered = users.filter(user => {
      //console.log(user);
      return this.state[user.role]
      && (user.firstName.toLowerCase().includes(this.state.searchName.toLowerCase()) || user.lastName.toLowerCase().includes(this.state.searchName.toLowerCase()))
      && (user.campus === this.state.campus || !this.state.campus);
    });
    console.log(filtered)
    const list = filtered.map(user => {
      return (
        <tr>
          <td>{user.firstName}</td>
          <td>{user.lastName}</td>
          <td>{user.campus}</td>
          <td>{user.role}</td>
          {user.linkedin ? <td><a href={user.linkedin}><img src={linkedinLogo} width="15px" alt="linkedIn"/></a></td> : <td></td>}
        </tr>
      )
    });

    return (
      <div className="App">
        <h1>IronBook</h1>
        <div>
          <label htmlFor="searchName">Search by name </label>
          <input
            type="text"
            name="searchName"
            id="searchName"
            value={this.state.searchName}
            onChange={this.handleChange}
          />
          <label htmlFor="student">Student: </label>
          <input
            type="checkbox"
            name="student"
            id="student"
            checked={this.state.student}
            onChange={this.handleChange}
          />
          <label htmlFor="teacher">Teacher: </label>
          <input
            type="checkbox"
            name="teacher"
            id="teacher"
            checked={this.state.teacher}
            onChange={this.handleChange}
          />
          <select name="campus" value={this.state.campus} onChange={this.handleChange}>
            <option value="">All</option>
            {campusList}
          </select>
        </div>
        <table className="userList">
          <thead>
            <tr>
              <th>First Name</th>
              <th>Last Name</th>
              <th>Campus</th>
              <th>Role</th>
              <th>Link</th>
            </tr>
          </thead>
          <tbody>
            {list}
          </tbody>
        </table>
      </div>
    );
  }
}

export default App;
