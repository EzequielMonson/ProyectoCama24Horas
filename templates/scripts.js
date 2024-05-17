document.addEventListener('DOMContentLoaded', function() {
    // Evento del Overlay, es el menú desplegable
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
    // Manejo del overlay del carrito
    var carritoBtn = document.querySelector('.boton-carrito');
    var carritoOverlay = document.querySelector('.overlay-carrito');
    var cerrarCarritoBtn = document.querySelector('.cerrar-carrito');
    carritoBtn.addEventListener('click', function() {
        carritoOverlay.classList.toggle('active');
        
        mostrarProductosEnCarrito();
    });
    cerrarCarritoBtn.addEventListener('click', function() {
        carritoOverlay.classList.remove('active');
        
        
    });
    // Cerrar el carrito al hacer clic fuera del contenido del carrito
    carritoOverlay.addEventListener('click', function(event) {
        if (event.target === carritoOverlay) {
            carritoOverlay.classList.remove('active');
        }
    });
    // Evento para agregar opciones de cama, almohada y colchón
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
                <input type="radio" id="opcion${index + 1}" name="opcion" value="${opcion}">
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
        <button onclick="agregarAlCarrito('${tipo}')">Agregar al carrito</button>
        `;
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
// Creacion de la lista de produtos "Carrito"
var carrito = [];
// Definición de la clase producto (padre)
class Producto {
    constructor(alto, ancho, profundo, tipoMaterial, precioPorMetroCuadrado) {
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
        this.tipoMaterial = tipoMaterial;
        this.precioPorMetroCuadrado = precioPorMetroCuadrado; // Ahora incluye el precio por metro cuadrado
    }
    obtenerMedidas() {
        return `Alto: ${this.alto} Ancho: ${this.ancho} Profundo: ${this.profundo}`;
    }
    cambiarMedidas(alto, ancho, profundo) {
        this.alto = alto;
        this.ancho = ancho;
        this.profundo = profundo;
    }
}

// Clase Colchón que hereda de producto (hijo)
class Colchon extends Producto {
    constructor(tipoMaterial, alto = 30, ancho = 175, profundo = 200) {
        super(alto, ancho, profundo, tipoMaterial);
        this.precioPorMetroCuadrado = 20;
    }
    // Método para obtener información del colchón
    obtenerInformacion() {
        return `Colchón - ${this.obtenerMedidas()} Estilo: ${this.tipoMaterial} - Precio: $${obtenerPrecio(this.precioPorMetroCuadrado)}`;
    }
}
class Cama extends Producto {
    constructor(tipoMaterial, alto = 30, ancho = 175, profundo = 200, precioPorMetroCuadrado) {
        super(alto, ancho, profundo, tipoMaterial, precioPorMetroCuadrado);
    }
    obtenerInformacion() {
        return `Cama - ${this.obtenerMedidas()} Material: ${this.tipoMaterial} - Precio: $${obtenerPrecio(this.precioPorMetroCuadrado)}`;
    }
}
class Almohada extends Producto {
    constructor(tipoMaterial, alto, ancho, profundo){
        super(alto, ancho, profundo, tipoMaterial)
        this.precioPorMetroCuadrado = 5;
    }
    obtenerInformacion() {
        return `Almohada - ${this.obtenerMedidas()} Diseño: ${this.tipoMaterial} - Precio:$${obtenerPrecio(this.precioPorMetroCuadrado)}`;
    }
}
// Función para obtener el precio total de un producto
function obtenerPrecio(precioPorMetroCuadrado) {
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
function agregarAlCarrito(tipo) {
    let tipoMaterial = document.querySelector('input[name="opcion"]:checked').value;
    let alto = parseFloat(document.getElementById("inputAlto").value);
    let ancho = parseFloat(document.getElementById("inputAncho").value);
    if (isNaN(alto) || isNaN(ancho)) {
        alert('Por favor, introduce números válidos en los campos.');
        return;
    }
    let producto;
    let precioPorMetroCuadrado;
    if (tipo === "Tipos de maderas") {
        precioPorMetroCuadrado = 40; // Precio por metro cuadrado para cama
        producto = new Cama(tipoMaterial, alto, ancho, 200, precioPorMetroCuadrado);
    } else if (tipo === "Estilos de almohada") {
        precioPorMetroCuadrado = 5; // Precio por metro cuadrado para almohada
        producto = new Almohada(tipoMaterial, alto, ancho, 20, precioPorMetroCuadrado);
    } else if (tipo === "Diseños de colchón") {
        precioPorMetroCuadrado = 20; // Precio por metro cuadrado para colchón
        producto = new Colchon(tipoMaterial, alto, ancho, 200, precioPorMetroCuadrado);
    }
    carrito.push(producto);
    alert('Producto agregado al carrito');
}

function quitarDelCarrito(productoSeleccionado) {
    const index = carrito.indexOf(productoSeleccionado);
    if (index > -1) {
        carrito.splice(index, 1);
        alert('Producto quitado del carrito');
    } else {
        alert('Producto no encontrado en el carrito');
    }
}
function mostrarProductosEnCarrito() {
    var listaProductos = document.querySelector('.overlay-carrito-content ul');
    listaProductos.innerHTML = ''; // Limpiar la lista antes de agregar los productos

    carrito.forEach(function(producto) {
        var li = document.createElement('li');
        var precioTotalProducto = CalcularPrecioTotal(producto.precioPorMetroCuadrado); // Calcular el precio total del producto
        li.textContent = `${producto.obtenerInformacion()} - Precio: $${precioTotalProducto.toFixed(2)}`; // Mostrar el precio total del producto

        var btnQuitar = document.createElement('button');
        btnQuitar.textContent = 'Quitar';
        btnQuitar.addEventListener('click', function() {
            quitarDelCarrito(producto); // Llamar a la función quitarDelCarrito con el producto actual
            mostrarProductosEnCarrito(); // Actualizar la lista de productos en el overlay del carrito después de quitar un producto
        });

        li.appendChild(btnQuitar);
        listaProductos.appendChild(li);
    });
}
