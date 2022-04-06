import React from 'react';
import { Grid } from '@mui/material';
import './css/taskbar.css';
import Box from '@mui/material/Box';
import Container from '@mui/material/Container';
import Link from '@mui/material/Link';
import Navbar from './navbar';

export default function PasswordReset() {
  return (
    // <div>
    //   <Navbar />
    //   <main>
    //     <div id="text">
    //       <h1 id="forgotPassword">Email has been sent!</h1>
    //       <div id="enterEmailText">
    //         Please check your inbox and click the received
    //         link to reset your password.
    //         <br />
    //         <br />
    //         <br />
    //         <div id="resendEmail">
    //           Didn&apos;t receive an email?
    //           {/* <TextField id="outlined-basic" label="Outlined" variant="outlined" /> */}
    //           <a href="/"> Resend email.</a>
    //           {/* <TextField id="standard-basic" label="Resend email." variant="standard" /> */}
    //         </div>
    //       </div>
    //     </div>
    //   </main>
    // </div>
    <div>
      <Navbar />
      <div className="forgotPasswordPage">
        <Container component="main" maxWidth="xs">
          <Box
            sx={{
              mt: 12,
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Grid container spacing={4}>
              <Grid item xs={12} id="forgotPassword">
                Email has been sent!
              </Grid>
              <Grid item xs={12} id="enterEmailText">
                Please enter your email address and we&apos;ll
                send you a link to reset your password shortly.
              </Grid>
              <Grid item xs={12} id="resendEmailGrid">
                Didn&apos;t receive an email?
                <Link id="resendEmail" href="/login" variant="body2">
                  Resend email.
                </Link>
              </Grid>
            </Grid>
          </Box>
        </Container>
      </div>
    </div>
  );
}
