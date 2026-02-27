# Interacción con Formularios

Los formularios son la principal forma en que los usuarios envían datos a tu aplicación. Saber manejarlos bien incluye leerlos, validarlos, mostrar errores y enviarlos.

---

## 📋 Tipos de campos y cómo leer sus valores

Cada tipo de input se lee de forma diferente.

```html
<form id="miFormulario">
  <input type="text"     id="nombre"    value="Ana">
  <input type="email"    id="email"     value="ana@mail.com">
  <input type="number"   id="edad"      value="28">
  <input type="password" id="password"  value="1234">
  <input type="checkbox" id="acepto"    checked>
  <input type="radio"    name="genero"  value="masculino">
  <input type="radio"    name="genero"  value="femenino"  checked>
  <input type="range"    id="volumen"   value="70" min="0" max="100">
  <input type="date"     id="fecha"     value="2026-02-27">
  <input type="file"     id="archivo">
  <textarea             id="mensaje">Hola</textarea>
  <select               id="pais">
    <option value="es">España</option>
    <option value="mx" selected>México</option>
    <option value="ar">Argentina</option>
  </select>
</form>
```

```javascript
// Texto, email, password, number, range, date, textarea
document.getElementById("nombre").value;    // → "Ana"
document.getElementById("email").value;     // → "ana@mail.com"
document.getElementById("edad").value;      // → "28" (siempre string)
Number(document.getElementById("edad").value); // → 28 (convertir a número)
document.getElementById("volumen").value;   // → "70"
document.getElementById("fecha").value;     // → "2026-02-27"
document.getElementById("mensaje").value;   // → "Hola"

// Checkbox: se lee con .checked (true/false)
document.getElementById("acepto").checked; // → true

// Radio: hay que buscar cuál está seleccionado
const generoSeleccionado = document.querySelector('input[name="genero"]:checked');
generoSeleccionado.value; // → "femenino"

// Select
document.getElementById("pais").value;        // → "mx"
const select = document.getElementById("pais");
select.options[select.selectedIndex].text;    // → "México"

// File: el archivo seleccionado
const inputArchivo = document.getElementById("archivo");
inputArchivo.files[0];          // primer archivo
inputArchivo.files[0].name;     // → "foto.jpg"
inputArchivo.files[0].size;     // → tamaño en bytes
inputArchivo.files[0].type;     // → "image/jpeg"
```

---

## 🎧 Eventos de formulario

```javascript
const input = document.querySelector("#nombre");
const form  = document.querySelector("#miFormulario");

// input: se dispara en CADA tecla pulsada
input.addEventListener("input", e => {
  console.log("Escribiendo:", e.target.value);
});

// change: se dispara al perder el foco (cuando terminas de escribir)
input.addEventListener("change", e => {
  console.log("Valor final:", e.target.value);
});

// focus: cuando el usuario hace click en el campo
input.addEventListener("focus", e => {
  e.target.classList.add("activo");
});

// blur: cuando el usuario sale del campo
input.addEventListener("blur", e => {
  e.target.classList.remove("activo");
  validarCampo(e.target); // buen momento para validar
});

// submit: cuando el usuario envía el formulario
form.addEventListener("submit", e => {
  e.preventDefault(); // SIEMPRE esto primero: evita recargar la página
  procesarFormulario();
});

// reset: cuando se pulsa el botón de reset
form.addEventListener("reset", e => {
  console.log("Formulario reiniciado");
});
```

---

## 📖 Leer todos los datos de un formulario de golpe

```javascript
const form = document.querySelector("#miFormulario");

form.addEventListener("submit", e => {
  e.preventDefault();

  // FormData: lee todos los campos automáticamente
  const datos = new FormData(form);

  // Leer campo por campo
  datos.get("nombre");   // → "Ana"
  datos.get("email");    // → "ana@mail.com"

  // Convertir a objeto normal
  const objeto = Object.fromEntries(datos.entries());
  // → { nombre: "Ana", email: "ana@mail.com", pais: "mx", ... }

  // Convertir a JSON para enviar al servidor
  const json = JSON.stringify(objeto);
});
```

---

## ✅ Validación

### Validación nativa del navegador (HTML)

El navegador puede validar por ti con atributos HTML, sin JavaScript:

