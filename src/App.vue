<template>
  <div id="app">
    <Map/>
    <Details/>
    <SideBar />
  </div>
</template>

<script>
import Map from "./components/Map.vue";
import Details from "./components/Details.vue";
import SideBar from "./components/SideBar.vue";

export default {
  name: "app",
  components: {
    Map,
    Details,
    SideBar,
  }
};
</script>


<style>
html {
  height: 100vh;
}
body {
  height: 100%;
  margin: 0;
}
#app {
  display: grid;
  grid-template-rows: 8fr 2fr;
  font-family: "Avenir", Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
  height: 100%;
  text-align: center;
}
@font-face {
  font-family: icomoon;
  src: url("assets/fonts/icomoon.ttf") format("truetype");
  font-weight: 400;
  font-style: normal;
}
[class*=" icon-"],
[class^="icon-"] {
  font-family: icomoon !important;
  speak: none;
  font-style: normal;
  font-weight: 400;
  font-variant: normal;
  text-transform: none;
  line-height: 1;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}
.icon-cigarette_card:before {
  content: "\E929";
}
.icon-doctor:before {
  content: "\E900";
}
.icon-camera:before {
  content: "\E914";
}
.icon-stagecoach:before {
  content: "\E915";
}
.icon-tailor:before {
  content: "\E916";
}
.icon-store:before {
  content: "\E90D";
}
.icon-house:before {
  content: "\E90E";
}
.icon-bank:before {
  content: "\E90F";
}
.icon-landmark:before {
  content: "\E910";
}
.icon-train:before {
  content: "\E911";
}
.icon-night:before {
  content: "\E903";
}
.icon-dice:before {
  content: "\E902";
}
.icon-poker:before {
  content: "\1F334";
}
.icon-spades:before {
  content: "\E917";
}
.icon-camp:before {
  content: "\E919";
}
.icon-item_request:before {
  content: "\E930";
}
.icon-newspaper:before {
  content: "\E91A";
}
.icon-barber:before {
  content: "\E91B";
}
.icon-trapper:before {
  content: "\E91C";
}
.icon-hotel:before {
  content: "\E91D";
}
.icon-fence:before {
  content: "\E926";
}
.icon-legendary_fish:before {
  content: "\E922";
}
.icon-point_of_interest:before {
  content: "\E923";
}
.icon-hunting:before {
  content: "\E92F";
}
.icon-plant:before {
  content: "\E92B";
}
.icon-misc:before {
  content: "\E928";
}
.icon-recipe:before {
  content: "\E92A";
}
.icon-easter_egg:before {
  content: "\E927";
}
.icon-rock_carving:before {
  content: "\E924";
}
.icon-weapon:before {
  content: "\E925";
}
.icon-legendary_animal:before {
  content: "\E901";
}
.icon-grave:before {
  content: "\E91F";
}
.icon-bone:before {
  content: "\E920";
}
.icon-dreamcatcher:before {
  content: "\E921";
}
.icon-baitshop:before {
  content: "\E918";
}
.icon-butcher:before {
  content: "\E905";
}
.icon-dominoes:before {
  content: "\E906";
}
.icon-postoffice:before {
  content: "\E907";
}
.icon-fivefingerfillet:before {
  content: "\E908";
}
.icon-coins:before,
.icon-money:before {
  content: "\E909";
}
.icon-bill:before,
.icon-dollar:before,
.icon-money1:before,
.icon-stack:before {
  content: "\E90A";
}
.icon-robbery:before {
  content: "\E90B";
}
.icon-homestead:before {
  content: "\E90C";
}
.icon-show:before {
  content: "\E912";
}
.icon-sheriff:before {
  content: "\E904";
}
.icon-blackjack:before {
  content: "P";
}
.icon-saloon:before {
  content: "H";
}
.icon-sheriff2:before {
  content: "\C2";
}
.icon-gun:before {
  content: "\DC";
}
.icon-gun2:before {
  content: "\DF";
}
.icon-stable:before {
  content: "\E4";
}
.icon-treasure:before {
  content: "\E91E";
}
.icon-bounty:before {
  content: "\F6";
}
.icon-taxi:before {
  content: "@";
}
.icon-horse:before {
  content: "?";
}
.icon-hat:before {
  content: "\C4";
}
.icon-event:before {
  content: "\E92C";
}
.icon-gang_hideout:before {
  content: "\E92D";
}
.icon-stranger:before {
  content: "\E913";
}
.icon-exotic:before {
  content: "\E92E";
}
@font-face {
  font-family: Marston;
  src: url("assets/fonts/Marston.otf");
  font-weight: 400;
  font-style: normal;
}
@font-face {
  font-family: Redemption;
  src: url("assets/fonts/redemption.woff");
  font-weight: 400;
  font-style: normal;
}
::-webkit-input-placeholder {
  color: hsla(0, 0%, 8%, 0.5) !important;
  opacity: 1;
}
:-ms-input-placeholder,
::-ms-input-placeholder {
  opacity: 1;
}
::placeholder {
  color: hsla(0, 0%, 8%, 0.5) !important;
  opacity: 1;
}
:-ms-input-placeholder,
::-ms-input-placeholder {
  color: hsla(0, 0%, 8%, 0.5) !important;
}
body {
  color: #141414;
}
.panel hr {
  border-top: 1px solid #141414;
}
.sidebar-close .left-arrow,
.sidebar-close .right-arrow {
  background: #d8c8a4
    url("data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAA4AAAAUCAYAAAC9BQwsAAAAwklEQVQYlZ3OPQrCQBAF4ETwp1NShJ3NKEPMDUTwDmIhXkEE8QIiaC/aiYW39W2IEIwmO3mwzcz7mA0CfUIt6BDRxlo79hYiMgA4JEny8obMHKF8ccgbxnE8RfH+QV4QpQVKzzJqgiERrb9BLcyyrI/l/h/6CZk5wuJchyrQGCMY3JpQBaZpOsTgqIZFuhhu28A8WC6JSA9dAGcoPNTQBYUJ3lUNXURkhOsnNSzSY+ZdG+gSAqxwXQ3zGGPm+L5Rw3Lere9h2lhzZZEAAAAASUVORK5CYII=")
    7px/7px 10px no-repeat;
}
#left-sidebar {
  margin: 0;
}
#left-sidebar .subtitle {
  font-family: Redemption, sans-serif;
  -webkit-font-smoothing: antialiased;
}
#user-panel .info {
  font-family: Marston, sans-serif;
  font-weight: 400;
  font-size: 24px;
}
.btn-upgrade {
  font-size: 20px;
}
.auth-card .card-header,
.btn-upgrade,
.upgrade-title {
  font-family: Marston, sans-serif;
}
.upgrade-table {
  text-align: center;
}
.upgrade-table td,
.upgrade-table th {
  border: none !important;
}
#purchase-button {
  font-family: Redemption, sans-serif;
  font-size: 28px;
}
.upgrade-price {
  font-family: Marston, sans-serif;
  font-size: 24px;
  letter-spacing: 2px;
}
</style>
