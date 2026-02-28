import React, { useState, useEffect } from "react";
import { MapContainer, TileLayer, Marker, Popup, LayersControl } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import L from "leaflet";
import icon from "leaflet/dist/images/marker-icon.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import { HiMiniWrench } from "react-icons/hi2";
import { BiSolidEdit } from "react-icons/bi";
import { FcSettings } from "react-icons/fc";
import { LuTableOfContents, LuClock9 } from "react-icons/lu";
import { FaPrint } from "react-icons/fa6";
import { FaRegFilePdf } from "react-icons/fa";
import axios from "axios";
import LoadingSpinner from "../../../Components/Common/LoadingSpinner/LoadingSpinner";

// Fix default icon issue
let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});
L.Marker.prototype.options.icon = DefaultIcon;

// Create a custom icon
const CustomIcon = L.icon({
  iconUrl: require('./image.png'), // Path to your custom icon
  iconSize: [40, 50], // Size of the icon
  iconAnchor: [15, 50], // Anchor point of the icon
  popupAnchor: [0, -40] // Adjusts the popup position
});

// Add these styles to ensure dropdowns appear above the map
const mapContainerStyle = {
  position: 'relative',
  width: '100%',
  height: 'calc(85vh - 100px)', // Adjust height as needed
  zIndex: 1 // Lower z-index for map container
};

const dropdownStyle = {
  zIndex: 1000 // Higher z-index for dropdowns
};

function LocationMap() {
  const [locations, setLocations] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [center, setCenter] = useState([25.28354, 51.534677]); // Default center
  const [isOpen, setIsOpen] = useState(false);
  const [isToolOpen, setIsToolOpen] = useState(false);

  // Fetch locations when component mounts
  useEffect(() => {
    const fetchLocations = async () => {
      try {
        setIsLoading(true);
        const response = await axios.get(
          `${process.env.REACT_APP_API_URL}/api/v1/locations/all`,
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );

        if (response.data) {
          // Filter locations that have valid coordinates
          const validLocations = response.data.filter(
            loc => loc.latitude && loc.longitude
          );
          setLocations(validLocations);

          // Set center to first location if available
          if (validLocations.length > 0) {
            setCenter([
              parseFloat(validLocations[0].latitude),
              parseFloat(validLocations[0].longitude)
            ]);
          }
        }
      } catch (error) {
        console.error("Error fetching locations:", error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLocations();
  }, []);

  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  const toggleToolDropDown = () => {
    setIsToolOpen(!isToolOpen);
  };

  if (isLoading) {
    return <LoadingSpinner />;
  }

  return (
    <React.Fragment>
      <div className="page-content">
        <div className="container-fluid">
          {/* Header section */}
          <div className="d-flex align-items-center justify-content-between mb-4">
            <h2 className="mb-0">Location Map</h2>
            {/* Add dropdown with higher z-index */}
            <div style={dropdownStyle}>
              <div className="dropdown">
                <button
                  className="btn btn-secondary dropdown-toggle border-radius-2 ms-1"
                  type="button"
                  id="TollFropdown"
                  data-bs-toggle="dropdown"
                  aria-expanded={isToolOpen}
                  onClick={toggleToolDropDown}
                >
                  <HiMiniWrench className="wh-16" />
                </button>
                <ul className={`z-index dropdown-menu right-auto ${isToolOpen ? "show" : ""}`}>
                  <li>
                    <a className="dropdown-item" href="#">
                      <BiSolidEdit className="hw-15 mr-5px" />
                      Design this page
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FcSettings className="hw-15 mr-5px" />
                      Object Definition
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuTableOfContents className="hw-15 mr-5px" />
                      tab Definition
                    </a>
                  </li>
                  <div className="border-1"></div>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaPrint className="hw-15 mr-5px" />
                      Print
                    </a>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <FaRegFilePdf className="hw-15 mr-5px" />
                      PDF
                    </a>
                    <div className="border-1"></div>
                  </li>
                  <li>
                    <a className="dropdown-item" href="#">
                      <LuClock9 className="hw-15 mr-5px" />
                      Page Load Time
                    </a>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Map container with lower z-index */}
          <div style={mapContainerStyle}>
            <div id="map" style={{ height: '80%', width: '100%' }}>
              <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={true}
                style={{ height: "100%", width: "100%" }}
              >
                <LayersControl position="topright">
                  <LayersControl.BaseLayer checked name="Street">
                    <TileLayer
                      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
                    />
                  </LayersControl.BaseLayer>

                  <LayersControl.BaseLayer name="Satellite">
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
                      attribution='&copy; Google Maps'
                      subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    />
                  </LayersControl.BaseLayer>

                  <LayersControl.BaseLayer name="Terrain">
                    <TileLayer
                      url="https://{s}.google.com/vt/lyrs=p&x={x}&y={y}&z={z}"
                      attribution='&copy; Google Maps'
                      subdomains={["mt0", "mt1", "mt2", "mt3"]}
                    />
                  </LayersControl.BaseLayer>

                  {locations.map(location => (
                    <Marker
                      key={location._id}
                      position={[parseFloat(location.latitude), parseFloat(location.longitude)]}
                      icon={CustomIcon}
                    >
                      <Popup className="custom-popup">
                        <div className="popup-content">
                          <h5>{location.locationName}</h5>
                          <p>
                            {/* {location.streetAddress1}<br />
                            {location.streetAddress2 && `${location.streetAddress2}<br />`} */}
                            {location.city}{location.city && ','} {location.stateProvince}<br />
                            {location.zipPostalCode}<br />
                            {location.country}
                          </p>
                          <p>
                            <strong>Type:</strong> {location.locationType}<br />
                            <strong>Capacity:</strong> {location.capacity}
                          </p>
                        </div>
                      </Popup>
                    </Marker>
                  ))}
                </LayersControl>
              </MapContainer>
            </div>
          </div>
        </div>
      </div>
    </React.Fragment>
  );
}

export default LocationMap;
