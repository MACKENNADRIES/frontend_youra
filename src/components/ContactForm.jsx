import React, { useState } from 'react';
import "./ContactForm.module.css";

const ContactForm = () => {
  // State to hold form values
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  });

  // State for error and success messages
  const [statusMessage, setStatusMessage] = useState('');

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    // Form validation (basic example)
    if (!formData.name || !formData.email || !formData.message) {
      setStatusMessage('All fields are required.');
      return;
    }

    try {
      // Send form data to the server (adjust the URL to your backend)
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        setStatusMessage('Message sent successfully!');
        setFormData({ name: '', email: '', message: '' }); // Reset form
      } else {
        setStatusMessage('There was an error sending your message.');
      }
    } catch (error) {
      setStatusMessage('An error occurred.');
    }
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <div>
        <h2>Contact Us</h2>
          <label>Name</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Email</label>
          <input
            type="email"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
        </div>
        <div>
          <label>Message</label>
          <textarea
            name="message"
            value={formData.message}
            onChange={handleInputChange}
          />
        </div>
        <button type="submit" className='contactButton'>Send Message</button>
      </form>
      {statusMessage && <p>{statusMessage}</p>}
    </div>
  );
};

export default ContactForm;