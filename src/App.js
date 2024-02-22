import React from "react";
import Map from "./map.js";

const dataSrc1 = [
  {
    lat: -29.581014761666665,
    lng: 135.38874104333334,
    direction: 100,
  },
  {
    lat: -29.588505828333332,
    lng: 135.38634165833332,
    direction: 100,
  },
];
const dataSrc2 = [
  {
    lat: -29.579661821666665,
    lng: 135.39034261666666,
    direction: 100,
  },
  {
    lat: -29.590121685,
    lng: 135.38252924333332,
    direction: 100,
  },
];

const dataSrc = [dataSrc1, dataSrc2];

export default function App() {
  return <Map dataSrc={dataSrc} />;
}
