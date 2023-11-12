import { NONE, SELF } from "express-csp-header";

const cspPocicies = {
  directives: {
    "script-src": [
      SELF,
      "https://code.jquery.com/jquery-3.6.0.min.js",
      "https://cdnjs.cloudflare.com/ajax/libs/socket.io/4.0.1/socket.io.js",
    ],
    "style-src": [
      SELF,
      "https://use.fontawesome.com/releases/v5.0.8/css/all.css",
      "https://fonts.googleapis.com/css/*",
      "https://fonts.googleapis.com/icon?family=Material+Icons",
      "http://fonts.googleapis.com/icon?family=Material+Icons",
      "https://cdnjs.cloudflare.com/ajax/libs/twitter-bootstrap/4.6.0/css/bootstrap.min.css",
      "https://use.fontawesome.com/releases/v5.0.8/webfonts/*",
      "https://fonts.googleapis.com/css?family=Roboto:300,400,500,700,400italic",
    ],
    "img-src": [
      "*",
      "data:",
      "https://c.tile.osm.org/*",
      "https://*.tile.osm.org/*",
      "https://*.tile.osm.org/*/*/*.png",
      SELF,
    ],
    "worker-src": [NONE],
  },
};

export default cspPocicies;
