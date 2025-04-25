import React, { useEffect } from 'react';
import emailjs from 'emailjs-com';

const Contact = () => {
  useEffect(() => {
    emailjs.init("cHILYjU9wzfOyA9Vi"); // Replace with your EmailJS User ID

    const form = document.getElementById('contactForm');
    if (form) {
      form.addEventListener('submit', function (event) {
        event.preventDefault();

        emailjs.sendForm('service_kouc3a8', 'template_3y9qedy', form)
          .then(() => {
            alert('Email sent successfully!');
            form.reset();
          })
          .catch((error) => {
            console.error('Failed to send email:', error);
            alert('Failed to send email.');
          });
      });
    }

    const preventShortcuts = (event) => {
      if (
        event.keyCode === 123 ||
        (event.ctrlKey && event.shiftKey && event.keyCode === 73) ||
        (event.ctrlKey && event.keyCode === 85)
      ) {
        alert("This function is not allowed here");
        event.preventDefault();
        return false;
      }
    };

    const preventRightClick = (e) => {
      alert("This function is not allowed here");
      e.preventDefault();
    };

    document.addEventListener('keydown', preventShortcuts);
    document.addEventListener('contextmenu', preventRightClick);

    return () => {
      document.removeEventListener('keydown', preventShortcuts);
      document.removeEventListener('contextmenu', preventRightClick);
    };
  }, []);

  return (
    <section
      id="contact"
      style={{
        fontFamily: 'Arial, sans-serif',
        margin: 0,
        padding: 0,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        minHeight: '100vh',
        backgroundColor: '#f0f0f0',
      }}
    >
      <div
        style={{
          textAlign: 'center',
          width: '90%',
          maxWidth: '600px',
          backgroundColor: '#fff',
          padding: '20px',
          borderRadius: '8px',
          boxShadow: '0 0 10px rgba(0,0,0,0.1)',
          margin: '20px',
        }}
      >
        <h2 style={{ color: '#333', marginBottom: '20px' }}>Contact Us</h2>

        <div className="contact-form">
          <form id="contactForm">
            <label htmlFor="name" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>
              Name:
            </label>
            <input type="text" name="name" required placeholder="Your Name" style={inputStyle} />

            <label htmlFor="email" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>
              Email:
            </label>
            <input type="email" name="email" required placeholder="Your Email" style={inputStyle} />

            <label htmlFor="message" style={{ fontWeight: 'bold', textAlign: 'left', display: 'block' }}>
              Message:
            </label>
            <textarea name="message" rows="5" required placeholder="Your Message" style={inputStyle}></textarea>

            <button type="submit" style={buttonStyle}>Submit</button>
          </form>
        </div>

        <div className="contact-details" style={{ marginTop: '20px' }}>
          <h3>Our Contact Information</h3>
          <p>Email: calorietrack93@gmail.com</p>
          <p>Phone: +91 6304334401</p>
          <p>Address: CVR COLLEGE OF ENGINEERING, Hyderabad, Telangana, India</p>
        </div>
      </div>
    </section>
  );
};

const inputStyle = {
  width: '100%',
  padding: '8px',
  marginBottom: '15px',
  border: '1px solid #ccc',
  borderRadius: '4px',
  boxSizing: 'border-box',
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#28a745',
  color: 'white',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
};

export default Contact;
