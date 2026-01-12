import React, { useRef, useEffect, useState } from 'react';
import { MapContainer, Marker, Popup, TileLayer } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from "leaflet";

const Coverage = () => {
  const [serviceCenters, setServiceCenters] = useState([]);
  const mapRef = useRef(null);

  useEffect(() => {
    fetch('/serviceCenters.json')
      .then(res => res.json())
      .then(data => setServiceCenters(data))
      .catch(err => console.error('Failed to fetch service centers:', err));
  }, []);

  const handleSearch = (e) => {
    e.preventDefault();
    const location = e.target.location.value.trim();
    const district = serviceCenters.find(c =>
      c.district.toLowerCase().includes(location.toLowerCase())
    );
    if (district && mapRef.current) {
      const coord = [district.latitude, district.longitude];
      mapRef.current.flyTo(coord, 12);
    }
  };

  const position = [23.685, 90.356];

  const redMarkerIcon = new L.Icon({
    iconUrl:
      "https://raw.githubusercontent.com/pointhi/leaflet-color-markers/master/img/marker-icon-red.png",
    shadowUrl:
      "https://cdnjs.cloudflare.com/ajax/libs/leaflet/1.9.4/images/marker-shadow.png",
    iconSize: [25, 41],
    iconAnchor: [12, 41],
    popupAnchor: [1, -34],
    shadowSize: [41, 41],
  });


  return (
    <section className="max-w-7xl mx-auto relative py-20 transition-colors px-6 md:px-0">
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute -top-40 -left-40 w-96 h-96 bg-[#f9232c]/10 rounded-full blur-3xl" />
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-[#f9232c]/5 rounded-full blur-3xl" />
      </div>
      <div className="text-center max-w-3xl mx-auto mb-12">
        <span className="inline-flex px-4 py-1.5 rounded-full bg-[#f9232c]/10 text-[#f9232c] text-xs font-extrabold uppercase tracking-[0.3em] border border-[#f9232c]/30">
          Service Coverage
        </span>

        <h2 className="mt-6 text-4xl md:text-5xl font-black text-base-content">
          Our <span className="text-[#f9232c]">Delivery & Service Areas</span>
        </h2>

        <p className="mt-4 text-base-content/70 dark:text-base-content/50">
          We deliver and provide services across Bangladesh. Search your district to see our coverage.
        </p>
      </div>

      <form onSubmit={handleSearch} className="relative w-full md:w-1/3 mx-auto mb-8">
        <input
          type="text"
          name='location'
          placeholder="Search your district..."
          className="input border border-base-content/20 h-12 outline-none input-bordered w-full rounded-xl pr-32 bg-base-100 dark:bg-base-300 text-base-content"
        />
        <button
          type="submit"
          className="absolute top-1/2 right-1 btn -translate-y-1/2 z-10 bg-[#f9232c] text-white dark:text-gray-900 text-xs font-bold px-6 py-1 rounded-xl hover:bg-red-600 transition"
        >
          Search
        </button>
      </form>


      <div className='max-w-7xl mx-auto'>
        <div className='rounded-xl w-full relative z-0 h-96 shadow-lg overflow-hidden'>
          <MapContainer
            className='h-96 md:h-[500px] w-full rounded-xl'
            center={position}
            zoom={7}
            scrollWheelZoom={false}
            attributionControl={false}
            ref={mapRef}
          >
            <TileLayer
              attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            />
            {serviceCenters.map((center, index) => (
              <Marker key={index} position={[center.latitude, center.longitude]} icon={redMarkerIcon}>
                <Popup className="">
                  <strong>{center.district}</strong> <br />
                  Service Area: {center.covered_area.join(', ')}
                </Popup>
              </Marker>
            ))}
          </MapContainer>
        </div>
      </div>
    </section>
  );
};

export default Coverage;
