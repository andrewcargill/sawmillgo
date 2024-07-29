// src/utils/mapLoader.js
import { Loader } from '@googlemaps/js-api-loader';

// const apiKey = "AIzaSyBTF9lCKZ8YoQS9GngDlBuGkrwmL9glt5U";
const apiKey = "AIzaSyC5C4z0hkHFUAMKajdCNs7uGb2vyps3fM0";
const loader = new Loader({
  apiKey: apiKey,
  version: "weekly",
  libraries: ["marker", "maps", "drawing", "places"],
});

export default loader;
