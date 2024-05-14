let submitButton = document.getElementById('crear');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault(); // Previene el envío tradicional del formulario

    // Recolectar los datos del formulario
    const nombre = document.getElementById('nombre').value;
    const apellidos = document.getElementById('apellidos').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const tipo = document.getElementById('tipo').value;
    console.log(nombre, apellidos, email, password, tipo);

    if(nombre === "" || apellidos === "" || email === "" || password === "" || tipo === ""){    
        alert("Por favor, llene todos los campos");
        return;
    }
    // Crear el objeto de datos
    const usuarioData = {
        nombre: nombre,
        apellido: apellidos,
        email: email,
        contrasena: password,  // Asegúrate de que la clave coincide con lo que el servidor espera
        tipo: tipo
    };
    

   // Opciones para la solicitud fetch
const opciones = {
    method: 'POST',
    headers: {
        'Content-Type': 'application/json'  // Importante para decirle al servidor que envías JSON
    },
    body: JSON.stringify(usuarioData)  // Convertir el objeto de datos a una cadena JSON
};

// Enviar los datos usando fetch a la URL del servidor donde se gestionan los usuarios
fetch('http://127.0.0.1:5000/admin/usuarios', opciones)
.then(response => {
    if (!response.ok) {
        throw new Error('Network response was not ok');
    }
    alert("Usuario creado correctamente");
    return response.json();
})
.then(data => console.log(data))
.catch(error => console.error('Error:', error));

});