```html
<input type="text"
  required                   <!-- campo obligatorio -->
  minlength="3"              <!-- mínimo 3 caracteres -->
  maxlength="20"             <!-- máximo 20 caracteres -->
  placeholder="Tu nombre">

<input type="email"
  required>                  <!-- valida formato email automáticamente -->

<input type="number"
  min="18"                   <!-- valor mínimo -->
  max="99"                   <!-- valor máximo -->
  step="1">                  <!-- incrementos de 1 en 1 -->

<input type="text"
  pattern="[0-9]{9}"         <!-- exactamente 9 dígitos (regex) -->
  title="Introduce 9 dígitos">

<input type="url">           <!-- valida que sea una URL válida -->
<input type="tel">           <!-- campo de teléfono -->
```

### Validación con JavaScript (más control)

```javascript
function validarEmail(email) {
  const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return regex.test(email);
}

function validarTelefono(tel) {
  const regex = /^[6789]\d{8}$/; // teléfono español
  return regex.test(tel);
}

function validarPassword(pass) {
  return {
    longitud:  pass.length >= 8,
    mayuscula: /[A-Z]/.test(pass),
    minuscula: /[a-z]/.test(pass),
    numero:    /[0-9]/.test(pass),
    especial:  /[!@#$%^&*]/.test(pass),
    get valida() {
      return this.longitud && this.mayuscula &&
             this.minuscula && this.numero;
    }
  };
}

function validarFecha(fecha) {
  const hoy = new Date();
  const f   = new Date(fecha);
  return f instanceof Date && !isNaN(f) && f <= hoy;
}

// Uso
validarEmail("ana@mail.com");     // → true
validarEmail("esto no es email"); // → false
validarTelefono("612345678");     // → true

const pass = validarPassword("MiPass123");
pass.valida;   // → true
pass.especial; // → false (le falta carácter especial)
```

---

## ❌ Mostrar errores al usuario

La clave es mostrar mensajes claros justo debajo del campo que falla.

```html
<form id="registro">
  <div class="campo">
    <label for="nombre">Nombre</label>
    <input type="text" id="nombre" name="nombre">
    <span class="error" id="error-nombre"></span>
  </div>

  <div class="campo">
    <label for="email">Email</label>
    <input type="email" id="email" name="email">
    <span class="error" id="error-email"></span>
  </div>

  <div class="campo">
    <label for="pass">Contraseña</label>
    <input type="password" id="pass" name="pass">
    <span class="error" id="error-pass"></span>
  </div>

  <button type="submit">Registrarse</button>
</form>
```

```css
.campo input.invalido  { border: 2px solid red; }
.campo input.valido    { border: 2px solid green; }
.error                 { color: red; font-size: 0.85em; display: block; }
```

```javascript
function mostrarError(inputId, mensaje) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`error-${inputId}`);

  input.classList.add("invalido");
  input.classList.remove("valido");
  error.textContent = mensaje;
}

function mostrarExito(inputId) {
  const input = document.getElementById(inputId);
  const error = document.getElementById(`error-${inputId}`);

  input.classList.add("valido");
  input.classList.remove("invalido");
  error.textContent = "";
}

function validarCampos() {
  let formularioValido = true;

  // Nombre
  const nombre = document.getElementById("nombre").value.trim();
  if (!nombre) {
    mostrarError("nombre", "El nombre es obligatorio");
    formularioValido = false;
  } else if (nombre.length < 3) {
    mostrarError("nombre", "El nombre debe tener al menos 3 caracteres");
    formularioValido = false;
  } else {
    mostrarExito("nombre");
  }

  // Email
  const email = document.getElementById("email").value.trim();
  if (!email) {
    mostrarError("email", "El email es obligatorio");
    formularioValido = false;
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    mostrarError("email", "Introduce un email válido");
    formularioValido = false;
  } else {
    mostrarExito("email");
  }

  // Contraseña
  const pass = document.getElementById("pass").value;
  if (!pass) {
    mostrarError("pass", "La contraseña es obligatoria");
    formularioValido = false;
  } else if (pass.length < 8) {
    mostrarError("pass", "Mínimo 8 caracteres");
    formularioValido = false;
  } else if (!/[A-Z]/.test(pass)) {
    mostrarError("pass", "Debe contener al menos una mayúscula");
    formularioValido = false;
  } else {
    mostrarExito("pass");
  }

  return formularioValido;
}

// Enviar solo si todo es válido
document.getElementById("registro").addEventListener("submit", e => {
  e.preventDefault();
  if (validarCampos()) {
    console.log("Enviando formulario...");
  }
});

// Validar en tiempo real al salir de cada campo
["nombre", "email", "pass"].forEach(id => {
  document.getElementById(id).addEventListener("blur", () => {
    validarCampos();
  });
});
```

