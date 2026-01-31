const miniaturas = document.getElementById('miniaturas');
const modal = document.getElementById('modal');
const imagenAmpliada = document.getElementById('imagen-ampliada');
const cerrar = document.getElementById('cerrar');

// Array de imágenes
const imagenes = [
  '../images/imagen1.png',
  '../images/imagen2.png',
  '../images/imagen3.png',
  '../images/imagen4.png',
  '../images/imagen5.png',
  '../images/imagen6.png'
];

// Crear miniaturas dinámicamente
imagenes.forEach(src => {
  const img = document.createElement('img');
  img.src = src;
  img.alt = 'Miniatura';
  img.addEventListener('click', () => {
    imagenAmpliada.src = src;
    modal.style.display = 'flex';
  });
  miniaturas.appendChild(img);
});

// Cerrar modal
cerrar.addEventListener('click', () => {
  modal.style.display = 'none';
});
// Cerrar modal al hacer clic fuera de la imagen
modal.addEventListener('click', (event) => {
  if (event.target === modal) {
    modal.style.display = 'none';
    }
});
