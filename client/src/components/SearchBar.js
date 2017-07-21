import React, { Component } from 'react';

class SearchBar extends Component {
  constructor (props) {
    super(props);
    this.handleKeyPress = this.handleKeyPress.bind(this);
    this.handleChange = this.handleChange.bind(this);
  }
  
  handleKeyPress (e) {
    const { handleSearch } = this.props;
    if (e.key === 'Enter') {
      handleSearch(this.state.value);
    }
  }

  handleChange (e) {
    this.setState({value: e.target.value});
  }

  render () {
    return (
      <div className="grid grid-center">
        <div className="col col-6">
          <input className="searchbar" type="text" placeholder="Search..." onChange={this.handleChange} onKeyPress={this.handleKeyPress}></input>
        </div>
      </div>
    );
  }
} 

export default SearchBar;