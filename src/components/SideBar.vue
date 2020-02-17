<template>
  <div
    id="sidebar-container"
    class="showSideBar"
  >
    <div class="sidebar-content">
      <div id="sign-in-container" v-show="!signedIn">
        <p>Sign in with your Gmail account to save your progress! This app will only use your email as an identifier.</p>
        <div ref="signinBtn" class="g-signin2">Sign In</div>
      </div>
      <div v-if="signedIn" class="action-button-container">
        <div class="signOut" @click="handleShowFoundClicked">Show / hide found</div>
        <div @click="googleSignOut" class="signOut">Sign out</div>
      </div>

      <ul v-if="signedIn">
        <li
          v-for="category in getCategories"
          :key="category.id"
          v-bind:class="{ isHidden: isHiddenCategory(category.id), isShown: !isHiddenCategory(category.id) }"
          @click="handleShowHideCategory(category.id)"
        >
          <span class="icon" v-bind:class="getIcon(category)">
            <span class="path1"></span>
            <span class="path2"></span>
            <span class="path3"></span>
          </span>
          {{category.title}} - {{category.locations.length}}
        </li>
      </ul>
    </div>
  </div>
</template>


<script>
/* global gapi */
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      signedIn: false
    };
  },
  mounted() {
    this.$store.dispatch("resetToken");
    setTimeout(() => {
      window.gapi.load('auth2', () => {
        const auth2 = window.gapi.auth2.init({
          client_id: '163299065565-jklgpno00m9bmq8mgibqh7tic9rjkp03.apps.googleusercontent.com',
          cookiepolicy: 'single_host_origin'
        })
        auth2.isSignedIn.listen(this.onIsSignedInUpdated);
        auth2.currentUser.listen(this.onGoogleUserUpdated);
        auth2.attachClickHandler(this.$refs.signinBtn, {}, googleUser => {
          this.onSignIn(googleUser)
        }, error => console.log(error))
    })
    }, 1000);
  },
  computed: {
    ...mapGetters(["getCategories", "getLocations", "getUserLocations", "getHiddenCategories"])
  },
  methods: {
    handleShowFoundClicked() {
      this.$store.dispatch("toggleShowFound");
    },
    handleShowHideCategory(categoryId) {
      this.$store.dispatch("toggleShowHideCategory", categoryId);
    },
    isHiddenCategory(categoryId) {
      if (this.getHiddenCategories.indexOf(categoryId) !== -1) {
        return true;
      } else {
        return false;
      }
    },
    getIcon(category) {
      return `icon-${category.icon}`;
    },
    getSortedCategories() {
      const sortedUsers = _.orderBy(this.getCategories, [], ['asc']);
      return sortedUsers
    },
    onSignIn(googleUser) {
      var profile = googleUser.getBasicProfile();
      this.signedIn = profile.getEmail() !== null;
      this.$store.dispatch("verifyToken", googleUser.getAuthResponse().id_token);
    },
    googleSignOut() {
      var auth2 = gapi.auth2.getAuthInstance();
      auth2.signOut().then(function () {
        console.log('User signed out.');
      });
      this.$store.dispatch("resetToken");
      this.signedIn = false;
    },
    onIsSignedInUpdated(isSignedIn) {
      this.signedIn = isSignedIn;
    },
    onGoogleUserUpdated(googleUser) {
      this.$store.dispatch("verifyToken", googleUser.getAuthResponse().id_token);
    },
  }
};
</script>

<style scoped>
#sidebar-container {
  position: absolute;
  width: 400px;
  height: 100%;
  background-color: #dcdcdc;
}
.sidebar-content {
  overflow-y: auto;
  max-height: 100%;
  padding-top: 1rem;
}
.sidebar-content ul li {
  text-align: left;
  list-style: none;
  padding: 12px 0;
  cursor: pointer;
  overflow-y: auto;
  max-height: 100%;
}
.isHidden {
  color: red;
  font-weight: bold;
}
.isShown {
  color: green;
}
#sidebar-menu-button {
    width: 77px;
    height: 27px;
    background-color: white;
    position: absolute;
    left: -77px;
    cursor: pointer;
}
.showSideBar {
  right: 0;
  top: 0;
}
#sign-in-container {
  padding: 1rem;
}
.action-button-container {
  display: flex;
  justify-content: space-around;
}
.g-signin2 {
  display: flex;
  justify-content: center;
}
.signOut {
	box-shadow: 0px 10px 14px -7px #9c9c9c;
	background:white;
	background-color: white;
	display:inline-block;
	cursor:pointer;
	color:black;
	font-family:Courier New;
	font-size:14px;
	padding:12px;
	text-decoration:none;
}
.signOut:active {
	position:relative;
	top:1px;
}
</style>
