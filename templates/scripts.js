// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    // Convertir cada producto del carrito a un objeto plano con información adicional del tipo
    var carritoParaGuardar = carrito.map(function(producto) {
        return {
            tipo: producto.constructor.name, // Agregar el tipo de producto al objeto
            datos: producto
        };
    });
    localStorage.setItem('carrito', JSON.stringify(carritoParaGuardar));
}

// Función para obtener el carrito desde el localStorage
function obtenerCarritoDesdeLocalStorage() {
    var carritoGuardado = localStorage.getItem('carrito');
    if (carritoGuardado) {
        var carritoJSON = JSON.parse(carritoGuardado);
        carrito = carritoJSON.map(function(item) {
            var producto;
            switch(item.tipo) {
                case 'Colchon':
                    producto = new Colchon(item.datos.tipoMaterial, item.datos.alto, item.datos.ancho);
                    break;
                case 'Cama':
                    producto = new Cama(item.datos.tipoMaterial, item.datos.alto, item.datos.ancho);
                    break;
                case 'Almohada':
                    producto = new Almohada(item.datos.tipoMaterial, item.datos.alto, item.datos.ancho);
                    break;
                default:
                    throw new Error('Tipo de producto no reconocido');
            }
            // Asignar el precio al producto
            producto.precio = item.datos.precio;
            return producto;
        });
        mostrarProductosEnCarrito(); // Actualizar la lista de productos en el carrito al cargar
    }
}
function agregarOpciones(tipo, opciones, medidasPrecios) {
    var elementoMain = document.querySelector("main");
    var codigoHTML = `
        <section class="contenedor-modificaciones">
        <section class="opciones-tipo">
        <label for="opcion">${tipo}: </label> <br>`;
        
    opciones.forEach(function(opcion, index) {
        codigoHTML += `
            <label id="opcion-tipo">
                <input class="radio-tipos" type="radio" id="opcion${index + 1}" name="opcion" value="${opcion}">
                ${opcion}
            </label>
            <br>
        `;
    });

    // Tabla de medidas
    codigoHTML += `
        </section>
        <table id="tablaMedidas">
            <thead>
                <tr>
                    <th>Tamaños</th>
                    <th>Medidas (cm)</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>`;
    
    medidasPrecios.forEach(function(item) {
        codigoHTML += `
            <tr>
                <td><button class="boton-tabla" data-dimensiones="${item.dimensiones}" data-precio="${item.precio}">${item.tamano}</button></td>
                <td>${item.dimensiones.replace('x', ' x ')}</td>
                <td>$${item.precio.toLocaleString()}</td>
            </tr>`;
    });
    
    codigoHTML += `
            </tbody>
        </table>
        <button id="btn-agregar-carrito" onclick="agregarAlCarritoYGuardar('${tipo}')">Agregar al carrito</button>
        </section>
    `;
    elementoMain.innerHTML = codigoHTML;

    // Agregar eventos a los botones de la tabla
    var botonesTabla = document.querySelectorAll('#tablaMedidas button');
    botonesTabla.forEach(function(boton) {
        boton.addEventListener('click', function() {
            // Quitar la clase 'boton-seleccionado' de todos los botones
            botonesTabla.forEach(function(b) {
                b.classList.remove('boton-seleccionado');
            });
            // Agregar la clase 'boton-seleccionado' al botón clickeado
            boton.classList.add('boton-seleccionado');
        });
    });
}
document.addEventListener('DOMContentLoaded', function() {
    // Manejo del botón de compra
    var comprarBtn = document.getElementById('comprar-btn');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', function() {
            if (carrito.length > 0) {
                
                window.location.href = 'compras.html';
            } else {
                alert('El carrito está vacío. Por favor, agrega productos antes de comprar.');
            }
            
        });
    } else {
        console.error('El botón de compra no se encontró.');
    }

    // Manejo del menú desplegable
    var menuBtn = document.querySelector('.menu-btn');
    var overlay = document.querySelector('.overlay');
    var navLinks = document.querySelectorAll('.overlay-content .nav-list li a');
    
    if (menuBtn && overlay && navLinks.length > 0) {
        menuBtn.addEventListener('click', function() {
            overlay.classList.toggle('active');
        });
        
        overlay.addEventListener('click', function(event) {
            if (event.target === overlay) {
                overlay.classList.remove('active');
            }
        });
        
        navLinks.forEach(function(link) {
            link.addEventListener('click', function() {
                overlay.classList.remove('active');
            });
        });
    } else {
        console.error('No se encontraron elementos del menú desplegable.');
    }

    // Manejo del overlay del carrito
    var carritoBtn = document.querySelector('.boton-carrito');
    var carritoOverlay = document.querySelector('.overlay-carrito');
    var cerrarCarritoBtn = document.querySelector('.cerrar-carrito');
    
    if (carritoBtn && carritoOverlay && cerrarCarritoBtn) {
        carritoBtn.addEventListener('click', function() {
            carritoOverlay.classList.toggle('active');
            mostrarProductosEnCarrito();
        });
        
        cerrarCarritoBtn.addEventListener('click', function() {
            carritoOverlay.classList.remove('active');
        });
        
        carritoOverlay.addEventListener('click', function(event) {
            if (event.target === carritoOverlay) {
                carritoOverlay.classList.remove('active');
            }
        });
    } else {
        console.error('No se encontraron elementos del overlay del carrito.');
    }

    // Manejo de eventos para agregar opciones de productos
    var btnAgregarOpcionesCama = document.getElementById("agregarOpcionesCama");
    var btnAgregarOpcionesAlmohada = document.getElementById("agregarOpcionesAlmohada");
    var btnAgregarOpcionesColchon = document.getElementById("agregarOpcionesColchon");

    if (btnAgregarOpcionesCama && btnAgregarOpcionesAlmohada && btnAgregarOpcionesColchon) {
        btnAgregarOpcionesCama.addEventListener("click", function() {
            var tipo = "Tipos de maderas";
            var opciones = ["Pino", "Abeto", "Roble"];
            var medidasPrecios = [
                {tamano: "1 plaza", dimensiones: "80x190", precio: 180000},
                {tamano: "1 y 1/2 plaza", dimensiones: "100x190", precio: 323000},
                {tamano: "2 plazas", dimensiones: "140x190", precio: 452200},
                {tamano: "Queen", dimensiones: "160x200", precio: 544000},
                {tamano: "King", dimensiones: "180x200", precio: 612000},
                {tamano: "Superking", dimensiones: "200x200", precio: 964000}
            ];
            agregarOpciones(tipo, opciones, medidasPrecios);
        });
        btnAgregarOpcionesAlmohada.addEventListener("click", function() {
            var tipo = "Estilos de almohada";
            var opciones = ["Almohada de plumas", "Almohada de espuma viscoelástica", "Almohada de látex"];
            var medidasPrecios = [
                {tamano: "Pequeña", dimensiones: "50x70", precio: 50000},
                {tamano: "Mediana", dimensiones: "60x80", precio: 70000},
                {tamano: "Grande", dimensiones: "70x90", precio: 90000}
            ];
            agregarOpciones(tipo, opciones, medidasPrecios);
        });

        btnAgregarOpcionesColchon.addEventListener("click", function() {
            var tipo = "Diseños de colchón";
            var opciones = ["Colchón ortopédico", "Colchón de espuma", "Colchón de muelles"];
            var medidasPrecios = [
                {tamano: "1 plaza", dimensiones: "80x190", precio: 250000},
                {tamano: "1 y 1/2 plaza", dimensiones: "100x190", precio: 350000},
                {tamano: "2 plazas", dimensiones: "140x190", precio: 480000},
                {tamano: "Queen", dimensiones: "160x200", precio: 600000},
                {tamano: "King", dimensiones: "180x200", precio: 750000},
                {tamano: "Superking", dimensiones: "200x200", precio: 1000000}
            ];
            agregarOpciones(tipo, opciones, medidasPrecios);
        });
    
    } 
    // Llamada a la función para obtener el carrito desde el localStorage al cargar la página
    obtenerCarritoDesdeLocalStorage();
});

