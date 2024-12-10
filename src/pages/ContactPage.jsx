import React from 'react';
import ContactForm from '../components/ContactForm.jsx';
import Footer from '../components/FooterGame.jsx';  // Import Footer component

const ContactPage = () => {
  return (
    <div>
      <ContactForm />
      <Footer /> {/* Include Footer here */}
    </div>
  );
};

export default ContactPage;