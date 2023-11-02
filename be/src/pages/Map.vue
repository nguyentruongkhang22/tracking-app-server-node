<template>
  <div id="map"></div>
</template>

<script>
import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import L from "leaflet";
import MapService from "@/services/map.service";
import WsService from "@/services/ws.service";

let markerStack = [];

export default {
  name: "Map",
  mounted() {
    MapService.initMap();
    WsService.init();
  },
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.map {
  height: 100vh;
  width: 100vw;
}
</style>