---

## 💡 Indicador de fortaleza de contraseña

```html
<input type="password" id="password" placeholder="Contraseña">
<div id="fuerza-barra">
  <div id="fuerza-relleno"></div>
</div>
<p id="fuerza-texto"></p>
```

```javascript
document.getElementById("password").addEventListener("input", e => {
  const pass    = e.target.value;
  const relleno = document.getElementById("fuerza-relleno");
  const texto   = document.getElementById("fuerza-texto");

  let puntos = 0;
  if (pass.length >= 8)        puntos++;
  if (pass.length >= 12)       puntos++;
  if (/[A-Z]/.test(pass))      puntos++;
  if (/[0-9]/.test(pass))      puntos++;
  if (/[!@#$%^&*]/.test(pass)) puntos++;

  const niveles = [
    { min: 0, label: "Muy débil",  color: "red",    ancho: "20%" },
    { min: 1, label: "Débil",      color: "orange", ancho: "40%" },
    { min: 2, label: "Regular",    color: "yellow", ancho: "60%" },
    { min: 3, label: "Fuerte",     color: "lime",   ancho: "80%" },
    { min: 5, label: "Muy fuerte", color: "green",  ancho: "100%" },
  ];

  const nivel = [...niveles].reverse().find(n => puntos >= n.min);

  relleno.style.width           = nivel.ancho;
  relleno.style.backgroundColor = nivel.color;
  texto.textContent             = nivel.label;
});
```

---

## 📤 Enviar datos al servidor

### Con fetch (la forma moderna)

```javascript
document.getElementById("registro").addEventListener("submit", async e => {
  e.preventDefault();

  const datos = {
    nombre: document.getElementById("nombre").value,
    email:  document.getElementById("email").value,
    pass:   document.getElementById("pass").value,
  };

  const boton = e.target.querySelector("button[type='submit']");
  boton.disabled    = true;
  boton.textContent = "Enviando...";

  try {
    const respuesta = await fetch("https://api.ejemplo.com/registro", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error("Error del servidor");

    const resultado = await respuesta.json();
    console.log("Registro exitoso:", resultado);
    mostrarMensajeExito("¡Cuenta creada correctamente!");
    e.target.reset();

  } catch (error) {
    console.error("Error:", error);
    mostrarMensajeError("No se pudo conectar. Inténtalo más tarde.");

  } finally {
    boton.disabled    = false;
    boton.textContent = "Registrarse";
  }
});
```

### Subir archivos

```javascript
document.getElementById("formArchivo").addEventListener("submit", async e => {
  e.preventDefault();

  const archivo = document.getElementById("archivo").files[0];

  if (!archivo) {
    mostrarError("archivo", "Selecciona un archivo");
    return;
  }

  const tiposPermitidos = ["image/jpeg", "image/png", "image/webp"];
  const maxTamaño       = 5 * 1024 * 1024; // 5MB

  if (!tiposPermitidos.includes(archivo.type)) {
    mostrarError("archivo", "Solo se permiten imágenes JPG, PNG o WEBP");
    return;
  }

  if (archivo.size > maxTamaño) {
    mostrarError("archivo", "El archivo no puede superar 5MB");
    return;
  }

  const formData = new FormData();
  formData.append("imagen", archivo);
  formData.append("nombre", document.getElementById("nombre").value);

  try {
    const respuesta = await fetch("https://api.ejemplo.com/subir", {
      method: "POST",
      body:   formData
      // No pongas Content-Type: el navegador lo gestiona con el boundary
    });

    const resultado = await respuesta.json();
    console.log("Archivo subido:", resultado.url);

  } catch (error) {
    console.error("Error al subir:", error);
  }
});
```

### Vista previa de imagen antes de subir

```javascript
document.getElementById("archivo").addEventListener("change", e => {
  const archivo = e.target.files[0];
  const preview = document.getElementById("preview");

  if (!archivo || !archivo.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = evento => {
    preview.src          = evento.target.result;
    preview.style.display = "block";
  };
  reader.readAsDataURL(archivo);
});
```

---

## 🔄 Ejemplo completo: formulario de registro real

