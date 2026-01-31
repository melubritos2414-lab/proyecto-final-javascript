// Coordenadas del negocio (pueden ser inventadas)
const negocio = [40.4168, -3.7038]; // Madrid ficticio

// Crear el mapa dentro del div con id="map"
const mapa = L.map('map').setView(negocio, 13);

// Cargar los tiles de OpenStreetMap
L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; OpenStreetMap'
}).addTo(mapa);

// Marcador del negocio
L.marker(negocio)
  .addTo(mapa)
  .bindPopup("Mirna Web Studio<br>Ubicación del negocio")
  .openPopup();

// Intentar obtener la ubicación del usuario
mapa.locate({ setView: false, maxZoom: 16 });

// Si encuentra la ubicación del usuario
mapa.on('locationfound', function(e) {
  const usuario = e.latlng;

  // Marcador del usuario
  L.marker(usuario)
    .addTo(mapa)
    .bindPopup("Tu ubicación");

  // Ruta por carretera entre usuario y negocio
  L.Routing.control({
    waypoints: [
      L.latLng(usuario.lat, usuario.lng),
      L.latLng(negocio[0], negocio[1])
    ],
    routeWhileDragging: false,
    showAlternatives: false,
    lineOptions: {
      styles: [{ color: 'blue', weight: 4 }]
    }
  }).addTo(mapa);
});

// Si falla la geolocalización
mapa.on('locationerror', function() {
  console.log("No se pudo obtener la ubicación del usuario.");
});