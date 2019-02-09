import React, { Component } from 'react';
import ProfileManager from "../../../modules/ProfileManager";
import NotesForm from "./NotesForm"
import EditNote from './EditNote';

export default class Notes extends Component {
    state = {
        notes: [],
        newNoteVisible: false,
        editClicked: false,
        divToEdit: ""
    }

    // checks to see whether the add new note button has been clicked, and removes other elements if so
    toggleVisibility = () => {
        this.setState({ visible: !this.state.newNoteVisible });
    }

    // checks to see if the edit button has been clicked and hides existing note and sets state to indicate which note will be edited
    toggleEdit = (evt) => {

        evt.preventDefault();
        this.setState({
            editClicked: !this.state.editClicked,
            divToEdit: evt.target.id
        });

    }

    // this function toggles the buttons, and what displays in the notes section when the add note or edit note buttons are clicked
    addNoteForm = () => {
        // if the add button has been clicked, the notes form displays so that the user can add a new note
        if(this.state.visible) {
           return (
                <NotesForm addNewNote={this.addNewNote} toggleVisibility={this.toggleVisibility} politicianId={this.props.politicianId} />
           )
        } else {
            // if the add button has not been clicked the user is presented with the existing note contents
           return (this.state.notes.map(note => {
                            // if the edit button has been clicked, the existing information in that edit field is replaced with an input field
                            if(this.state.editClicked && Number(note.id) === Number(this.state.divToEdit)){
                                return (
                                    <div key={note.id}>
                                        <EditNote toggleEdit={this.toggleEdit} noteId={note.id} savedPoliticianId={this.props.politicianId} noteEditor={this.editNote} noteContent={note.content} removeNote={this.deleteNote}/>
                                    </div>
                                )
                            } else {
                                return (
                                        <div key={note.id}>
                                            <p>
                                                {note.content}
                                                <button id={note.id} onClick={this.toggleEdit}>Edit</button>
                                            </p>
                                        </div>
                                    )
                            }}))
        }
    };

    addNewNote = (noteObject) => {
        ProfileManager.addNewNote(noteObject)
          .then( () => {
                ProfileManager.getAllSavedPoliticianNotes(this.props.politicianId)
                    .then(allNotes => {
                        this.setState({
                            notes: allNotes.notes
                        })
                this.toggleVisibility();
            })
        })
      }

      editNote = (noteObject) => {
        ProfileManager.editNote(noteObject)
            .then( () => {
                ProfileManager.getAllSavedPoliticianNotes(this.props.politicianId)
                    .then(allNotes => {
                        this.setState({
                            notes: allNotes.notes
                        })
                    })
            })
      }

      deleteNote = (id) => {
          ProfileManager.deleteNote(id)
          .then( () => {
            ProfileManager.getAllSavedPoliticianNotes(this.props.politicianId)
                .then(allNotes => {
                    this.setState({
                        notes: allNotes.notes
                    })
                })
        })
      }

    componentDidMount(){
        ProfileManager.getAllSavedPoliticianNotes(this.props.politicianId)
                .then(allNotes => {
                    this.setState({
                    notes: allNotes.notes
                    })
            })
    }

    render() {
        return (
            // this feature maps through all of the politician's notes to print them to the DOM
            <React.Fragment>
                {this.addNoteForm()}
                <button onClick={this.toggleVisibility}>Add Note</button>
            </React.Fragment>

        )}
}