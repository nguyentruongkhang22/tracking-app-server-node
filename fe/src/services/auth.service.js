import Vue from "vue";

import ax from "./axios.service";

export class AuthService {
  static async register() {
    this.loading = true;
    const response = await ax.post("/v1/auth/register", {
      username: this.register.username,
      password: this.register.password,
    });

    if (response.data) {
      this.loading = false;
      window.localStorage.setItem(
        "login-token",
        response.data.result.loginToken
      );

      this.$router.push("/dashboard");
    }

    this.loading = false;
  }

  static async login() {
    this.loading = true;

    const response = await ax.post("/v1/auth/login", {
      username: this.login.username,
      password: this.login.password,
    });

    if (response.data) {
      this.loading = false;
      window.localStorage.setItem(
        "login-token",
        response.data.result.loginToken
      );

      this.$router.push("/dashboard");
    }

    this.loading = false;
  }

  static guard(to, from, next) {
    // check for valid auth token
    const loginToken = window.localStorage.getItem("login-token");
    ax.post("/v1/auth/verify-token", {
      token: loginToken,
    })
      .then(() => {
        next();
      })
      .catch(() => {
        next({ path: "/login" });
      });
  }
}

export default AuthService;
