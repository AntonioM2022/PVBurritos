let submitButton = document.getElementById('agregarBtn');

submitButton.addEventListener('click', async (event) => {
    event.preventDefault();

    const formData = {
        asada: document.getElementById('asada').value,
        barbacoa: document.getElementById('barbacoa').value,
        chicharron: document.getElementById('chicharron').value,
        rojo: document.getElementById('rojo').value,
        verde: document.getElementById('verde').value,
        coca: document.getElementById('coca').value,
        sprite: document.getElementById('sprite').value,
        squirt: document.getElementById('squirt').value,
        manzanita: document.getElementById('manzanita').value,
        mirinda: document.getElementById('mirinda').value,
        salsa: document.getElementById('salsa').value,
        curtido: document.getElementById('curtido').value,
        queso: document.getElementById('queso').value,
        nombre: document.getElementById('nombre').value,
        telefono: document.getElementById('telefono').value
    };

    function obtenerProductos() {
        const productos = [];
        const catalogo = [
            { id: 30, cantidad: formData.asada },
            { id: 3, cantidad: formData.barbacoa },
            { id: 31, cantidad: formData.chicharron },
            { id: 32, cantidad: formData.rojo },
            { id: 33, cantidad: formData.verde },
            { id: 34, cantidad: formData.coca },
            { id: 35, cantidad: formData.sprite },
            { id: 36, cantidad: formData.squirt },
            { id: 37, cantidad: formData.manzanita },
            { id: 38, cantidad: formData.mirinda },
            { id: 39, cantidad: formData.salsa },
            { id: 40, cantidad: formData.curtido },
            { id: 41, cantidad: formData.queso }
        ];

        catalogo.forEach(item => {
            if (item.cantidad != 0) {
                productos.push({ producto: item.id, cantidad: item.cantidad });
            }
        });
        return productos;
    }

    const productos = obtenerProductos();
    const fecha = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD

    productos.forEach(producto => {
        const usuarioData = {
            nombre: formData.nombre,
            telefono: formData.telefono,
            fecha: fecha,
            producto: producto.producto,
            cantidad: producto.cantidad,
            total: 0  // Asumiendo que se calcula en el servidor o se ignora
        };

        const opciones = {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify(usuarioData)
        };

        fetch('http://127.0.0.1:5000/empleado/orden', opciones)
            .then(response => {
                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }
                alert("Orden creada correctamente");
                return response.json();
            })
            .then(data => console.log(data))
            .catch(error => console.error('Error:', error));
    });
});
