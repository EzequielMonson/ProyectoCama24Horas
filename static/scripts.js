function guardarDataEnLocalStorage(data) {
    try {
        localStorage.setItem('datosUsuario', JSON.stringify(data));
    } catch (error) {
        console.error('Error al guardar en localStorage:', error);
    }
}
function obtenerDataDelLocalStorage() {
    try {
        var data = localStorage.getItem('datosUsuario');
        return data ? JSON.parse(data) : null;
    } catch (error) {
        console.error('Error al obtener desde localStorage:', error);
        return null;
    }
}
function eliminarDataDelLocalStorage() {
    try {
        localStorage.removeItem('datosUsuario');
        console.log('Datos de usuario eliminados del localStorage.');
    } catch (error) {
        console.error('Error al eliminar datos del localStorage:', error);
    }
}
// Función para guardar el carrito en el localStorage
function guardarCarritoEnLocalStorage() {
    // Convertir cada producto del carrito a un objeto con información adicional del tipo
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
function quitarBtnDelNav(datos) {
    let header = document.querySelector("header");
    let codigo = `
            <nav class="header-nav">
                <a href="/index.html">
                    <img src="../static/img/BEDSALE.png" alt="" class="logo">
                </a>
                <ul class="nav-list">
                    <li><a href="/templates/contacto.html">Contacto</a></li> 
                    <li><a href="/index.html">Main</a></li>
                    <li><a href="/templates/productos.html">Productos</a></li>
                </ul>
            </nav>
            <div class="menu-btn">
                <i class="bi bi-list" id="bi-list"></i>
            </div>
            <a href="#foot" class="a-header">SleepCraft</a>
            <div class="user-info-container">
                <div class="user-info">
                    <div class="user-actions">
                        <div class="user-profile">
                            <span class="user-name">${datos.nombre}</span>
                            <img class="options-icon" src="/static/img/options_image.png" alt="Imagen de opciones" onclick="toggleOptions()">
                            <div class="options-container">
                                <ul class="user-options" id="user-options">
                                    <li><a href="/templates/pedidos.html">Pedidos</a></li>
                                    <li><a href="#" id="logout-link">Cerrar sesión</a></li>
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
    `;
    header.innerHTML = codigo;
}
function mostrarBtnDelNav() {
    let header = document.querySelector("header");
    let codigo = ` 
            <nav class="header-nav">
                <a href="/index.html">
                    <img src="../static/img/BEDSALE.png" alt="" class="logo">
                </a>
                <ul class="nav-list">
                    <li><a href="/templates/contacto.html">Contacto</a></li> 
                    <li><a href="/index.html">Main</a></li>
                    <li><a href="/templates/productos.html">Productos</a></li>
                </ul>
            </nav>
            <div class="menu-btn">
                <i class="bi bi-list" id="bi-list"></i>
            </div>
            <a href="#foot" class="a-header">SleepCraft</a>
            <div id="contenedor-btn-sesion"> 
                <a href="/templates/registrarse.html"><button class="btn-nav">Registrarse</button></a>
                <a href="/templates/iniciarSesion.html" ><button class="btn-nav">Iniciar sesión</button></a>
            </div>
    `;
    header.innerHTML = codigo;
}
async function traerDatosDeSession() {
    try {
        const response = await fetch('http://127.0.0.1:5000/traer_datos');
        const data = await response.json();
        return data
    } catch (error) {
        console.error('Error al obtener los datos:', error);
    }
    
}
async function verificarYActualizarInterfaz(data) {
    if (data.correo) {
        quitarBtnDelNav(data); // Si hay correo, quita los botones de navegación estándar
    } else {
        mostrarBtnDelNav(); // Si no hay correo, muestra los botones de navegación estándar
    }
}
async function registerUsuario(nombre, correo, contraseña, ciudad, direccion, telefono, tipoUsuario){
    try {
        const response = await fetch('http://127.0.0.1:5000/registrar', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ nombre, correo, contraseña, ciudad, direccion, telefono, tipoUsuario })
        });
        const data = await response.json();
        
        // Verificar la respuesta del servidor
        if (response.ok) {
            // Guardar el correo en localStorage
            guardarDataEnLocalStorage(data);
            await verificarYActualizarInterfaz(data);
            window.location.href = '/index.html'; // Cambia '/perfil.html' por la ruta deseada
            return data;
        } else {
            console.error('Error al iniciar sesión:', data.message); // Manejar el error según sea necesario
        }
        
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
    }
}
async function loginUsuario(correo, contraseña) {
    try {
        const response = await fetch('http://127.0.0.1:5000/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ correo, contraseña })
        });
        const data = await response.json();
        
        // Verificar la respuesta del servidor
        if (response.ok) {
            // Guardar el correo en localStorage
            guardarDataEnLocalStorage(data);
            await verificarYActualizarInterfaz(data);
            // Redirigir a otra página o realizar alguna acción después del inicio de sesión exitoso
            window.location.href = '/index.html'; // Cambia '/perfil.html' por la ruta deseada
            return data;
        } else {
            console.error('Error al iniciar sesión:', data.message); // Manejar el error según sea necesario
        }
        
    } catch (error) {
        console.error('Error en la solicitud de inicio de sesión:', error);
    }
}
function registrar_usuario(){
    const signupForm = document.getElementById('signupForm');
    if (signupForm) {
        signupForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo-electronico').value;
            const contraseña = document.getElementById('contraseña').value;
            const ciudad = document.getElementById('ciudad').value;
            const direccion= document.getElementById('direccion').value;
            const telefono= document.getElementById('telefono').value;
            const tipoUsuario= document.getElementById('codigoInput').value;
            // Llamar a la función para enviar los datos al servidor
            usuario =  registerUsuario(nombre, correo, contraseña, ciudad, direccion, telefono, tipoUsuario);
            verificarYActualizarInterfaz(usuario);
        });
    } else {
        console.error('Formulario de registro no encontrado.');
    }
}
// Función para crear la tabla de pedidos con selector de estado y botón guardar
function crearTablaPedidos(pedidos) {
    // Obtén el elemento donde deseas insertar la tabla
    let tabla = document.getElementById("tablaPedidos");
    // Define las opciones para el selector de estado
    let opcionesEstado = ["En proceso", "Entregado", "Cancelado"];  // Puedes agregar más opciones según sea necesario
    // Crea una variable para almacenar el HTML de la tabla
    let htmlTabla = '<table border="1">';
    htmlTabla += '<tr><th>n°</th><th>Cliente</th><th>Dirección</th><th>Ciudad</th><th>Descripción</th><th>Precio Total</th><th>Fecha de Compra</th><th>Estado</th><th>Guardar</th></tr>';
    // Itera sobre el array de pedidos
    for (let i = 0; i < pedidos.length; i++) {
        htmlTabla += '<tr>';
        htmlTabla += `<td>${i + 1}</td>`;  // Columna "n°" toma el valor de i + 1
        htmlTabla += `<td>${pedidos[i].cliente}</td>`;
        htmlTabla += `<td>${pedidos[i].direccion}</td>`;
        htmlTabla += `<td>${pedidos[i].ciudad}</td>`;
        htmlTabla += `<td>${pedidos[i].descripcion}</td>`;
        htmlTabla += `<td>${pedidos[i].precio_total}</td>`;
        htmlTabla += `<td>${pedidos[i].fecha_compra}</td>`;
        htmlTabla += `<td><select id="estado${i}">`;
        // Agrega opciones para el selector de estado
        for (let estado of opcionesEstado) {
            if (estado === pedidos[i].estado) {
                htmlTabla += `<option value="${estado}" selected>${estado}</option>`;
            } else {
                htmlTabla += `<option value="${estado}">${estado}</option>`;
            }
        }
        htmlTabla += '</select></td>';
        // Botón guardar
        htmlTabla += `<td><button onclick="guardarEstado(${i})">Guardar</button></td>`;
        htmlTabla += '</tr>';
    }
    htmlTabla += '</table>';
    // Asigna el HTML generado a la tabla en el documento
    tabla.innerHTML = htmlTabla;
}
function toggleOptions() {
    const optionsIcon = document.querySelector('.options-icon');
    const userOptions = document.querySelector('.user-options');
    let optionsVisible = false;

    // Función para mostrar u ocultar las opciones
    function toggleUserOptions(event) {
        event.stopPropagation(); // Evita que el evento se propague y cierre el menú inmediatamente
        if (!optionsVisible) {
            userOptions.classList.add('show');
            optionsVisible = true;
        } else {
            userOptions.classList.remove('show');
            optionsVisible = false;
        }
    }
    // Agregar event listener para el icono de opciones
    optionsIcon.addEventListener('click', toggleUserOptions);
    // Opcional: cerrar las opciones al hacer clic fuera de ellas
    document.addEventListener('click', (event) => {
        if (!userOptions.contains(event.target) && optionsVisible) {
            userOptions.classList.remove('show');
            optionsVisible = false;
        }
    });
}
async function traer_datos_pedidos() {
    try{
        const response = await fetch('http://127.0.0.1:5000/mostrar_pedidos', {
            method: 'GET',
            credentials: 'same-origin' // Incluir cookies si es necesario
        })
        const data = await response.json();
        if (response.ok) {
            crearTablaPedidos(data)
        }else{
            console.error('Error al obtener pedidos');
        }
    }
    catch (error) {
    console.error('Error en la solicitud de inicio de sesión:', error);
    }
}

