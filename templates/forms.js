document.getElementById("formularioContacto").addEventListener("submit", function(event) {
    event.preventDefault();

    // Validación de campos
    var motivo = document.getElementById("motivoSelect").value;
    var nombre = document.getElementById("nombre").value;
    var apellido = document.getElementById("apellido").value;
    var dni = document.getElementById("dni").value;
    var telefono = document.getElementById("telefono").value;
    var email = document.getElementById("email").value;
    var provincia = document.getElementById("provincia").value;
    var comentario = document.getElementById("comentario").value;

    if (motivo === "vacio") {
        mostrarAlerta("Por favor, seleccione un motivo.");
        return;
    }

    if (nombre === "") {
        mostrarAlerta("Por favor, introduzca su nombre.");
        return;
    }

    if (apellido === "") {
        mostrarAlerta("Por favor, introduzca su apellido.");
        return;
    }

    if (dni === "") {
        mostrarAlerta("Por favor, introduzca su DNI.");
        return;
    }
    if (provincia === "") {
        mostrarAlerta("Por favor, introduzca su provincia.");
        return;
    }

    if (comentario === "") {
        mostrarAlerta("Por favor, introduzca un comentario.");
        return;
    }

    // Si todos los campos están completos, se puede enviar el formulario
    // Aquí enviarías el formulario o realizarías alguna otra acción
    alert("Formulario enviado correctamente.");
});

function mostrarAlerta(mensaje) {
    alert(mensaje);
}