// Creacion de la lista de productos "Carrito"
var carrito = [];

// Definición de la clase producto (padre)
class Producto {
    constructor(alto, ancho, tipoMaterial) {
        this.alto = alto;
        this.ancho = ancho;
        this.tipoMaterial = tipoMaterial;
        this.precio = 0;
    }
    obtenerMedidas() {
        return `Alto: ${this.alto} Ancho: ${this.ancho}`;
    }
    cambiarMedidas(alto, ancho) {
        this.alto = alto;
        this.ancho = ancho;
    }
}

// Clase Colchón que hereda de producto (hijo)
class Colchon extends Producto {
    constructor(tipoMaterial, alto, ancho) {
        super(alto, ancho, tipoMaterial);
    }
    // Método para obtener información del colchón
    obtenerInformacion() {
        return `Colchón - ${this.obtenerMedidas()} Estilo: ${this.tipoMaterial} - Precio: $${this.precio}`;
    }
}

class Cama extends Producto {
    constructor(tipoMaterial, alto, ancho) {
        super(alto, ancho, tipoMaterial);
    }
    obtenerInformacion() {
        return `Cama - ${this.obtenerMedidas()} Material: ${this.tipoMaterial} - Precio: $${this.precio}`;
    }
}

class Almohada extends Producto {
    constructor(tipoMaterial, alto, ancho){
        super(alto, ancho, tipoMaterial);
        this.precioPorMetroCuadrado = 5;
    }
    obtenerInformacion() {
        return `Almohada - ${this.obtenerMedidas()} Diseño: ${this.tipoMaterial} - Precio: $${this.precio}`;
    }
}