```html
<form id="registro">
  <div class="campo">
    <label>Nombre completo</label>
    <input type="text" name="nombre" id="nombre">
    <span class="error" id="error-nombre"></span>
  </div>

  <div class="campo">
    <label>Email</label>
    <input type="email" name="email" id="email">
    <span class="error" id="error-email"></span>
  </div>

  <div class="campo">
    <label>Contraseña</label>
    <input type="password" name="pass" id="pass">
    <span class="error" id="error-pass"></span>
    <div id="fuerza"></div>
  </div>

  <div class="campo">
    <label>Confirmar contraseña</label>
    <input type="password" name="pass2" id="pass2">
    <span class="error" id="error-pass2"></span>
  </div>

  <div class="campo">
    <label>País</label>
    <select name="pais" id="pais">
      <option value="">-- Selecciona --</option>
      <option value="es">España</option>
      <option value="mx">México</option>
    </select>
    <span class="error" id="error-pais"></span>
  </div>

  <div class="campo">
    <input type="checkbox" id="terminos" name="terminos">
    <label for="terminos">Acepto los términos y condiciones</label>
    <span class="error" id="error-terminos"></span>
  </div>

  <button type="submit" id="btnEnviar">Crear cuenta</button>
  <p id="mensaje-global"></p>
</form>
```

```javascript
const reglas = {
  nombre: valor => {
    if (!valor.trim())     return "El nombre es obligatorio";
    if (valor.length < 3)  return "Mínimo 3 caracteres";
    if (valor.length > 50) return "Máximo 50 caracteres";
    return null;
  },
  email: valor => {
    if (!valor.trim())                               return "El email es obligatorio";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(valor))  return "Email no válido";
    return null;
  },
  pass: valor => {
    if (!valor)              return "La contraseña es obligatoria";
    if (valor.length < 8)    return "Mínimo 8 caracteres";
    if (!/[A-Z]/.test(valor)) return "Necesita una mayúscula";
    if (!/[0-9]/.test(valor)) return "Necesita un número";
    return null;
  },
  pass2: valor => {
    const pass = document.getElementById("pass").value;
    if (!valor)        return "Confirma la contraseña";
    if (valor !== pass) return "Las contraseñas no coinciden";
    return null;
  },
  pais: valor => {
    if (!valor) return "Selecciona un país";
    return null;
  },
  terminos: () => {
    const check = document.getElementById("terminos").checked;
    if (!check) return "Debes aceptar los términos";
    return null;
  }
};

function validarTodo() {
  let valido = true;

  for (const [campo, regla] of Object.entries(reglas)) {
    const input = document.getElementById(campo);
    const error = document.getElementById(`error-${campo}`);
    const valor = input ? input.value : "";
    const msg   = regla(valor);

    if (msg) {
      error.textContent = msg;
      if (input) input.classList.add("invalido");
      valido = false;
    } else {
      error.textContent = "";
      if (input) {
        input.classList.remove("invalido");
        input.classList.add("valido");
      }
    }
  }
  return valido;
}

// Validar en tiempo real al salir de cada campo
Object.keys(reglas).forEach(campo => {
  const el = document.getElementById(campo);
  if (el) el.addEventListener("blur", validarTodo);
});

// Envío del formulario
document.getElementById("registro").addEventListener("submit", async e => {
  e.preventDefault();
  if (!validarTodo()) return;

  const btn = document.getElementById("btnEnviar");
  const msg = document.getElementById("mensaje-global");
  btn.disabled    = true;
  btn.textContent = "Enviando...";

  try {
    const datos = Object.fromEntries(new FormData(e.target).entries());

    const respuesta = await fetch("/api/registro", {
      method:  "POST",
      headers: { "Content-Type": "application/json" },
      body:    JSON.stringify(datos)
    });

    if (!respuesta.ok) throw new Error(await respuesta.text());

    msg.textContent = "✅ ¡Cuenta creada! Revisa tu email.";
    msg.style.color = "green";
    e.target.reset();

  } catch (err) {
    msg.textContent = `❌ Error: ${err.message}`;
    msg.style.color = "red";

  } finally {
    btn.disabled    = false;
    btn.textContent = "Crear cuenta";
  }
});
```

---

## En resumen

| Concepto | Para qué sirve |
|---|---|
| `.value` | Leer el valor de inputs de texto, number, select... |
| `.checked` | Leer si un checkbox o radio está marcado |
| `FormData` | Leer todos los campos del formulario de golpe |
| `evento input` | Reaccionar en cada tecla pulsada |
| `evento blur` | Validar cuando el usuario sale del campo |
| `evento submit` + `preventDefault()` | Capturar el envío sin recargar la página |
| Validación HTML | Validación básica sin JavaScript |
| Validación JS | Validación avanzada con mensajes personalizados |
| `fetch` con POST | Enviar datos al servidor de forma asíncrona |
| `FileReader` | Leer archivos del usuario en el navegador |
