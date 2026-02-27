function renderMayoresDeEdad(usuarios, edadMin, selector) {
  const usuariosFiltrados = usuarios.filter(
    (al) => al.edad >= edadMin && al.activo === true,
  );

  usuariosFiltrados.sort((a, b) => b.edad - a.edad); // Descendente por edad JSON.stringify()

  const contenedor = document.querySelector(selector);

  if (!contenedor) {
    throw new Error("El contenedor indicado no existe en el DOM");
  }

  contenedor.textContent = "";

  if (usuariosFiltrados.length === 0) {
    contenedor.textContent = "No hay resultados";
    return 0;
  }

  const ul = document.createElement("ul");

  usuariosFiltrados.forEach((usuario) => {
    const li = document.createElement("li");
    li.textContent = `${usuario.nombre} (${usuario.edad})`;
    ul.appendChild(li);
  });

  contenedor.appendChild(ul);

  return usuariosFiltrados.length;
}

renderMayoresDeEdad(usuarios, edadMin, "a");
