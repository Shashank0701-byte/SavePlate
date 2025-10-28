import React, { useEffect, useState } from 'react';
import { GoogleMap, useJsApiLoader, HeatmapLayer } from '@react-google-maps/api';

// --- Google Map Settings ---
const containerStyle = {
  width: '100%',
  height: '500px',
  borderRadius: '1rem',
};

// Center the map on Bangalore
const center = {
  lat: 12.9716,
  lng: 77.5946
};

const mapLibraries = ['visualization']; // Important: We need the 'visualization' library for heatmaps

function DeliveryHeatmap() {
  const [heatmapData, setHeatmapData] = useState([]);

  // --- 1. Load the Google Maps Script ---
  const { isLoaded } = useJsApiLoader({
    id: 'google-map-script',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY,
    libraries: mapLibraries,
  });

  // --- 2. Fetch Real Heatmap Data from Backend ---
  useEffect(() => {
    const fetchHeatmapData = async () => {
      try {
        // We assume your backend is running on port 4000 and proxy is set up,
        // or you can use the full URL: 'http://localhost:4000/api/orders/heatmap-data'
        const response = await fetch('/api/orders/heatmap-data'); 
        const data = await response.json();

        // Convert our [{lat, lng}] data into Google Map LatLng objects
        const googleMapsData = data.map(point => 
          new window.google.maps.LatLng(point.lat, point.lng)
        );
        
        setHeatmapData(googleMapsData);
      } catch (error) {
        console.error('Error fetching heatmap data:', error);
      }
    };

    fetchHeatmapData();
    // Optional: Set an interval to refresh the data every 10 seconds
    const interval = setInterval(fetchHeatmapData, 10000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="min-h-screen bg-slate-50">
      <div className="bg-white shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-6">
          <h1 className="text-2xl font-bold text-slate-900">Delivery Heat Map</h1>
          <p className="text-sm text-slate-600">Live demand zones for delivery partners</p>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 py-6 grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-2xl professional-shadow">
          <div className="p-4 border-b border-slate-200 flex items-center justify-between">
            <div className="font-semibold text-slate-800">Live Order Map</div>
            <div className="text-sm text-slate-600">Data refreshes every 10 seconds</div>
          </div>
          
          <div className="p-6">
            {/* --- 3. Render the Map --- */}
            {!isLoaded ? (
              <div style={containerStyle} className="flex items-center justify-center bg-slate-100">
                Loading Map...
              </div>
            ) : (
              <GoogleMap
                mapContainerStyle={containerStyle}
                center={center}
                zoom={11}
              >
                {/* --- 4. Render the Heatmap Layer --- */}
                <HeatmapLayer
                  data={heatmapData}
                  options={{
                    radius: 20,
                    opacity: 0.8
                  }}
                />
              </GoogleMap>
            )}
          </div>
        </div>

        {/* This sidebar is from your original code. We can keep it! */}
        <div className="space-y-4">
          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-2">Recommendations</div>
            {/* You can rebuild this recommendation logic later based on real data */}
            <div className="text-sm text-slate-500">High-demand zones are shown in red. Move towards these areas for more orders.</div>
          </div>
          <div className="bg-white rounded-2xl professional-shadow p-4">
            <div className="font-semibold text-slate-800 mb-2">Earnings Boost</div>
            <div className="text-sm text-slate-700">Peak hour multiplier applies in high-demand zones. Complete 3 deliveries for extra ₹60.</div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default DeliveryHeatmap;