import React from 'react';
import Navbar from './navbar';

export default function ForgotPassword() {
  return (
    <div>
      <Navbar />
      <main>
        <div id="text">
          <h1 id="forgotPassword">Forgot your password?</h1>
          <div id="enterEmailText">
            Please enter your email address and we&apos;ll
            send you a link to reset your password shortly.
          </div>
          <div>
            <input type="text" name="name" placeholder="Enter your email" id="enterYourEmail" />
            <input type="submit" value="Send" id="send" />
          </div>
          <div>
            <br />
            <a id="toLogin" href="/">Return to login.</a>
          </div>
        </div>
      </main>
    </div>
  );
}
