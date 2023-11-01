import "leaflet/dist/leaflet.css";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.webpack.css"; // Re-uses images from ~leaflet package
import "leaflet-defaulticon-compatibility";
import L from "leaflet";

export class MapService {
  static layers = [];
  static map = null;
  getMap() {
    return this.map;
  }

  static async initMap() {
    let defaultCoord = [21.0819, 105.6363]; // coord mặc định, Hà Nội
    let mapConfig = {
      attributionControl: true,
      center: defaultCoord,
      zoom: 20,
    };
    this.map = L.map("map", mapConfig);

    L.tileLayer("http://{s}.tile.osm.org/{z}/{x}/{y}.png", {
      attribution:
        '&copy; <a href="http://osm.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    let marker = L.marker(defaultCoord);
    this.layers.push(marker);
    this.map.addLayer(marker);

    for (let i = 0; i < 10; i++) {
      setInterval(() => {
        defaultCoord[0] += 0.00001;
        this.setMarker(defaultCoord);
      }, 1000);
    }

    return map;
  }

  static setMarker(coords) {
    let newMarker = L.marker(coords);
    this.map.addLayer(newMarker);
    this.map.removeLayer(this.layers.pop());
    this.layers.push(newMarker);
  }
}

export default MapService;
