document.addEventListener('DOMContentLoaded', function() {
    const p = document.querySelector('h3');
    cargarDatos(p);
});

function cargarDatos(p) {
    fetch('http://127.0.0.1:5000/datos/ultimaOrden')
        .then(response => response.json())
        .then(data => {
            num = data[0].numero_Orden;
            console.log(num);
            p.textContent = num + 1;
        })
        .catch(error => console.error('Error al cargar los datos:', error));
}

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
            { id: 30, nombre: 'Asada', cantidad: formData.asada },
            { id: 3, nombre: 'Barbacoa', cantidad: formData.barbacoa },
            { id: 31, nombre: 'Chicharrón', cantidad: formData.chicharron },
            { id: 32, nombre: 'Rojo', cantidad: formData.rojo },
            { id: 33, nombre: 'Verde', cantidad: formData.verde },
            { id: 34, nombre: 'Coca', cantidad: formData.coca },
            { id: 35, nombre: 'Sprite', cantidad: formData.sprite },
            { id: 36, nombre: 'Squirt', cantidad: formData.squirt },
            { id: 37, nombre: 'Manzanita', cantidad: formData.manzanita },
            { id: 38, nombre: 'Mirinda', cantidad: formData.mirinda },
            { id: 39, nombre: 'Salsa', cantidad: formData.salsa },
            { id: 40, nombre: 'Curtido', cantidad: formData.curtido },
            { id: 41, nombre: 'Queso', cantidad: formData.queso }
        ];

        catalogo.forEach(item => {
            if (item.cantidad != 0) {
                productos.push({ id: item.id, nombre: item.nombre, cantidad: item.cantidad });
            }
        });
        return productos;
    }

    const productos = obtenerProductos();
    const fecha = new Date().toISOString().split('T')[0];  // Formato YYYY-MM-DD

    const enviarOrden = async (producto) => {
        const usuarioData = {
            nombre: formData.nombre,
            telefono: formData.telefono,
            fecha: fecha,
            producto: producto.id,
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

        try {
            const response = await fetch('http://127.0.0.1:5000/empleado/orden', opciones);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            console.log(await response.json());
        } catch (error) {
            console.error('Error:', error);
        }
    };

    Promise.all(productos.map(enviarOrden))
        .then(() => {
            alert("Orden creada correctamente");
            mostrarResumen(formData, productos);
        })
        .catch(error => {
            console.error('Error al enviar las órdenes:', error);
        });
});

function mostrarResumen(formData, productos) {
    const resumen = `
        <h2>Resumen de la Orden</h2>
        <p><strong>Nombre:</strong> ${formData.nombre}</p>
        <p><strong>Teléfono:</strong> ${formData.telefono}</p>
        <p><strong>Fecha:</strong> ${new Date().toLocaleDateString('es-ES')}</p>
        <h3>Productos</h3>
        <ul>
            ${productos.map(producto => `<li>${producto.nombre}: ${producto.cantidad}</li>`).join('')}
        </ul>
    `;
    const resumenVentana = window.open('', '', 'width=600,height=400');
    resumenVentana.document.write(resumen);
    resumenVentana.document.close();

    // Agrega un botón para recargar la página
    const imprimirBtn = resumenVentana.document.createElement('button');
    imprimirBtn.textContent = 'Imprimir Orden';
    const recargarBtn = resumenVentana.document.createElement('button');
    recargarBtn.textContent = 'Aceptar y Recargar';
    recargarBtn.onclick = () => {
        resumenVentana.close();
        window.location.reload();
    };
    resumenVentana.document.body.appendChild(recargarBtn);
    resumenVentana.document.body.appendChild(imprimirBtn);
}
