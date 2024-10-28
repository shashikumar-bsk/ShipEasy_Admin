
import React, { useEffect, useRef, useState } from 'react';
import { Box } from '@mui/material';
import Navbar from '../components/navbar';  // Assuming you have Navbar component
import Sidenavbar from '../components/sidenvbar';  // Assuming you have Sidenavbar component
import { GoogleMap, LoadScript, HeatmapLayer } from '@react-google-maps/api'; // Import HeatmapLayer

const containerStyle = {
  width: '100%',
  height: '400px',
};

const hyderabadCenter = {
  lat: 17.385044,  // Latitude for Hyderabad
  lng: 78.486671,  // Longitude for Hyderabad
};

const MyMap = () => {
  const mapRef = useRef(null);  // Type the ref to hold Google Map instance
  const [heatmapDataPoints, setHeatmapDataPoints] = useState([]);  // State for heatmap points

  // Fetch heatmap points from the API
  useEffect(() => {
    const fetchHeatmapPoints = async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/driver/drive/heatmap-data');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();

        // Convert fetched data into Google Maps LatLng objects with weights
        const points = data.map((point) => ({
          location: new window.google.maps.LatLng(point.latitude, point.longitude),
          weight: point.weight  // Assuming your API returns a weight property
        }));

        // Update state with the processed points
        setHeatmapDataPoints(points);
      } catch (error) {
        console.error('Error fetching heatmap points:', error);
      }
    };

    fetchHeatmapPoints();  // Call the function when the component mounts
  }, []);  // Only run once when the component mounts

  return (
    <GoogleMap
      onLoad={(map) => { mapRef.current = map; }}  // Store the map instance
      mapContainerStyle={containerStyle}
      center={hyderabadCenter}
      zoom={12}
    >
      {/* Render the heatmap layer */}
      {heatmapDataPoints.length > 0 && (
        <HeatmapLayer
          data={heatmapDataPoints}  // Use weighted data points
          options={{
            radius: 40,
            opacity: 0.7,
            gradient: [
              'rgba(0, 255, 0, 0)',   // Transparent for low intensity
              'rgba(0, 255, 0, 1)',   // Green for low intensity
              'rgba(255, 255, 0, 1)', // Yellow for medium intensity
              'rgba(255, 165, 0, 1)', // Orange for high intensity
              'rgba(255, 0, 0, 1)',   // Red for very high intensity
            ],
          }}
        />
      )}
      {/* You can add other map components like markers here */}
    </GoogleMap>
  );
};

const Heatmap = () => {
  return (
    <div className="bg-color">
      <Navbar />
      <Box height={65} /> {/* Spacer for Navbar */}
      <Box sx={{ display: 'flex' }}>
        <Sidenavbar />
        <Box
          component="main"
          sx={{
            flexGrow: 1,
            p: 1,
            overflow: 'hidden',
          }}
        >
          <LoadScript
            googleMapsApiKey="AIzaSyA9qviqi7tO8nndT6WAP_O5qr3NrfpILl0"
            libraries={['visualization']}
          >
            <MyMap /> {/* The map will be rendered here */}
          </LoadScript>
        </Box>
      </Box>
    </div>
  );
};

export default Heatmap;
