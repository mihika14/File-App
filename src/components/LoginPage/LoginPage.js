import React from "react";
import './LoginPage.css'

function LoginPage() {
  return (
    <div className="forms">
      <div class="form-container">
        <p class="title">Welcome back</p>
        <form class="form">
          <input type="email" class="input" placeholder="Email" />
          <input type="password" class="input" placeholder="Password" />
          <p class="page-link">
            <span class="page-link-label">Forgot Password?</span>
          </p>
          <button class="form-btn">Log in</button>
        </form>
        <p class="sign-up-label">
          Don't have an account?<span class="sign-up-link">Sign up</span>
        </p>
      </div>
    </div>
  );
}

export default LoginPage;
