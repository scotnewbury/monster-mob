import React, { Component } from 'react';
import CardList from '../components/CardList';
import SearchBox from '../components/SearchBox';
import Scroll from '../components/Scroll';
import ErrorBoundry from '../components/ErrorBoundry'
import './App.css';

class App extends Component {
  constructor() {
    super();
    this.state = {
      monsters: [],
      searchField: ''
    }
  }

  componentDidMount() {
    fetch ('https://jsonplaceholder.typicode.com/users')
      .then(Response => Response.json())
      .then(users => this.setState({monsters: users}));
  }

  onSearchChange = (event) => {
    this.setState({searchField: event.target.value});
  }


  render() {
    const {monsters, searchField} = this.state;
    const filteredMonsters = monsters.filter(monster => {
      return monster.name.toLowerCase().includes(searchField.toLowerCase());
    })

  return !monsters.length ?
    <h1>Loading . . . </h1> :
    (
      <div className = 'tc'>
        <h1 className = 'f1'>Monster Mob</h1>
        <SearchBox searchChange = {this.onSearchChange}/>
        <Scroll>
          <ErrorBoundry>
            <CardList monsters = {filteredMonsters} />
          </ErrorBoundry>
        </Scroll>
      </div>
     ); 
  }
}

export default App;
