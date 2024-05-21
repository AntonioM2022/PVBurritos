function cargarDatos() {
    fetch('http://127.0.0.1:5000/datos/usrs')
        .then(response => response.json())
        .then(data => {
            actualizarTabla(data);
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

function actualizarTabla(datos) {
    const tabla = document.querySelector('table tbody'); // Asegúrate de seleccionar tbody
    tabla.innerHTML = ''; // Limpia la tabla antes de agregar nuevas filas

    datos.forEach(usuario => {
        const fila = tabla.insertRow();
        const celdaNombre = fila.insertCell();
        celdaNombre.textContent = usuario.nombre;
        const celdaApellido = fila.insertCell();
        celdaApellido.textContent = usuario.apellido;
        const celdaEmail = fila.insertCell();
        celdaEmail.textContent = usuario.email;
        const celdaContraseña = fila.insertCell();
        celdaContraseña.textContent = usuario.contrasena;
        const celdaTipo = fila.insertCell();
        celdaTipo.textContent = usuario.tipo;

        // Crear celda para los botones de editar y eliminar
        const celdaAcciones = fila.insertCell();
        const botonEditar = document.createElement('button');
        botonEditar.textContent = 'Editar';
        botonEditar.onclick = () => editarUsuario(usuario);

        const botonEliminar = document.createElement('button');
        botonEliminar.textContent = 'Eliminar';
        botonEliminar.onclick = () => eliminarUsuario(usuario.idusers);

        celdaAcciones.appendChild(botonEditar);
        celdaAcciones.appendChild(botonEliminar);
    });
}

function editarUsuario(usuario) {
    // Lógica para editar usuario
    alert('Editando usuario: ' + JSON.stringify(usuario));
}

function eliminarUsuario(id) {
    // Lógica para eliminar usuario
    alert('Eliminando usuario con ID: ' + id);
}

cargarDatos();
