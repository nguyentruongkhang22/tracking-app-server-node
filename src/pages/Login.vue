<template>
  <div class="centered-container" @keyup.enter="auth">
    <md-content class="md-elevation-3">
      <div class="title">
        <div class="md-title">Welcome to Vehicle Tracker</div>
        <div class="md-body-1">
          Empowering Your Fleet Management At Vehicle Tracker
        </div>
      </div>
      <div class="form">
        <md-field>
          <label>Username</label>
          <md-input v-model="login.username" autofocus></md-input>
        </md-field>

        <md-field md-has-password>
          <label>Password</label>
          <md-input v-model="login.password" type="password"></md-input>
        </md-field>
      </div>

      <div class="actions md-layout md-alignment-center-space-between">
        <a href="/resetpassword">Reset password</a>
        <a href="#/register">Register</a>
        <md-button class="md-raised md-primary" @click="auth">Login</md-button>
      </div>

      <div class="loading-overlay" v-if="loading">
        <md-progress-spinner
          md-mode="indeterminate"
          :md-stroke="2"
        ></md-progress-spinner>
      </div>
    </md-content>
    <div class="background" />
  </div>
</template>

<script>
import AuthService from "../services/auth.service";

const auth = new AuthService();

export default {
  name: "Login",
  data() {
    return {
      loading: false,
      login: {
        username: "",
        password: "",
      },
    };
  },
  methods: {
    auth: AuthService.login,
  },
};
</script>

<style lang="scss">
.d-none {
  display: none;
}
.centered-container {
  display: flex;
  align-items: center;
  justify-content: center;
  position: relative;
  height: 100vh;
  .title {
    text-align: center;
    margin-bottom: 30px;
    img {
      margin-bottom: 16px;
      max-width: 80px;
    }
  }
  .actions {
    .md-button {
      margin: 0;
    }
  }
  .form {
    margin-bottom: 60px;
  }
  .md-content {
    z-index: 1;
    padding: 40px;
    width: 100%;
    max-width: 400px;
    position: relative;
  }
  .loading-overlay {
    z-index: 10;
    top: 0;
    left: 0;
    right: 0;
    position: absolute;
    width: 100%;
    height: 100%;
    background: rgba(255, 255, 255, 0.9);
    display: flex;
    align-items: center;
    justify-content: center;
  }
}
</style>
