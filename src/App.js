import React from "react";
import Map from "./map.js";

import data1 from "./dataSrc1.json"
import data2 from "./dataSrc2.json"

const dataSrc1 = data1;
const dataSrc2 = data2;

const dataSrc = [dataSrc1, dataSrc2];

export default function App() {
  return <Map dataSrc={dataSrc} />;
}
