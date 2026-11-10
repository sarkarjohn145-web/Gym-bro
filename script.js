const SUPABASE_URL = 'https://miwwqoyvbygsrhsyautm.supabase.co';
const SUPABASE_KEY = 'sb_publishable_ZIl-94iLmw6URFJ2on8gZQ_eczljJy2';

// Initialize Supabase
const { createClient } = supabase;
const db = createClient(SUPABASE_URL, SUPABASE_KEY);

// 1. Send OTP
async function sendOTP() {
  const email = document.getElementById('email').value;
  const message = document.getElementById('message');
  
  if (!email) {
    message.innerText = "Please enter an email.";
    return;
  }

  message.innerText = "Sending code...";
  
  const { data, error } = await db.auth.signInWithOtp({
    email: email
  });

  if (error) {
    message.innerText = "Error: " + error.message;
  } else {
    message.innerText = "";
    document.getElementById('email-step').style.display = 'none';
    document.getElementById('otp-step').style.display = 'block';
  }
}

// 2. Verify OTP
async function verifyOTP() {
  const email = document.getElementById('email').value;
  const token = document.getElementById('otp').value;
  const message = document.getElementById('message');

  if (!token) {
    message.innerText = "Please enter the 6-digit code.";
    return;
  }

  const { data, error } = await db.auth.verifyOtp({
    email: email,
    token: token,
    type: 'email'
  });

  if (error) {
    message.innerText = "Invalid code. Try again.";
  } else {
    message.style.color = "#4ade80";
    message.innerText = "Login Successful! Welcome to GymBro.";
    // Next step will be redirecting them to the dashboard!
    setTimeout(() => {
    window.location.href = "dashboard.html";
}, 1500);
  }
}