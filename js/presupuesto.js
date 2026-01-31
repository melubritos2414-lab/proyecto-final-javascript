// =========================
// VALIDACIÓN DEL FORMULARIO
// =========================

const nombre = document.getElementById("nombre");
const apellidos = document.getElementById("apellidos");
const telefono = document.getElementById("telefono");
const email = document.getElementById("email");
const condiciones = document.getElementById("condiciones");
const form = document.getElementById("form-presupuesto");

// Expresiones regulares
const soloLetras = /^[A-Za-zÁÉÍÓÚáéíóúñÑ\s]+$/;
const soloNumeros = /^[0-9]+$/;
const emailValido = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

// Función para validar campos
function validarCampo(campo, condicion) {
  campo.style.border = condicion ? "2px solid green" : "2px solid red";
}

// Eventos de validación
nombre.addEventListener("input", () => {
  validarCampo(nombre, soloLetras.test(nombre.value) && nombre.value.length <= 15);
});

apellidos.addEventListener("input", () => {
  validarCampo(apellidos, soloLetras.test(apellidos.value) && apellidos.value.length <= 40);
});

telefono.addEventListener("input", () => {
  validarCampo(telefono, soloNumeros.test(telefono.value) && telefono.value.length <= 9);
});

email.addEventListener("input", () => {
  validarCampo(email, emailValido.test(email.value));
});

// =========================
// CÁLCULO DEL PRESUPUESTO
// =========================

const producto = document.getElementById("producto");
const plazo = document.getElementById("plazo");
const extras = document.querySelectorAll(".extra");
const resultado = document.getElementById("resultado");

function calcularPresupuesto() {
  let total = 0;

  // Precio del producto
  const precioProducto = parseInt(producto.selectedOptions[0].dataset.precio);
  total += precioProducto;

  // Extras seleccionados
  extras.forEach(extra => {
    if (extra.checked) {
      total += parseInt(extra.dataset.precio);
    }
  });

  // Descuento por plazo rápido
  if (plazo.value === "rapido") {
    total *= 0.8; // 20% de descuento
  }

  resultado.textContent = total.toFixed(2) + " €";
}

// Eventos del cálculo
producto.addEventListener("change", calcularPresupuesto);
plazo.addEventListener("change", calcularPresupuesto);
extras.forEach(extra => extra.addEventListener("change", calcularPresupuesto));

calcularPresupuesto(); // Inicialización

// =========================
// ENVÍO DEL FORMULARIO
// =========================

form.addEventListener("submit", (e) => {
  e.preventDefault();

  const valido =
    soloLetras.test(nombre.value) &&
    nombre.value.length <= 15 &&
    soloLetras.test(apellidos.value) &&
    apellidos.value.length <= 40 &&
    soloNumeros.test(telefono.value) &&
    telefono.value.length <= 9 &&
    emailValido.test(email.value) &&
    condiciones.checked;

  if (valido) {
    alert("Formulario enviado correctamente.");
    form.reset();
    resultado.textContent = "0.00 €";

    // Restaurar bordes
    [nombre, apellidos, telefono, email].forEach(campo => {
      campo.style.border = "1px solid #30363d";
    });

  } else {
    alert("Por favor, completa todos los campos correctamente.");
  }
});