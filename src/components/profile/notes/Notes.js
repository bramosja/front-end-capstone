import React, { Component } from 'react';

export default class Notes extends Component {

    render() {
        return (
            this.props.allNotes.map(note =>
                    <h5>{note.content}</h5>
                )
        )}
}