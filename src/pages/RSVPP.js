import React, { Component } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import logo from '../assets/friedhead.png';
import InviteForm from '../InviteForm/InviteForm';
import ConfirmScreen from '../ConfirmScreen/ConfirmScreen';
import '../styles/Appo.css';

class RSVPP extends Component {
  state = {
    showConfirmScreen: false,
    toggleRsvps: false,
    toggleIcon: "⊕",
    rsvps: [],
    filteredEvents: [],
    errorMessage: ''
  }

  componentDidMount() {
    this.fetchEvents();
  }

  fetchEvents = async () => {
    try {
      const response = await axios.get('http://localhost:5000/events'); // Replace with your backend URL
      const events = response.data;
      const filteredEvents = events.filter(event => !event.isFinished && new Date(event.date) >= new Date());
      this.setState({ rsvps: filteredEvents });
    } catch (error) {
      console.error('Error fetching events:', error);
    }
  }

  onSubmit = (name, dietaryRequirements) => {
    if (!name || !dietaryRequirements) {
      this.setState({ errorMessage: 'Please fill all fields' });
    } else {
      const pendingRsvp = { name, dietaryRequirements };
      this.setState({ pendingRsvp, showConfirmScreen: true, errorMessage: '' });
    }
  }

  onConfirm = () => {
    const { rsvps, pendingRsvp } = this.state;
    this.setState({
      rsvps: [...rsvps, pendingRsvp],
      showConfirmScreen: false,
      pendingRsvp: null,
      errorMessage: ''
    });
  }

  toggle = () => {
    this.setState(prevState => ({
      toggleRsvps: !prevState.toggleRsvps,
      toggleIcon: prevState.toggleRsvps ? "⊕" : "⊖"
    }));
  }

  render() {
    const { showConfirmScreen, toggleRsvps, toggleIcon, rsvps, errorMessage, pendingRsvp } = this.state;

    const view = showConfirmScreen ? (
      <ConfirmScreen
        name={pendingRsvp.name}
        dietaryRequirements={pendingRsvp.dietaryRequirements}
        onConfirm={this.onConfirm}
        onEdit={() => this.setState({ showConfirmScreen: false, errorMessage: '' })}
      />
    ) : (
      <InviteForm
        events={rsvps} // Pass the filtered events to InviteForm
        showConfirmScreen={this.onSubmit}
        errorMessage={errorMessage}
      />
    );

    const rsvpsList = toggleRsvps && (
      rsvps.length ? (
        <ul>{rsvps.map((r) => <li key={r._id}>{r.name}, {r.dietaryRequirements}</li>)}</ul>
      ) : (
        <p>No upcoming events</p>
      )
    );

    return (
      <div className="rsvpp-App">
        <header className="rsvpp-App-header">
          <img src={logo} className="rsvpp-App-logo" alt="logo" />
          <h1>Thank you for using our service</h1>
          <h2>Festella / Event RSVP</h2>
        </header>

        <div className="rsvpp-booking-button">
          <button onClick={this.props.navigate}>Go to Booking Payment</button>
        </div>

        <div className="rsvpp-guests-section">
          <div>
            <p onClick={this.toggle}> Events List {toggleIcon}</p>
            {rsvpsList}
          </div>
        </div>

        <div className="rsvpp-colour-section">
          {view}
        </div>
      </div>
    );
  }
}

function withNavigate(Component) {
  return function WrappedComponent(props) {
    const navigate = useNavigate();
    return <Component {...props} navigate={() => navigate('/paymentf')} />;
  };
}

export default withNavigate(RSVPP);
