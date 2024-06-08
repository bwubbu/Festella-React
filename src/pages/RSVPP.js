import React, { Component } from 'react';
import logo from '../assets/friedhead.png';
import InviteForm from '../InviteForm/InviteForm';
import ConfirmScreen from '../ConfirmScreen/ConfirmScreen';
import '../styles/Appo.css';

// BASE APP COMPONENT

class App extends Component {
  state = {
    showConfirmScreen: false,
    toggleRsvps: false,
    toggleIcon: "⊕",
    rsvps: [],
    errorMessage: ''
  }

  // Saves the users entry as a pending invite, validates
  onSubmit(name, dietaryRequirements) {
    console.log(name);
    if (name === undefined || dietaryRequirements === undefined) {
      console.log("error");
      this.setState({ errorMessage: 'Please fill all fields' });
    } else {
      let pendingRsvp = [];
      pendingRsvp.name = name;
      pendingRsvp.dietaryRequirements = dietaryRequirements;
      this.setState({ pendingRsvp: pendingRsvp, showConfirmScreen: true });
    }
  }

  // Pushes the pending invite data into the RSVP's array on confirm
  onConfirm = () => {
    let rsvps = [...this.state.rsvps];
    let newRsvp = {};
    newRsvp.name = this.state.pendingRsvp.name;
    newRsvp.dietaryRequirements = this.state.pendingRsvp.dietaryRequirements;
    rsvps.push(newRsvp);
    this.setState({ rsvps: rsvps, showConfirmScreen: false, errorMessage: '' });
  }

  // Toggles the guest list, and switches the icon between + & -
  toggle = (event) => {
    this.state.toggleRsvps === true ? this.setState({ toggleRsvps: false, toggleIcon: "⊕" }) : this.setState({ toggleRsvps: true, toggleIcon: "⊖" });
  }

  // Navigation
  navigateToSecondPage = () => {
    window.location.href = '../../stripe-test/public/index.html'; // Adjust the path accordingly
  }

  // RENDER
  render() {
    // Conditional rendering to show correct screen
    let view;
    if (this.state.showConfirmScreen === false) {
      view = <InviteForm
        showConfirmScreen={(name, dietaryRequirements) => this.onSubmit(name, dietaryRequirements)}
        errorMessage={this.state.errorMessage} />
    } else {
      view = <ConfirmScreen
        name={this.state.pendingRsvp.name}
        dietaryRequirements={this.state.pendingRsvp.dietaryRequirements}
        onConfirm={this.onConfirm}
        onEdit={() => this.setState({ showConfirmScreen: false, errorMessage: '' })} />
    }

    let rsvps;
    if (this.state.toggleRsvps === true && this.state.rsvps.length <= 0) {
      rsvps = <div><p>No guests so far</p></div>
    } else if (this.state.toggleRsvps === true) {
      rsvps = <div> {this.state.rsvps.map((r) => { return <li key={r.name}>{r.name}, {r.dietaryRequirements}</li> })} </div>
    } else {
      // else nothing is rendered as section is not toggled
    }

    // RETURN
    return (
      <div className="App">
        <header className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h1>Thank you for using our service</h1>
          <h2>Festella / Event RSVP</h2>
        </header>

        <div className="booking-button">
          <button onClick={this.navigateToSecondPage}>Go to Booking Payment</button>
        </div>

        <div className="guests-section">
          <div>
            <p onClick={this.toggle}> Events List {this.state.toggleIcon}</p>
            <p> {rsvps} </p>
          </div>
        </div>

        <div className="colour-section">
          {view}
        </div>
      </div>
    );
  }
}

export default App;