function agregarAlCarrito(tipo) {
    let tipoMaterial = document.querySelector('input[name="opcion"]:checked').value;
    
    // Obtener valores del botón seleccionado
    var botonSeleccionado = document.querySelector('#tablaMedidas button.boton-seleccionado');

    if (!botonSeleccionado) {
        alert('Por favor, selecciona un tamaño de la tabla.');
        return;
    }
    
    let tamano = botonSeleccionado.textContent.trim();
    let dimensiones = botonSeleccionado.getAttribute('data-dimensiones');
    let [alto, ancho] = dimensiones.split('x').map(parseFloat); // Dividir y convertir las dimensiones a números

    let producto;
    if (tipo === "Tipos de maderas") {
        producto = new Cama(tipoMaterial, alto, ancho);
    } else if (tipo === "Estilos de almohada") {
        producto = new Almohada(tipoMaterial, alto, ancho);
    } else if (tipo === "Diseños de colchón") {
        producto = new Colchon(tipoMaterial, alto, ancho);
    }
function agregarOpciones(tipo, opciones, medidasPrecios) {
    var elementoMain = document.querySelector("main");
    var codigoHTML = `
        <section class="contenedor-modificaciones">
        <section class="opciones-tipo">
        <label for="opcion">${tipo}: </label> <br>`;
        
    opciones.forEach(function(opcion, index) {
        codigoHTML += `
            <label id="opcion-tipo">
                <input class="radio-tipos" type="radio" id="opcion${index + 1}" name="opcion" value="${opcion}">
                ${opcion}
            </label>
            <br>
        `;
    });

    // Tabla de medidas
    codigoHTML += `
        </section>
        <table id="tablaMedidas">
            <thead>
                <tr>
                    <th>Tamaños</th>
                    <th>Medidas (cm)</th>
                    <th>Precio</th>
                </tr>
            </thead>
            <tbody>`;
    
    medidasPrecios.forEach(function(item) {
        codigoHTML += `
            <tr>
                <td><button class="boton-tabla" data-dimensiones="${item.dimensiones}" data-precio="${item.precio}">${item.tamano}</button></td>
                <td>${item.dimensiones.replace('x', ' x ')}</td>
                <td>$${item.precio.toLocaleString()}</td>
            </tr>`;
    });
    
    codigoHTML += `
            </tbody>
        </table>
        <label id="labelPrecioTotal">Precio :</label>
        <button id="btn-agregar-carrito" onclick="agregarAlCarritoYGuardar('${tipo}')">Agregar al carrito</button>
        </section>
    `;
    elementoMain.innerHTML = codigoHTML;

    // Agregar eventos a los botones de la tabla
    var botonesTabla = document.querySelectorAll('#tablaMedidas button');
    botonesTabla.forEach(function(boton) {
        boton.addEventListener('click', function() {
            // Quitar la clase 'boton-seleccionado' de todos los botones
            botonesTabla.forEach(function(b) {
                b.classList.remove('boton-seleccionado');
            });
            // Agregar la clase 'boton-seleccionado' al botón clickeado
            boton.classList.add('boton-seleccionado');
        });
    });
}
    producto.precio = parseFloat(botonSeleccionado.getAttribute('data-precio'));
    
    carrito.push(producto); // Agregar la nueva instancia al carrito
    mostrarProductosEnCarrito(); // Actualizar la lista de productos en el carrito
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
    guardarCarritoEnLocalStorage(); // Guardar el carrito actualizado en el localStorage
    mostrarProductosEnCarrito(); // Actualizar la lista de productos en el carrito
}

