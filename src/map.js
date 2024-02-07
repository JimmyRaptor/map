import React, {
  useState,
  useMemo,
  useEffect,
  useLayoutEffect,
  useRef,
} from "react";
import ReactMapboxGl, {
  Image,
  GeoJSONLayer,
  MapContext,
} from "react-mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { useMotion } from "./useMotion.js";
import van from "./truck.jpg";
const Mapbox = ReactMapboxGl({
  accessToken:
    "pk.eyJ1IjoicmV0YXdlciIsImEiOiJjazJld3N3NTMwZTNrM2xtbXVsc3ZhbG80In0.pDFq8W8k0g8FBZgZ9nitpg",
});
const center = [121.517831, -30.7985];

const inter = [
  "interpolate",
  ["linear"],
  ["to-number", ["get", "direction"]],
  0,
  0,
  360,
  360,
];
const layout = {
  "icon-image": "vehicle",
  "icon-rotate": inter,
  "icon-size": 0.015,
  "icon-ignore-placement": true,
  "icon-allow-overlap": true,
};
function getFeatures(data) {
  return data.map((i) => ({
    type: "Feature",
    geometry: {
      type: "Point",
      coordinates: [i.lng, i.lat],
    },
    properties: {
      direction: i.direction,
    },
  }));
}

export default function Map({ dataSrc }) {
  const [selected, setSelected] = useState(1);
  const mapRef = useRef();
  const step = 30;
  const geoData = useMemo(
    () => ({
      type: "FeatureCollection",
      features: getFeatures(dataSrc[selected]),
    }),
    [dataSrc, selected]
  );

  const [frame, setMap] = useMotion(geoData, step);
  console.log("frame", frame);
  useLayoutEffect(() => {
    mapRef.current && mapRef.current.getSource("geo123").setData(frame);
  }, [frame, mapRef.current]);
  function handleUpdate() {
    setSelected(selected === 0 ? 1 : 0);
  }
  function onMapLoad(map) {
    mapRef.current = map;
    setMap(map);
    map.on("zoomend", () => {
      console.log("Current Zoom:", map.getZoom());
    });
  }
  const buttonStyle = {
    display: "flex", // 使用flex布局
    justifyContent: "flex-end", // 水平居中
    marginTop: "20px", // 顶部外边距
  };
  return (
    <>
      <button onClick={handleUpdate} style={buttonStyle}>
        Update Data
      </button>
      <Mapbox
        style="mapbox://styles/mapbox/satellite-streets-v12"
        containerStyle={{
          height: "100vh",
          width: "100vw",
        }}
        center={center}
        zoom={[16]}
        onDragEnd={(map, e) => console.log("Bounds:", map.getBounds())}
        onClick={(map, e) => console.log("clicked", e.lngLat)}
        onStyleLoad={(map) => onMapLoad(map)}
      >
        {/* <MapContext.Consumer>
            {(map) => {
              console.log("map", map);
            }}
          </MapContext.Consumer> */}
        <Image
          id={"vehicle"}
          url={van}
          options={{ width: 10, height: 10 }}
          alt=""
        />
        {console.log("frame inside map", frame)}
        <GeoJSONLayer id={"geo123"} data={frame} symbolLayout={layout} />
      </Mapbox>
    </>
  );
}
