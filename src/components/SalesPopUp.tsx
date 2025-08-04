import React, { useEffect, useState } from "react";
import { us_cities, first_names, actions, products } from "../utils/PopupNotifications.js";

export default function SalesPopup() {
  // Function to generate a random notification object
  const generateNotification = () => {
    const [city, state, lat, lng] = us_cities[Math.floor(Math.random() * us_cities.length)];
    const name = first_names[Math.floor(Math.random() * first_names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;

    // OpenStreetMap static map URL using lat/lng (works without API key)
const mapImg = `https://maps.locationiq.com/v3/staticmap?key=pk.03e54e0b1648fefc435ddeaaccdbf1e6&center=${lat},${lng}&zoom=150&size=600x400&format=png&maptype=streets`;

    return { name, location: `${city}, USA`, action, product, time, mapImg };
  };

  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(generateNotification());

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrent(generateNotification()); // Generate a new random notification
      setVisible(true);
      setTimeout(() => setVisible(false), 3000); // Hide after 3s
    }, 15000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      <img
        preload="true"
        src={current.mapImg}
        alt="map"
        className="w-14 h-14 rounded-md object-cover"
      />
      <div className="flex flex-col text-sm">
        <span className="font-medium">
          {current.name} from {current.location}
        </span>
        <span>
          {current.action}{" "}
          <span className="text-blue-600 font-semibold">{current.product}</span>
        </span>
        <span className="text-gray-500 text-xs">{current.time}</span>
      </div>
    </div>
  );
}
