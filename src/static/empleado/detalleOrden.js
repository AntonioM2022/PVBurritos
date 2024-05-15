document.addEventListener('DOMContentLoaded', function() {
    cargarDatos();
});

function cargarDatos() {
    fetch('http://127.0.0.1:5000/datos/ordenes')
        .then(response => response.json())
        .then(data => {
            const ordenesAgrupadas = agruparOrdenesPorNombre(data);
            actualizarTabla(ordenesAgrupadas);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function agruparOrdenesPorNombre(ordenes) {
    const agrupadas = {};

    ordenes.forEach(orden => {
        const nombreCliente = orden.nombre_cliente;
        if (!agrupadas[nombreCliente]) {
            agrupadas[nombreCliente] = {
                nombre_cliente: nombreCliente,
                telefono: orden.telefono,
                ordenes: []
            };
        }
        agrupadas[nombreCliente].ordenes.push({
            numero_Orden: orden.numero_Orden,
            producto: orden.producto,
            cantidad: orden.cantidad,
            estado: 'pendiente'  // Suponiendo que el estado inicial es 'pendiente'
        });
    });

    return Object.values(agrupadas);
}

function actualizarTabla(datos) {
    const tabla = document.querySelector('table');

    datos.forEach(grupo => {
        grupo.ordenes.forEach((orden, index) => {
            const fila = tabla.insertRow();

            const celdaNoOrden = fila.insertCell();
            celdaNoOrden.textContent = orden.numero_Orden;

            if (index === 0) { // Insertar nombre y teléfono solo una vez por grupo
                const celdaNombre = fila.insertCell();
                celdaNombre.textContent = grupo.nombre_cliente;
                celdaNombre.rowSpan = grupo.ordenes.length;

                const celdaTelefono = fila.insertCell();
                celdaTelefono.textContent = grupo.telefono;
                celdaTelefono.rowSpan = grupo.ordenes.length;
            }

            const celdaProducto = fila.insertCell();
            celdaProducto.textContent = orden.producto;

            const celdaCantidad = fila.insertCell();
            celdaCantidad.textContent = orden.cantidad;

            const celdaEstado = fila.insertCell();
            const checkbox = document.createElement('input');
            checkbox.type = 'checkbox';
            checkbox.checked = orden.estado === 'completado'; // Suponiendo que el estado puede ser 'completado' para marcar el checkbox
            celdaEstado.appendChild(checkbox);
        });
    });
}