const campos = {
    carne: document.getElementById("carne"),
    nombre: document.getElementById("nombre"),
    apellidos: document.getElementById("apellidos"),
    carrera: document.getElementById("carrera"),
    promedio: document.getElementById("promedio")
};

const mensaje = document.getElementById("mensaje");
const cuerpoTabla = document.querySelector("#tabla-estudiantes tbody");

function obtenerDatosFormulario() {
    return {
        carne: campos.carne.value.trim(),
        nombre: campos.nombre.value.trim(),
        apellidos: campos.apellidos.value.trim(),
        carrera: campos.carrera.value.trim(),
        promedio: campos.promedio.value.trim()
    };
}

function limpiarFormulario() {
    Object.values(campos).forEach(campo => campo.value = "");
    mensaje.textContent = "";
}

function mostrarMensaje(texto, exito) {
    mensaje.textContent = texto;
    mensaje.style.color = exito ? "green" : "red";
}

async function cargarLista() {
    const respuesta = await fetch("/estudiantes");
    const estudiantes = await respuesta.json();

    cuerpoTabla.innerHTML = "";

    estudiantes.forEach(estudiante => {
        const fila = document.createElement("tr");
        fila.innerHTML = `
            <td>${estudiante.carne}</td>
            <td>${estudiante.nombre}</td>
            <td>${estudiante.apellidos}</td>
            <td>${estudiante.carrera}</td>
            <td>${estudiante.promedio}</td>
        `;
        cuerpoTabla.appendChild(fila);
    });
}

document.getElementById("btn-guardar").addEventListener("click", async () => {
    const datos = obtenerDatosFormulario();

    const respuesta = await fetch("/estudiantes", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();
    mostrarMensaje(resultado.mensaje, respuesta.ok);

    if (respuesta.ok) {
        limpiarFormulario();
        cargarLista();
    }
});

document.getElementById("btn-modificar").addEventListener("click", async () => {
    const datos = obtenerDatosFormulario();

    const respuesta = await fetch("/estudiantes", {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(datos)
    });

    const resultado = await respuesta.json();
    mostrarMensaje(resultado.mensaje, respuesta.ok);

    if (respuesta.ok) {
        limpiarFormulario();
        cargarLista();
    }
});

document.getElementById("btn-eliminar").addEventListener("click", async () => {
    const carne = campos.carne.value.trim();

    if (!carne) {
        mostrarMensaje("Ingrese el carné del estudiante a eliminar.", false);
        return;
    }

    const respuesta = await fetch(`/estudiantes/${carne}`, { method: "DELETE" });
    const resultado = await respuesta.json();
    mostrarMensaje(resultado.mensaje, respuesta.ok);

    if (respuesta.ok) {
        limpiarFormulario();
        cargarLista();
    }
});

document.getElementById("btn-consultar").addEventListener("click", async () => {
    const carne = campos.carne.value.trim();

    if (!carne) {
        mostrarMensaje("Ingrese el carné del estudiante a consultar.", false);
        return;
    }

    const respuesta = await fetch(`/estudiantes/${carne}`);

    if (!respuesta.ok) {
        const resultado = await respuesta.json();
        mostrarMensaje(resultado.mensaje, false);
        return;
    }

    const estudiante = await respuesta.json();
    campos.nombre.value = estudiante.nombre;
    campos.apellidos.value = estudiante.apellidos;
    campos.carrera.value = estudiante.carrera;
    campos.promedio.value = estudiante.promedio;
    mensaje.textContent = "";
});

document.getElementById("btn-limpiar").addEventListener("click", limpiarFormulario);

document.getElementById("btn-salir").addEventListener("click", () => {
    window.location.href = "/login";
});

cargarLista();
