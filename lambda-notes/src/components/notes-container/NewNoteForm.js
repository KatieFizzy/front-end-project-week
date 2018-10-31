import React, { Component } from 'react';
import axios from 'axios';

class SmurfForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      newNote:'',
      newTitle:'',
    };
  }

  addNewNote = event => {
    event.preventDefault();
    axios     
    .post('https://fe-notes.herokuapp.com/note/create',  
    {
      title: this.state.newNote,
      textBody: this.state.newTitle,
    })

    .then(response => {
      console.log(response);
      console.log(response.data);
      this.setState(() => ({ 
        newNote:'',
        newTitle:'',
        }));
      })

    .catch(error => {
      console.error('Server Error', error);
    });
    }

  handleInputChange = e => {
    this.setState({ [e.target.name]: e.target.value });
  };

  render() {
    return (
      <div className="NewForm">
        <form onSubmit={this.addNewNote}>
          <input
            onChange={this.handleInputChange}
            placeholder="Title"
            value={this.state.newTitle}
            name="Title"
          />
          <input
            onChange={this.handleInputChange}
            placeholder="Note"
            value={this.state.newNote}
            name="Note"
          />
          <button type="submit">Add New Note</button>
        </form>
      </div>
    );
  }
}

export default NewNoteForm;
