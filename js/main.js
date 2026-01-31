fetch('data/noticias.json')
  .then(response => response.json())
  .then(noticias => {
    const contenedor = document.getElementById('contenedor-noticias');

    noticias.forEach(noticia => {
      const item = document.createElement('div');
      item.classList.add('noticia');

      item.innerHTML = `
        <h3>${noticia.titulo}</h3>
        <p>${noticia.fecha}</p>
      `;

      contenedor.appendChild(item);
    });
  })
  .catch(error => {
    console.error('Error al cargar las noticias:', error);
  });
 