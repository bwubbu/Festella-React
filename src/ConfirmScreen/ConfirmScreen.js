import React from 'react';
import '../App.css';  // Correct path

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
    <div className="container">
      <h2>Confirm RSVP Details</h2>
      <p>Name: {props.name}</p>
      <p>Event: {props.dietaryRequirements}</p>
      <button className="secondarybtn" onClick={props.onEdit}>✕</button>
      <button className="next-btn" onClick={handleConfirm} disabled={isSubmitting}>Confirm</button>
    </div>
  );
};

export default ConfirmScreen;