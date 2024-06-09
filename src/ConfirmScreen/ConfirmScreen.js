import React from 'react';
import '../styles/Appo.css';  // Correct path

const ConfirmScreen = (props) => {
  const [isSubmitting, setIsSubmitting] = React.useState(false);

  const handleConfirm = async () => {
    if (isSubmitting) return; // Prevent duplicate submissions

    setIsSubmitting(true);

    try {
      const response = await fetch('http://localhost:5000/rsvps', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: props.name, dietaryRequirements: props.dietaryRequirements }),
      });

      if (response.ok) {
        console.log('RSVP submitted successfully');
        props.onConfirm();
      } else {
        console.error('Error confirming RSVP');
      }
    } catch (error) {
      console.error('Error confirming RSVP', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="rsvpp-container">
      <h2 className="rsvpp-h2">Confirm RSVP Details</h2>
      <p className="rsvpp-p">Name: {props.name}</p>
      <p className="rsvpp-p">Event: {props.dietaryRequirements}</p>
      <div className="rsvpp-button-group">
        <button className="rsvpp-button rsvpp-secondarybtn" onClick={props.onEdit}>✕</button>
        <button className="rsvpp-next-btn" onClick={handleConfirm} disabled={isSubmitting}>Confirm</button>
      </div>
    </div>
  );
};

export default ConfirmScreen;
