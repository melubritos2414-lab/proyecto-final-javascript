document.addEventListener("DOMContentLoaded", () => {

  const nombre = document.getElementById("nombre");
  const email = document.getElementById("email");
  const mensaje = document.getElementById("mensaje");
  const condiciones = document.getElementById("condiciones");
  const form = document.getElementById("form-contacto");

  // Expresiones regulares
  const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
  const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  // Función para validar campos
  function validarCampo(campo, condicion) {
    campo.style.border = condicion ? "2px solid green" : "2px solid red";
  }

  // Validación en tiempo real
  nombre.addEventListener("input", () => {
    validarCampo(nombre, soloLetras.test(nombre.value) && nombre.value.length <= 30);
  });

  email.addEventListener("input", () => {
    validarCampo(email, emailValido.test(email.value));
  });

  mensaje.addEventListener("input", () => {
    validarCampo(mensaje, mensaje.value.trim().length >= 10);
  });

  // Envío del formulario
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    const valido =
      soloLetras.test(nombre.value) &&
      nombre.value.length <= 30 &&
      emailValido.test(email.value) &&
      mensaje.value.trim().length >= 10 &&
      condiciones.checked;

    if (valido) {
      alert("Mensaje enviado correctamente.");
      form.reset();

      // Restaurar bordes al estilo oscuro
      [nombre, email, mensaje].forEach(campo => {
        campo.style.border = "1px solid #30363d";
      });

    } else {
      alert("Por favor, completa todos los campos correctamente.");
    }
  });

});