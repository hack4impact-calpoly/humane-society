import React from 'react';
import Navbar from './navbar';

export default function PasswordReset() {
  return (
    <div>
      <Navbar />
      <main>
        <div id="text">
          <h1 id="forgotPassword">Email has been sent!</h1>
          <div id="enterEmailText">
            Please check your inbox and click the received
            link to reset your password.
            <br />
            <br />
            <br />
            <div id="resendEmail">
              Didn&apos;t receive an email?
              <a href="/"> Resend email.</a>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
