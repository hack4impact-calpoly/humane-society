import React from 'react';
import Navbar from './navbar';

export default function ResetPassword() {
  return (
    <div>
      <Navbar />
      <main>
        <div id="text">
          <h1 id="resetYourPassword">Reset your password</h1>
          <div>
            <input type="text" name="name" placeholder="Enter your new password" id="enterYourPassword" />
            <input type="text" name="name" placeholder="Re-enter your new password" id="enterYourPassword" />
            <input type="submit" value="Send" id="send" />
          </div>
        </div>
      </main>
    </div>
  );
}
