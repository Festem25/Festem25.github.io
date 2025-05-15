const NASA_API_KEY = 'aQLm1PfAl82gzcUhg75tJpfgPcXbsNo8s8Kd9z22'; 
 
async function loadAstronomyWidgets() { 
  loadAPOD(); 
  loadMarsPhoto(); 
  loadEarthImage(); 
  loadNEOData(); 
} 
 
async function loadAPOD() { 
  const res = await fetch(`https://api.nasa.gov/planetary/apod?api_key=${NASA_API_KEY}`); 
  const data = await res.json(); 
  document.getElementById('apod-card').innerHTML = ` 
    <h3>${data.title}</h3> 
    <img src="${data.url}" alt="APOD" /> 
    <p>${data.explanation.substring(0, 150)}...</p> 
  `; 
} 
 
async function loadMarsPhoto() { 
  const res = await fetch(`https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=${NASA_API_KEY}`); 
  const data = await res.json(); 
  const photo = data.photos[0]; 
  document.getElementById('mars-card').innerHTML = ` 
    <h3>Mars Rover: ${photo.rover.name}</h3> 
    <img src="${photo.img_src}" alt="Mars Rover" /> 
    <p>Taken by ${photo.camera.full_name} on ${photo.earth_date}</p> 
  `; 
} 
 
async function loadEarthImage() { 
  const today = new Date().toISOString().split('T')[0]; 
  const res = await fetch(`https://api.nasa.gov/planetary/earth/assets?lon=100&lat=1&date=${today}&dim=0.1&api_key=${NASA_API_KEY}`); 
  const data = await res.json(); 
  if (data.url) { 
    document.getElementById('earth-card').innerHTML = ` 
      <h3>Satellite Earth Image</h3> 
      <img src="${data.url}" alt="Earth View" /> 
      <p>Location: Lat 1, Lon 100 (near Equator)</p> 
    `; 
  } else { 
    document.getElementById('earth-card').innerHTML = 'No image available for today.'; 
  } 
} 
 
async function loadNEOData() { 
  const today = new Date().toISOString().split('T')[0]; 
  const res = await fetch(`https://api.nasa.gov/neo/rest/v1/feed?start_date=${today}&end_date=${today}&api_key=${NASA_API_KEY}`); 
  const data = await res.json(); 
  const count = data.element_count; 
  document.getElementById('neo-card').innerHTML = ` 
    <h3>Near-Earth Objects</h3> 
    <p>${count} objects detected near Earth today.</p> 
    <p>Data by NASA NEO API.</p> 
  `; 
} 
 
document.addEventListener('DOMContentLoaded', loadAstronomyWidgets);