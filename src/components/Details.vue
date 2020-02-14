<template>
  <div id="details-container">
    <div class="popup">
      <div class="popup-content">
        <div class="popup-header">
          <span class="popup-title">{{getLocation.title}}</span>
          <span class="popup-found-amount">{{getFoundAmount()}}</span>
        </div>
        <div class="popup-category">{{getCategory()}}</div>
        <div class="popup-subtitle">{{getLocation.description}}</div>
        <span
          class="popup-found"
          @click="handleCollectibleClicked(getLocation.id)"
        >{{getFoundText()}}</span>
      </div>
    </div>
  </div>
</template>


<script>
import { mapGetters } from "vuex";
import _ from "lodash";

export default {
  data() {
    return {};
  },
  computed: {
    ...mapGetters(["getLocation", "getUserLocations", "getCategories", "getLocations"])
  },
  methods: {
    handleCollectibleClicked() {
      this.$store.dispatch("toggleLocation", this.getLocation.id);
    },
    getFoundText() {
      const userLocation = _.find(this.getUserLocations, (userLocation) => userLocation.id === this.getLocation.id)

      return userLocation != null && userLocation.found === true
        ? "Not found"
        : "Found";
    },
    getCategory() {
      if (this.getLocation == null) {
        return "";
      }

      const category = _.find(
        this.getCategories,
        category => category.id == this.getLocation.category_id
      );

      if (category == null) {
        return "";
      }

      return category.title;
    },
    getFoundAmount() {
      const checkedArray = _.map(
        this.getUserLocations,
        location => location.found === true
      );
      const founds = _.filter(checkedArray, value => value == true);
      return founds.length + " locations found";
    }
  }
};
</script>

<style scoped>
#details-container {
  height: 100%;
  max-height: 20vh;
  overflow-y: auto;
}
.popup {
  height: 100%;
  border: 1px solid black;
  background: wheat;
  text-align: left;
}
.popup-found-amount {
  margin-left: 30px;
}
.popup-content {
  padding: 12px;
}
.popup-found {
  color: green;
  cursor: pointer;
}
.popup-title {
  font-size: 22px;
  font-weight: bold;
}
.popup-category {
  font-style: italic;
}
</style>
