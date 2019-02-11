import React, { Component } from 'react';
import RepresentativeCard from "./RepresentativeCard";

export default class LocalList extends Component {

    displayPoliticianInfo = () => {
        // create an if statement to ensure that the state actually contains the necessary information
        if(this.props.localOffices.length > 0 && this.props.allOfficials.length > 0){
            return (
                <React.Fragment>
                    <h1>Local</h1>
                    {/* map through the offices and the indices indicated by the office to get the office title and the name of the person holding that office */}
                    {this.props.localOffices.map(localOffice =>
                        localOffice.officialIndices.map(officialIndex =>
                            // call upon the representative card component for styling
                            <RepresentativeCard key={officialIndex} office={localOffice} index={officialIndex} official={this.props.allOfficials[officialIndex]} photo={this.props.allOfficials[officialIndex].photoUrl} />
                    ))}
                </React.Fragment>
            )
            } else {
                return (
                    // message in the case that information for the candidates is not available
                    <React.Fragment>
                        <h1>Local</h1>
                        <h3>Unavailable</h3>
                    </React.Fragment>
                )
            }
    }

    render() {
        return this.displayPoliticianInfo()
    }
}