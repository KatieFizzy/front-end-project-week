import React, { Component } from 'react';
import axios from 'axios';
import NotesContainer from './components/notes-container/NotesContainer';
import SidebarContainer from './components/sidebar/SideBarContainer';
import styled from 'styled-components'
import './App.css';

const ContainerWrap = styled.div `
width: 100%;
height:auto;
display: flex;
flex-direction: row;
`


class App extends Component {
  constructor(props) {
    super(props);
    this.state = {
      notes: [],
      newNote:'',
      newTitle:'',
      note:null,
      editedNote:'',
      editedTitle:'',
      noteId:null,
   
       };
    };
  
  componentDidMount() {
    axios
      .get('https://fe-notes.herokuapp.com/note/get/all')
      .then(response => {
        this.setState(() => ({ notes: response.data }));
      })
      .catch(error => {
        console.error('Server Error', error);
      });
     
  }
  //SAVE NEW NOTE-----------------------------------
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
  //EDIT NOTE---------------------------------------
  fetchNote = id => {
    axios
      .get(`https://fe-notes.herokuapp.com/note/get/${id}`)
      .then(response => {
        console.log(response.data)
        this.setState(() => ({ note: response.data}));
      })
      .catch(error => {
        console.error(error);
      });
  };
  
  editNote = event => {
    event.preventDefault();
    const id = this.state.noteId;
    axios     
    .put(`https://fe-notes.herokuapp.com/note/edit/${id}`,  
    {
      title: this.state.editedTitle,
      textBody: this.state.editedNote,
    })

    .then(response => {
      this.setState(() => ({ notes: response.data }));
   })

    .catch(error => {
      console.error('Server Error', error);
    });
    }

  //DELETE NOTE-------------------------------------
  
  deleteNote = event => {
    const id = this.state.noteId;
    axios
      .delete(`https://fe-notes.herokuapp.com/note/delete/${id}`)
      .then(response => {
        window.location.reload()
      })
      .catch(error => {
        console.error(error);
      });
  };

  render() {
    return (
      <ContainerWrap>
      <SidebarContainer/>
      <NotesContainer 
      notes={this.state.notes} 
      deleteNote={this.deleteNote}
      addNewNote={this.addNewNote}
      newTitle= {this.state.newTitle}
      newNote={this.state.newNote}
      singleNote={this.state.note}
      editedTitle={this.state.editedTitle}
      editedNote={this.state.editedNote}
      handleInputChange={this.handleInputChange}
      fetchNote={this.fetchNote}
      editNote={this.editNote}
      />
      </ContainerWrap>

    );
  }
}

export default App;


  