async function realizarPedido(usuario, ciudad, direccion) {
    // Obtener ID del usuario desde el localStorage (suponiendo que está guardado allí)
    var userId = usuario.id;
    // Obtener la descripción del pedido
    var descripcion = carrito.map(producto => producto.obtenerInformacion()).join(', ');
    // Obtener la fecha actual
    var fechaActual = new Date().toISOString();
    // Obtener dirección y ciudad desde el formulario
    var direccion = usuario.direccion;
    var ciudad = usuario.ciudad;
    // Calcular el precio total
    var precioTotal = calcularPrecioTotal();
    // Crear objeto de pedido
    var pedido = {
        userId: userId,
        descripcion: descripcion,
        fecha: fechaActual,
        direccion: direccion,
        ciudad: ciudad,
        precioTotal: precioTotal
    };

    try {
        const response = await fetch('http://127.0.0.1:5000/pedidos', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(pedido)
        });

        if (!response.ok) {
            throw new Error('Error al realizar el pedido');
        }

        const data = await response.json();
        alert('Pedido realizado con éxito');
        
        // Limpiar el carrito
        carrito = [];
        guardarCarritoEnLocalStorage();
        mostrarProductosEnCarrito();
    } catch (error) {
        console.error('Error:', error);
        alert('Error al realizar el pedido. Por favor, intenta nuevamente.');
    }
}

