import React from 'react';
import { Route } from 'react-router-dom';
import AllNotes from './AllNotes.js';
import SingleNote from './SingleNote.js';
import EditNoteForm from './EditNoteForm.js';

const NotesContainer= props => {
   
    return (
    <div>
 
     <Route exact path='/' component={AllNotes}/>
     <Route exact path='/notes/:id' component={SingleNote} 
     editedNoteBodyHandler={props.editedNoteBodyHandler}
     editedNoteHandler={props.editedNoteBodyHandler}/>
     <Route exact path='/EditNoteForm' component={EditNoteForm}/>   
    </div>
    )
}
export default NotesContainer;
// 