document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('http://127.0.0.1:5000/datos/ordenes')
        .then(response => response.json())
        .then(data => {
            actualizarTabla(data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function actualizarTabla(datos) {
    const tabla = document.querySelector('table tbody'); // Asegúrate de seleccionar tbody
    let sumaTotal = 0;
    const hoy = new Date().toDateString(); // Obtener la fecha actual en formato legible

    datos.forEach(dato => {
        const fechaOrden = new Date(dato.fecha).toDateString(); // Convertir la fecha de la orden a formato legible

        if (fechaOrden === hoy) {
            const fila = tabla.insertRow();

            const celdaNoOrdenes = fila.insertCell();
            celdaNoOrdenes.textContent = dato.numero_Orden;

            const producto = fila.insertCell();
            producto.textContent = dato.producto;

            const cantidad = fila.insertCell();
            cantidad.textContent = dato.cantidad;

            const totalOrden = fila.insertCell();
            totalOrden.textContent = `$${dato.total_orden}`;
            sumaTotal += dato.total_orden;
        }
    });

    const totalSuma = document.getElementById('totalSuma');
    totalSuma.textContent = `Total de Ordenes: $${sumaTotal}`;
}