document.addEventListener('DOMContentLoaded', async function() {
    
    var usuario = obtenerDataDelLocalStorage();
    // Verificar si hay usuario guardado en localStorage y actualizar la interfaz
    if (usuario && usuario.correo) {
        await verificarYActualizarInterfaz(usuario);
    } else {
        mostrarBtnDelNav(); // Mostrar botones de navegación estándar si no hay usuario en localStorage
    }
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        loginForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Evitar que el formulario se envíe automáticamente
            const correo = document.getElementById('correo').value;
            const contraseña = document.getElementById('contraseña').value;
            // Llamar a la función para enviar los datos al servidor
            usuario =  loginUsuario(correo, contraseña);
            verificarYActualizarInterfaz(usuario);
        });
    } else {
        console.error('Formulario de inicio de sesión no encontrado.');
    }
    // Función para mostrar u ocultar el menú de opciones
    const optionsIcon = document.querySelector('.options-icon');
    if (optionsIcon) {
        optionsIcon.addEventListener('click', toggleOptions);
    } else {
        console.error('Elemento options-icon no encontrado.');
    }
    //
    const btnregistrarse = document.getElementById('boton-registrarse');
    if (btnregistrarse) {
        btnregistrarse.addEventListener("click", function(){
            registrar_usuario();
        });
    }
    else {
        console.error('Elemento boton-registrarse no encontrado.');
    }
    const btnRegistrarAdmin= document.getElementById('btnRegistrarAdmin');
    if (btnRegistrarAdmin) {
        btnRegistrarAdmin.addEventListener("click", function(event) {
            event.preventDefault();
            Swal.fire({
                title: 'Debe ingresar un codigo',
                input: 'text',
                inputPlaceholder: 'Codigo',
                showCancelButton: true,
                confirmButtonText: 'Enviar',
                cancelButtonText: 'Cancelar',
                preConfirm: (codigo) => {
                    if (!codigo) {
                        Swal.showValidationMessage('Debe ingresar un codigo');
                    } else {
                        return codigo;
                    }
                }
            }).then(async (result) => {
                if (result.isConfirmed) {
                    const codigo = result.value;
                    const isAdmin = await compararCodigoAdmin(codigo);
                    if (isAdmin) {
                        Swal.fire('Nuevo administrador!');
                        document.querySelector('#codigoInput').value = true;
                    } else {
                        Swal.fire('Codigo incorrecto.');
                        document.querySelector('#codigoInput').value = false;
                    }
                    registrar_usuario();
                }
            });
        });
    }
    else {
        console.error('Elemento boton-registrarse no encontrado.');
    }
    
    // Selección del enlace de pedidos
    const pedidosLink = document.getElementById('pedidos-link');
    if (pedidosLink) {
        if (window.location.href.includes("pedidos.html")) {
            traer_datos_pedidos();
        }
        pedidosLink.addEventListener('click', function(event) {
            window.location.href = '/pedidos.html';
        });
    }
    if (window.location.href.includes("compras.html")) {
        var compraForm = document.getElementById("comprarForm");
        var nombreField = document.getElementById("nombre");
        var telefonoField = document.getElementById("telefono");
        var emailField = document.getElementById("email");
        var ciudadField = document.getElementById("ciudad");
        var direccionField = document.getElementById("direccion");
        if (compraForm && nombreField && telefonoField && emailField && direccionField && ciudadField) {
        // Mostrar datos del usuario si están disponibles
        
            if (usuario) {
                console.error(usuario);
                nombreField.value = usuario.nombre || '';
                telefonoField.value = usuario.telefono || '';
                emailField.value = usuario.correo || '';
                direccionField.value = usuario.direccion || '';
                ciudadField.value = usuario.ciudad || '';
            }
            compraForm.addEventListener('submit', function(event) {
                event.preventDefault(); // Evitar el envío automático del formulario
                realizarPedido(usuario, ciudadField, direccionField);
            });
            } else {
                console.error('Algunos campos del formulario no fueron encontrados.');
            }
    }
    else {
        console.error('Formulario de compra no encontrado.');
    }
    // Manejo del botón de compra
    var comprarBtn = document.getElementById('comprar-btn');
    if (comprarBtn) {
        comprarBtn.addEventListener('click', function() {
            if (carrito.length > 0) {
                //Enviar al usuario a la pagina de compra
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
    var formContacto = document.getElementById("formularioContacto");
    if (formContacto){
        formContacto.addEventListener("submit", function(event) {
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
            if (telefono === "") {
                mostrarAlerta("Por favor, introduzca un telefono.");
                return;
            }
            if (email === "") {
                mostrarAlerta("Por favor, introduzca un email.");
                return;
            }
            // Aquí enviarías el formulario o realizarías alguna otra acción
            alert("Formulario enviado correctamente.");
        });        
    }
    // Llamada a la función para obtener el carrito desde el localStorage al cargar la página
    obtenerCarritoDesdeLocalStorage();
    function registrar_usuario(){
        const signupForm = document.getElementById('signupForm');
        if (signupForm) {
                // Evitar que el formulario se envíe automáticamente
            const nombre = document.getElementById('nombre').value;
            const correo = document.getElementById('correo-electronico').value;
            const contraseña = document.getElementById('contraseña').value;
            const ciudad = document.getElementById('ciudad').value;
            const direccion= document.getElementById('direccion').value;
            const telefono= document.getElementById('telefono').value;
            const tipoUsuario= document.getElementById('codigoInput').value;
            // Llamar a la función para enviar los datos al servidor
            usuario =  registerUsuario(nombre, correo, contraseña, ciudad, direccion, telefono, tipoUsuario);
            verificarYActualizarInterfaz(usuario);
        } else {
            console.error('Formulario de registro no encontrado.');
        }
    }
    async function compararCodigoAdmin(codigoIngresado) {
        try {
            const response = await fetch('http://127.0.0.1:5000/codigo');
            const data = await response.json();
            if (data['codigo'] == codigoIngresado)
            {
                resultado = true;
            }
            else{
                resultado = false;
            }
        } catch (error) {
            console.error('Error al obtener los datos:', error);
        }
        return resultado
    }
    const logoutLink = document.getElementById('logout-link');
    logoutLink.addEventListener('click', function(event) {
        event.preventDefault(); // Prevenir el comportamiento por defecto del enlace
        // Hacer la solicitud GET a la API /logout
        fetch('http://127.0.0.1:5000/logout', {
            method: 'GET',
            credentials: 'same-origin' // Incluir cookies si es necesario
        })
        .then(response => {
            if (!response.ok) {
                throw new Error('Error al cerrar sesión');
            }
            return response.json(); // Si la respuesta es un JSON
        })
        .then(data => {
            // Borrar el usuario del localStorage
            eliminarDataDelLocalStorage();
            console.log('Usuario eliminado del localStorage');
            // Redirigir a otra página o actualizar la interfaz según necesites
            window.location.href = '/index.html'; 
        })
        .catch(error => {
            console.error('Error:', error);
            // Manejar el error, mostrar un mensaje al usuario, etc.
        });
    });
    
});

// Creacion de la lista de productos "Carrito"
var carrito = [];
function mostrarAlerta(mensaje) {
    alert(mensaje);
}
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
function validarCodigoRegistroAdmin(codigoIngresado){
    if (codigoIngresado == codigoAdmin){
        resultado = true;
    }
    else{
        resultado = false;
    }
    return resultado
}
