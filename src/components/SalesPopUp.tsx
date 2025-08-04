import React, { useEffect, useState } from "react";

const notifications = [
  { name: "Phaneendra", location: "United States", action: "just bought", product: "FlashFireJobs Ignite Subscription", time: "about 1 hour ago", mapImg: "https://flagcdn.com/w80/us.png" },
  { name: "Aditi", location: "India", action: "signed up for", product: "FlashFireJobs Professional Plan", time: "about 3 minutes ago", mapImg: "https://flagcdn.com/w80/in.png" },
  { name: "Lucas", location: "Canada", action: "upgraded to", product: "FlashFireJobs Annual Pro Plan", time: "about 5 minutes ago", mapImg: "https://flagcdn.com/w80/ca.png" },
  { name: "Sofia", location: "Brazil", action: "just bought", product: "FlashFireJobs Ignite Subscription", time: "about 8 minutes ago", mapImg: "https://flagcdn.com/w80/br.png" },
  { name: "Hiroshi", location: "Japan", action: "signed up for", product: "FlashFireJobs Starter Plan", time: "about 10 minutes ago", mapImg: "https://flagcdn.com/w80/jp.png" },
  { name: "Emma", location: "United Kingdom", action: "renewed", product: "FlashFireJobs Premium Subscription", time: "about 15 minutes ago", mapImg: "https://flagcdn.com/w80/gb.png" },
  { name: "Omar", location: "United Arab Emirates", action: "just bought", product: "FlashFireJobs Professional Plan", time: "about 20 minutes ago", mapImg: "https://flagcdn.com/w80/ae.png" },
  { name: "Lina", location: "Germany", action: "upgraded to", product: "FlashFireJobs Ignite Subscription", time: "about 25 minutes ago", mapImg: "https://flagcdn.com/w80/de.png" },
  { name: "Carlos", location: "Mexico", action: "signed up for", product: "FlashFireJobs Starter Plan", time: "about 30 minutes ago", mapImg: "https://flagcdn.com/w80/mx.png" },
  { name: "Zara", location: "Australia", action: "just bought", product: "FlashFireJobs Professional Plan", time: "about 35 minutes ago", mapImg: "https://flagcdn.com/w80/au.png" },
];

export default function SalesPopup() {
  const [visible, setVisible] = useState(false);
  const [current, setCurrent] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setVisible(true);
      setTimeout(() => setVisible(false), 3000); // Hide after 3s
      setCurrent((prev) => (prev + 1) % notifications.length);
    }, 5000);
    return () => clearInterval(interval);
  }, []);

  const n = notifications[current];

  return (
    <div
      className={`fixed bottom-6 left-6 bg-white shadow-lg border border-gray-200 rounded-lg p-3 w-80 flex items-center gap-3 transition-all duration-500 ${
        visible ? "translate-y-0 opacity-100" : "translate-y-10 opacity-0 pointer-events-none"
      }`}
      style={{ zIndex: 9999 }}
    >
      <img src={n.mapImg} alt="map" className="w-14 h-14 rounded-md object-cover" />
      <div className="flex flex-col text-sm">
        <span className="font-medium">{n.name} from {n.location}</span>
        <span>{n.action} <span className="text-blue-600 font-semibold">{n.product}</span></span>
        <span className="text-gray-500 text-xs">{n.time}</span>
      </div>
    </div>
  );
}
