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
  // Clase Almohada que hereda de Mobiliario
class Almohada extends Mobiliario {
    constructor(color, alto = 15, ancho = 50, profundo = 70) {
        super(alto, ancho, profundo);
        this.color = color;
    }
    // Método para obtener información de la almohada
    obtenerInformacion() {
        return `Almohada - ${this.obtenerMedidas()} Color: ${this.color}`;
    }
}
  // Clase Cama que hereda de Mobiliario
class Cama extends Mobiliario {
    constructor(tipoMadera, alto = 50, ancho = 200, profundo = 200) {
        super(alto, ancho, profundo);
        this.tipoMadera = tipoMadera;
    }
    // Método para obtener información de la cama
    obtenerInformacion() {
        return `Cama - ${this.obtenerMedidas()} Tipo de Madera: ${this.tipoMadera}`;
    }
}
function obtenerPrecio(tipoDeProducto) {
    let precioPorMetroCuadrado = 0;
    switch  (tipoDeProducto) {
        case "cama":
            precioPorMetroCuadrado = 40; //precio del metro cuadrado hardcodeado
            break;
        case "almohada":
            precioPorMetroCuadrado = 5; //precio del metro cuadrado hardcodeado
            break;
        case "colchon":
            precioPorMetroCuadrado = 20; //precio del metro cuadrado hardcodeado
            break;
    }
    let precioFinal = CalcularPrecioTotal(precioPorMetroCuadrado);
    return precioFinal;
}

function CalcularPrecioTotal() {
    PRECIO_TOTAL = 50;
    let alto = parseFloat(document.getElementById("inputAlto").value);
    let ancho = parseFloat(document.getElementById("inputAncho").value);
    if (isNaN(alto) || isNaN(ancho)) {
        alert('Por favor, introduce números válidos en los campos.');
        return;
    }
    let area = alto * ancho;
    let precioTotal = area * PRECIO_TOTAL;
    alert(precioTotal.toFixed(2));
    let label = document.getElementById("labelPrecioTotal");
    label.innerText = "Precio: $" + precioTotal.toFixed(2);
}