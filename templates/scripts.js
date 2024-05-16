// Evento del Overlay, es el menu desplegable
document.addEventListener('DOMContentLoaded', function() {
    var menuBtn = document.querySelector('.menu-btn');
    var overlay = document.querySelector('.overlay');
    var navLinks = document.querySelectorAll('.overlay-content .nav-list li a');

    // Abrir el menú al hacer clic en el botón de menú
    menuBtn.addEventListener('click', function() {
        overlay.classList.toggle('active');
    });

    // Cerrar el menú al hacer clic fuera del menú
    overlay.addEventListener('click', function(event) {
        if (event.target === overlay) {
            overlay.classList.remove('active');
        }
    });

    // Cerrar el menú al hacer clic en un enlace de navegación dentro del menú
    navLinks.forEach(function(link) {
        link.addEventListener('click', function() {
            overlay.classList.remove('active');
        });
    });
});
document.addEventListener('DOMContentLoaded', function() {
    var elementoMain = document.querySelector("main");
    var btnAgregarOpcionesCama = document.getElementById("agregarOpcionesCama");
    var btnAgregarOpcionesAlmohada = document.getElementById("agregarOpcionesAlmohada");
    var btnAgregarOpcionesColchon = document.getElementById("agregarOpcionesColchon");

    function agregarOpciones(tipo, opciones) {
        var codigoHTML = `
        <label for="opcion">${tipo}: </label> <br>`;
        
        opciones.forEach(function(opcion, index) {
            codigoHTML += `
            <label>
                <input type="radio" id="opcion${index + 1}" name="opcion" value="opcion${index + 1}">
                ${opcion}
            </label>
            <br>`;
        });

        codigoHTML += `
        <label for="inputAlto">Alto: </label>
        <input type="number" id="inputAlto" name="alto"><br>
        <label for="inputAncho">Ancho: </label>
        <input type="number" id="inputAncho" name="ancho"><br>
        <label id="labelPrecioTotal">Precio :</label>
        <button onclick="agregarAlCarrito()">Agregar al carrito</button>
        
        `;

        elementoMain.innerHTML = ``;
        elementoMain.innerHTML = codigoHTML;
    }

    btnAgregarOpcionesCama.addEventListener("click", function() {
        var tipo = "Tipos de maderas";
        var opciones = ["Pino", "Abeto", "Roble"];
        agregarOpciones(tipo, opciones);
    });

    btnAgregarOpcionesAlmohada.addEventListener("click", function() {
        var tipo = "Estilos de almohada";
        var opciones = ["Almohada de plumas", "Almohada de espuma viscoelástica", "Almohada de látex"];
        agregarOpciones(tipo, opciones);
    });

    btnAgregarOpcionesColchon.addEventListener("click", function() {
        var tipo = "Diseños de colchón";
        var opciones = ["Colchón ortopédico", "Colchón de espuma", "Colchón de muelles"];
        agregarOpciones(tipo, opciones);
    });
});

// Definición de la clase Padre
class Mobiliario {
    constructor(alto, ancho, profundo) {
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
    }
    // Método para obtener las medidas
    obtenerMedidas() {
        return `Alto: ${this.alto} Ancho: ${this.ancho} Profundo: ${this.profundo}`;
    }
    cambiarMedidas(alto, ancho, profundo) {
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
    }
}

// Clase Colchón que hereda de Mobiliario
class Colchon extends Mobiliario {
    constructor(diseño, alto = 30, ancho = 175, profundo = 200) {
        super(alto, ancho, profundo);
        this.diseño = diseño;
    }
    // Método para obtener información del colchón
    obtenerInformacion() {
        return `Colchón - ${this.obtenerMedidas()} Diseño: ${this.diseño}`;
    }
}

// Función para obtener el precio total de un producto
function obtenerPrecio(tipoDeProducto) {
    let precioPorMetroCuadrado = 0;
    switch  (tipoDeProducto) {
        case "cama":
            precioPorMetroCuadrado = 40; // Precio del metro cuadrado hardcodeado
            break;
        case "almohada":
            precioPorMetroCuadrado = 5; // Precio del metro cuadrado hardcodeado
            break;
        case "colchon":
            precioPorMetroCuadrado = 20; // Precio del metro cuadrado hardcodeado
            break;
    }
    let precioFinal = CalcularPrecioTotal(precioPorMetroCuadrado);
    return precioFinal;
}

// Función para calcular el precio total
function CalcularPrecioTotal(precioPorMetroCuadrado) {
    let PRECIO_TOTAL = 50; // Precio total hardcodeado
    let alto = parseFloat(document.getElementById("inputAlto").value);
    let ancho = parseFloat(document.getElementById("inputAncho").value);
    if (isNaN(alto) || isNaN(ancho)) {
        alert('Por favor, introduce números válidos en los campos.');
        return;
    }
    let area = alto * ancho;
    let precioTotal = area * precioPorMetroCuadrado;
    alert(precioTotal.toFixed(2));
    let label = document.getElementById("labelPrecioTotal");
    label.innerText = "Precio: $" + precioTotal.toFixed(2);
    return precioTotal;
}
