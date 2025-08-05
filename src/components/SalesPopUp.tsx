import React, { useEffect, useState } from "react";
import { us_cities, first_names, actions, products } from "../utils/PopupNotifications.js";
import { Dot, RadioTower } from "lucide-react";

export default function SalesPopup() {
  const generateNotification = () => {
    const [city, state, lat, lng] = us_cities[Math.floor(Math.random() * us_cities.length)];
    const name = first_names[Math.floor(Math.random() * first_names.length)];
    const action = actions[Math.floor(Math.random() * actions.length)];
    const product = products[Math.floor(Math.random() * products.length)];
    const time = `about ${Math.floor(Math.random() * 59) + 1} minutes ago`;
    const mapImg = `https://maps.locationiq.com/v3/staticmap?key=pk.03e54e0b1648fefc435ddeaaccdbf1e6&center=${lat},${lng}&zoom=150&size=600x400&format=png&maptype=streets`;

    return { name, location: `${city}, USA`, action, product, time, mapImg };
  };

  const [visibleSales, setVisibleSales] = useState(false);
  const [visibleOptimizer, setVisibleOptimizer] = useState(false);
  const [visibleVisitors, setVisibleVisitors] = useState(false);
  const [current, setCurrent] = useState(generateNotification());
  const [visitors, setVisitors] = useState(() => 300 + Math.floor(Math.random() * 300));

  useEffect(() => {
    const showSequence = () => {
      // Show Sales Notification
      setCurrent(generateNotification());
      setVisibleSales(true);
      setTimeout(() => {
        setVisibleSales(false);

        // Show Optimizer Notification
        setVisibleOptimizer(true);
        setTimeout(() => {
          setVisibleOptimizer(false);

          // Show Visitor Count
          setVisitors(100 + Math.floor(Math.random() * 151));

          setVisibleVisitors(true);
          setTimeout(() => {
            setVisibleVisitors(false);
          }, 3000);
        }, 3000);
      }, 3000);
    };

    // Run first sequence immediately
    showSequence();

    // Then every 24 seconds
    const interval = setInterval(showSequence, 24000);
    return () => clearInterval(interval);
  }, []);

  return (
    <>
      {/* Sales Popup */}
      <div
        className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
          visibleSales ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9999 }}
      >
        <img src={current.mapImg} alt="map" className="w-14 h-14 rounded-md object-cover" />
        <div className="flex flex-col text-sm">
          <span className="font-medium">
            {current.name} from {current.location}
          </span>
          <span>
            {current.action}{" "}
            <span className="text-gray-500 font-semibold">{current.product}</span>
          </span>
          <span className="text-gray-500 text-xs">{current.time}</span>
        </div>
      </div>

      {/* Optimizer Popup */}
      <div
        className={`fixed bottom-6 left-6 bg-white text-neutral-600 px-5 py-3 rounded-lg shadow-lg transition-all duration-500 ${
          visibleOptimizer ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9998 }}
      >
        🚀 Try our <p>AI Resume Optimizer for Free</p>
        
      </div>

      {/* Visitor Count Popup */}
      <div
        className={`fixed bottom-6 left-6 bg-white text-neutral-700 px-5 py-3 rounded-lg shadow-lg transition-all duration-500 ${
          visibleVisitors ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
        }`}
        style={{ zIndex: 9997 }}
      >
        <span className="flex"> <Dot className="text-green-600"/> {visitors} users are currently visiting FlashFireJobs right now!</span> 
      </div>
    </>
  );
}
