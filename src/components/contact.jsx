import React, { useRef, useState } from "react";
import emailjs from "@emailjs/browser";
import styled from "styled-components"; // Make sure to import styled from 'styled-components'

// ... rest of your code ...

const Contact = () => {
  const form = useRef();

  // Function to generate OTP
  const generateOTP = (limit) => {
    var digits = '0123456789';
    let OTP = '';
    for (let i = 0; i < limit; i++) {
      OTP += digits[Math.floor(Math.random() * 10)];
    }
    return OTP;
  };

  const verifyOTP = (e) => {
    e.preventDefault();

    // Add code to verify the entered OTP
    const enteredOTP = form.current.OTP.value;
    if (enteredOTP === OTP) {
      alert("OTP verified successfully");
    } else {
      alert("OTP verification failed. Please try again.");
    }
  };

  const [OTP, setOTP] = useState('');

  const sendEmail = (e) => {
    e.preventDefault();

    // Generate the OTP
    const generatedOTP = generateOTP(4);
    setOTP(generatedOTP);

    // Debug: log the generated OTP
    console.log("Generated OTP:", generatedOTP);

    // Debug: log the form data
    console.log("Form data:", form.current);

    // Debug: log the user's email from the form
    const to = form.current.to.value;
    console.log("User's Email:", to);
    
    // Send the email using EmailJS
    emailjs
      .sendForm(
        "service_kiblhij",
        "template_31y9yer",
        form.current,
        "EQw2Gjopvug2ihXdj"
      )
      .then(
        (result) => {
          alert("Email sent successfully..!")
          console.log("Email sent successfully");
          console.log("EmailJS Result:", result);

          // Add code to send the OTP via email using EmailJS
          emailjs
            .send(
              "service_kiblhij",
              "template_31y9yer",
              {
                to: to, // Use the entered email
                OTP: generatedOTP,   // Use the generated OTP
              },
              "EQw2Gjopvug2ihXdj"
            )
            .then(
              (otpResult) => {
                console.log("OTP sent successfully");
                console.log("OTP EmailJS Result:", otpResult);
              },
              (otpError) => {
                console.log("OTP sending failed");
                console.error("OTP EmailJS Error:", otpError);
              }
            );
        },
        (error) => {
          alert("Email sending failed..!")
          console.log("Email sending failed");
          console.error("EmailJS Error:", error);
        }
      );
  };


  return (
<StyledContactForm>
  <h2 className="h2">EMAIL OTP VERIFICATION</h2>
<form ref={form}>
  <label>Name</label>
  <input type="text" name="user_name" required />
  <label>Email</label>
  <input type="email" name="to" required />
  <button onClick={sendEmail}>Send</button>
  <label>OTP</label>
  <input type="text" name="OTP" />
  <button onClick={verifyOTP}>Verify</button>
</form>

</StyledContactForm>

  
  );
};

export default Contact;

// Styles
const StyledContactForm = styled.div`
  border: 1px solid;
  margin-top: 40px;
  width: 600px;

  .h2 {
    color: black;
    text-align: center;
    padding-top: 50px;
  }

  form {
    padding-top: 10px;
    display: flex;
    align-items: flex-start;
    flex-direction: column;
    width: 100%;
    font-size: 16px;

    input {
      margin-left: 50px;
      width: 80%;
      height: 35px;
      padding: 7px;
      outline: none;
      border-radius: 5px;
      border: 1px solid rgb(220, 220, 220);

      &:focus {
        border: 2px solid rgba(0, 206, 158, 1);
      }
    }

    label {
      margin-top: 1rem;
      margin-left: 50px;
      font-weight: bold;
    }

    button {
      width: 30%;
      height: 30px;
      margin-left: 200px;
      margin-top: 1rem;
      margin-bottom: 30px;
      cursor: pointer;
      background: rgb(249, 105, 14);
      color: white;
      border: none;
    }
  }
`;
