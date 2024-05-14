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
    const tabla = document.querySelector('table');
   

    // Asumiendo que los datos son un array de objetos como el ejemplo que diste
    datos.forEach(orden => {
        const fila = tabla.insertRow();
        const celdaFecha = fila.insertCell();
        celdaFecha.textContent = formatearFecha(orden.fecha);
        const celdaOrden = fila.insertCell();
        celdaOrden.textContent = orden.numero_Orden;
        const celdaCliente = fila.insertCell();
        celdaCliente.textContent = orden.nombre_cliente;
        const celdaTotal = fila.insertCell();
        celdaTotal.textContent = orden.total_orden;
    });
}

function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fechaObj.toLocaleDateString('es-ES', opciones);
}
