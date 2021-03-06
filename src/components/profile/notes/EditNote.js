import React, { Component } from 'react';
import { Button, Input } from "semantic-ui-react";

export default class EditNote extends Component {
    // state will hold the input of the new note
    state = {
            id: "",
            content: ""
    };

    handleChange = (evt) => {
        const stateToChange = {};
        stateToChange[evt.target.id] = evt.target.value;
        this.setState(stateToChange);
    };

    // this function takes the input from state and edits the note in the database
    editNoteButton = (evt) => {
        evt.preventDefault();

        this.props.toggleEdit(evt);

        let editNoteObject = {
            id: this.state.id,
            content: this.state.content,
            savedPoliticianId: this.props.savedPoliticianId
        };

        this.props.noteEditor(editNoteObject);
    };

    // this function deletes the note from the database
    removeNote = (evt) => {
        evt.preventDefault();

        this.props.toggleEdit(evt)

        this.props.removeNote(Number(this.props.noteId));
    };

    componentDidMount(){
        this.setState({
            id: this.props.noteId
        });
    };

    render() {
        return (
            <React.Fragment>
                <Input type="text" id="content" defaultValue={this.props.noteContent} onChange={this.handleChange} />
                <Button onClick={this.editNoteButton}>Update</Button>
                <Button onClick={this.removeNote}>Remove</Button>
            </React.Fragment>
        )
    }
}