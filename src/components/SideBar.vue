<template>
  <div
    id="sidebar-container"
    v-bind:class="{ showSideBar: showSideBar, hideSideBar: !showSideBar }"
  >
    <div id="sidebar-menu-button" @click="toggleSideBar()"></div>
    <div class="sidebar-content">
      <ul>
        <li @click="handleShowFoundClicked">Show / hide found</li>
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
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {
      showSideBar: true
    };
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
    toggleSideBar() {
      this.showSideBar = !this.showSideBar;
    }
  }
};
</script>

<style scoped>
#sidebar-container {
  position: absolute;
  width: 400px;
  height: 100%;
  background-color: white;
}
.sidebar-content {
  overflow-y: auto;
  max-height: 100%;
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
  width: 55px;
  height: 27px;
  background-color: blue;
  position: absolute;
  left: -55px;
  cursor: pointer;
}
.showSideBar {
  right: 0;
  top: 0;
  transition: 0.5s ease-in-out;
}
.hideSideBar {
  right: -400px;
  top: 0;
  transition: 0.5s ease-in-out;
}
</style>
