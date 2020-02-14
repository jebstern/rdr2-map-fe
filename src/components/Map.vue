<template>
  <div id="map-container">
    <GmapMap
      ref="mapRef"
      :center="center"
      :zoom="zoom"
      :options="{
        zoomControl: true,
        mapTypeControl: false,
        scaleControl: false,
        streetViewControl: false,
        rotateControl: false,
        fullscreenControl: false,
        disableDefaultUi: false
      }"
      @zoom_changed="zoom = $event"
      style="width: 100%; height: 100%"
    >
      <GmapMarker
        v-for="m in getLocations"
        :visible="showMarker(m)"
        :key="m.id"
        :position="{lat: Number(m.latitude), lng: Number(m.longitude)}"
        :clickable="true"
        :icon="getIcon(m)"
        :opacity="getOpacity(m)"
        :draggable="false"
        @click="onShowPopup(m)"
      ></GmapMarker>
    </GmapMap>
  </div>
</template>


<script>
/* global google */
import { mapGetters } from "vuex";
import { gmapApi } from "vue2-google-maps";
import _ from "lodash";

export default {
  data() {
    return {
      center: { lat: 21, lng: 90 },
      zoom: 3
    };
  },
  mounted() {
    var MAP_BOUNDS = {
      1: 900,
      2: 900,
      3: 900,
      4: 900,
      5: 900,
      6: 900,
      7: 900,
      8: 900,
      9: 900,
      10: 900
    };
    const baseUrl = "https://rdr2map.com";
    const path = "/images/tiles/rdr2-dark";

    this.$nextTick(() => {
      this.$refs.mapRef.$mapPromise.then(map => {
        var layerID = "my_custom_layer";
        var layer = new google.maps.ImageMapType({
          getTileUrl: function(coord, zoom) {
            let normalizedCoord = null;

            var y = coord.y;
            var x = coord.x;

            // tile range in one direction range is dependent on zoom level
            // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
            var tileRange = 1 << zoom;

            // don't repeat across y-axis (vertically)
            if (y < 0 || y >= tileRange) {
              //y = (y % tileRange + tileRange) % tileRange;
              normalizedCoord = null;
            }

            // repeat across x-axis
            if (x < 0 || x >= tileRange) {
              //x = (x % tileRange + tileRange) % tileRange;
              normalizedCoord = null;
            }

            normalizedCoord = {
              x: x,
              y: y
            };

            if (
              !normalizedCoord ||
              normalizedCoord.x > MAP_BOUNDS[zoom] ||
              normalizedCoord.y > MAP_BOUNDS[zoom]
            ) {
              return null;
            }
            return (
              baseUrl +
              path +
              "/" +
              zoom +
              "-" +
              normalizedCoord.x +
              "_" +
              normalizedCoord.y +
              ".jpg"
            );
          },
          tileSize: new google.maps.Size(256, 256),
          maxZoom: 7,
          minZoom: 2,
          radius: 1738000,
          name: "Detailed"
        });
        map.mapTypes.set(layerID, layer);
        map.setMapTypeId(layerID);
      });
    });
  },
  computed: {
    ...mapGetters([
      "getLocations",
      "getUserLocations",
      "getCategories",
      "showFound",
      "getHiddenCategories"
    ]),
    google: gmapApi
  },
  methods: {
    getNormalizedCoord(coord, zoom) {
      var y = coord.y;
      var x = coord.x;

      // tile range in one direction range is dependent on zoom level
      // 0 = 1 tile, 1 = 2 tiles, 2 = 4 tiles, 3 = 8 tiles, etc
      var tileRange = 1 << zoom;

      // don't repeat across y-axis (vertically)
      if (y < 0 || y >= tileRange) {
        //y = (y % tileRange + tileRange) % tileRange;
        //console.log('getNormalizedCoord - return NULL 1');
        //return null;
      }

      // repeat across x-axis
      if (x < 0 || x >= tileRange) {
        //x = (x % tileRange + tileRange) % tileRange;
        //console.log('getNormalizedCoord - return NULL 2');
        //return null;
      }

      return { lat: Number(x), lng: Number(y) };
    },
    onShowPopup(location) {
      const category = _.find(
        this.getCategories,
        category => category.id == location.category_id
      );

      let isFound;

      if (location.found == null) {
        isFound = true; // first time updated -> is found
      } else if (!location.found) {
        isFound = true; // toggle
      } else if (location.found) {
        isFound = false; // toggle
      } else {
        isFound = true; // ...
      }

      const markerData = {
        id: location.id,
        found: isFound,
        title: location.title,
        subtitle: location.description,
        category: category.title
      };
      this.$store.dispatch("setLocation", markerData);
    },
    isHiddenCategory(categoryId) {
      return this.getHiddenCategories.indexOf(categoryId) !== -1;
    },
    showMarker(location) {

      const userLocation = _.find(this.getUserLocations, (userLocation) => userLocation.id === location.id)
      const isFound = userLocation != null && userLocation.found

      if (!this.showFound && isFound) {
        return false;
      } else if (
        this.getHiddenCategories.indexOf(location.category_id) !== -1
      ) {
        return false;
      } else {
        return true;
      }
    },
    getIcon(location) {
      const cat = _.find(
        this.getCategories,
        category => category.id === location.category_id
      );
      return {
        url: require(`@/assets/markers/${cat.icon}.png`),
       
        scaledSize: { width: 22, height: 29, f: "px", b: "px" }
      };
    },
    getOpacity(location) {
      const userLocation = _.find(this.getUserLocations, (userLocation) => userLocation.id === location.id)
      if (userLocation != null && userLocation.found != null) {
        return userLocation.found ? 0.5 : 1.0;
      } else {
        return 1.0
      }
    }
  }
};
</script>

<style scoped>
#map-container {
  height: 100%;
}
.asd_lul {
  background-position: center bottom;
  height: 300px;
  width: 66px;
}
</style>
