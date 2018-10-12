import auth0 from "auth0-js";
import Auth0Lock from "auth0-lock";
import history from "../history";
import { AUTH0_CLIENT_ID } from "../keys";

export default class Auth {
  auth0 = new auth0.WebAuth({
    domain: "bookclubapp.auth0.com",
    clientID: AUTH0_CLIENT_ID,
    redirectUri: "http://localhost:3000/callback",
    responseType: "token id_token",
    scope: "openid profile"
  });

  // lock = new Auth0Lock("YOUR_CLIENT_ID", "YOUR_AUTH0_DOMAIN");

  constructor() {
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.handleAuthentication = this.handleAuthentication.bind(this);
    this.isAuthenticated = this.isAuthenticated.bind(this);
    this.getProfile = this.getProfile.bind(this);
  }

  userProfile;

  getAccessToken() {
    const accessToken = localStorage.getItem("access_token");
    if (!accessToken) {
      throw new Error("No Access Token found");
    }
    return accessToken;
  }

  getProfile() {
    let accessToken = this.getAccessToken();
    this.auth0.client.userInfo(accessToken, (err, profile) => {
      if (profile) {
        this.userProfile = profile;
        console.log(this.userProfile);
      }
    });
  }

  login() {
    this.auth0.authorize();
    console.log("login");
  }

  handleAuthentication() {
    this.auth0.parseHash((err, authResult) => {
      if (authResult && authResult.accessToken && authResult.idToken) {
        this.setSession(authResult);
        history.replace("/dashboard");
      } else if (err) {
        history.replace("/books");
        console.log(err);
      }
    });
  }

  setSession(authResult) {
    // Set the time that the Access Token will expire at
    let expiresAt = JSON.stringify(
      authResult.expiresIn * 1000 + new Date().getTime()
    );
    localStorage.setItem("access_token", authResult.accessToken);
    localStorage.setItem("id_token", authResult.idToken);
    localStorage.setItem("expires_at", expiresAt);
    // navigate to the home route
    history.replace("/dashboard");
  }

  logout() {
    // Clear Access Token and ID Token from local storage
    localStorage.removeItem("access_token");
    localStorage.removeItem("id_token");
    localStorage.removeItem("expires_at");
    this.userProfile = null;
    // navigate to the home route
    history.replace("/books");
  }

  isAuthenticated() {
    // Check whether the current time is past the
    // Access Token's expiry time
    let expiresAt = JSON.parse(localStorage.getItem("expires_at"));
    return new Date().getTime() < expiresAt;
  }
}
