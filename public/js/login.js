const formLogin = document.getElementById("form-login");
const mensaje = document.getElementById("mensaje");

formLogin.addEventListener("submit", async (evento) => {
    evento.preventDefault();

    const usuario = document.getElementById("usuario").value;
    const password = document.getElementById("password").value;

    const respuesta = await fetch("/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ usuario, password })
    });

    const resultado = await respuesta.json();

    mensaje.textContent = resultado.mensaje;
    mensaje.style.color = resultado.exito ? "green" : "red";
});
