
/**
 * Calcula el precio Total.
 */
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