function calcularPrecioTotal() {
    return carrito.reduce((total, producto) => total + producto.precio, 0);
}

function mostrarProductosEnCarrito() {
    var listaProductos = document.querySelector('.overlay-carrito-content ul');
    
    // Verificar si el elemento del overlay está presente
    if (!listaProductos) {
        console.error('El elemento de la lista de productos en el overlay no se encontró.');
        return;
    }

    // Limpiar la lista antes de agregar los productos
    listaProductos.innerHTML = '';

    carrito.forEach(function(producto) {
        var li = document.createElement('li');
        li.textContent = producto.obtenerInformacion();

        var btnQuitar = document.createElement('button');
        btnQuitar.textContent = 'Quitar';
        btnQuitar.addEventListener('click', function() {
            quitarDelCarritoYGuardar(producto); // Llamar a la función quitarDelCarritoYGuardar con el producto actual
        });

        li.appendChild(btnQuitar);
        listaProductos.appendChild(li);
    });

    var precioTotal = calcularPrecioTotal();
    var totalElement = document.querySelector('.precio-total');
    var precioFormulario = document.getElementById("precio-total")
    if (totalElement) {
        totalElement.textContent = `Precio Total: $${precioTotal.toLocaleString()}`;
    }
    else { 
        if(precioFormulario){
            precioFormulario.textContent = `Precio Total: $${precioTotal.toLocaleString()}`;
        }
        else{
            console.error('El elemento precio-total no se encontró')
            return;
        }
        
    }
}
    
    

    



// Función para agregar un producto al carrito y luego guardar el carrito en el localStorage
function agregarAlCarritoYGuardar(tipo) {
    agregarAlCarrito(tipo);
    guardarCarritoEnLocalStorage();
}

// Función para quitar un producto del carrito y luego guardar el carrito en el localStorage
function quitarDelCarritoYGuardar(productoSeleccionado) {
    quitarDelCarrito(productoSeleccionado);
    guardarCarritoEnLocalStorage();
}
// Función para mostrar el orden de productos en la sección 'listado-productos'
function mostrarOrdenDeProductos() {
    var listadoProductos = document.getElementById('listado-productos');
    
    if (!listadoProductos) {
        console.error('El contenedor de listado de productos no se encontró.');
        return;
    }
    

    listadoProductos.innerHTML = ''; // Limpiar el contenido existente

    carrito.forEach(function(producto) {
        var productoHTML = `
            <div class="producto">
                <h3>${producto.constructor.name}</h3>
                <p>Tipo de material: ${producto.tipoMaterial}</p>
                <p>Medidas: ${producto.ancho} x ${producto.alto} cm</p>
                <p>Precio: $${producto.precio.toLocaleString()}</p>
            </div>
        `;
        listadoProductos.innerHTML += productoHTML;
    var precioTotal = calcularPrecioTotal();
    var totalElement = document.getElementById('precio-total');
    if (!totalElement) {
        console.error('El elemento del precio total no se encontró.');
        return;
    }
    totalElement.textContent = `Precio Total: $${precioTotal.toLocaleString()}`;
    });
}