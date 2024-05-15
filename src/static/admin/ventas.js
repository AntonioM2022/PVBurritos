let sumaTotal = 0; // Define la variable sumaTotal en un ámbito global para poder usarla

function cargarDatos(fechaFiltro) {
    fetch('http://127.0.0.1:5000/datos/ordenes')
        .then(response => response.json())
        .then(data => {
            if (fechaFiltro) {
                data = filtrarPorFecha(data, fechaFiltro);
            }
            actualizarTabla(data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function filtrarPorFecha(datos, fechaFiltro) {
    return datos.filter(orden => {
        const fechaOrden = formatearFecha(orden.fecha);
        return fechaOrden === fechaFiltro;
    });
}

function actualizarTabla(datos) {
    const tabla = document.querySelector('table tbody'); // Cambiado a tbody para evitar problemas con thead
    tabla.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas
    sumaTotal = 0; // Reinicia sumaTotal

    datos.forEach(orden => {
        const fila = tabla.insertRow();
        const celdaFecha = fila.insertCell();
        celdaFecha.textContent = formatearFecha(orden.fecha);
        const celdaOrden = fila.insertCell();
        celdaOrden.textContent = orden.numero_Orden;
        const celdaCliente = fila.insertCell();
        celdaCliente.textContent = orden.nombre_cliente;
        const totalOrden = fila.insertCell();
        totalOrden.textContent = `$${orden.total_orden}`;
        sumaTotal += orden.total_orden;
    });
    const totalSuma = document.getElementById('totalSuma');
    totalSuma.textContent = `Total de Ordenes: $${sumaTotal}`;
}

function formatearFecha(fecha) {
    const fechaObj = new Date(fecha);
    fechaObj.setMinutes(fechaObj.getMinutes() + fechaObj.getTimezoneOffset());
    const opciones = { year: 'numeric', month: '2-digit', day: '2-digit' };
    return fechaObj.toLocaleDateString('es-ES', opciones);
}

const buscarFecha = document.getElementById('buscarFecha');
buscarFecha.addEventListener('click', function() {
    const fechaInput = document.getElementById('fecha').value;
    const fechaFiltro = formatearFecha(new Date(fechaInput));
    cargarDatos(fechaFiltro);
});

cargarDatos(); // Carga inicial sin filtro
