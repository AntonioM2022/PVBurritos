// Obtener los valores de los inputs
let usernameInput = document.getElementById('usuario');
let passwordInput = document.getElementById('contraseña');
let submitButton = document.getElementById('entrar');


const url= 'http://127.0.0.1:5000/iniciosesion'
submitButton.addEventListener('click', async (event) => {
    event.preventDefault();
    fetch(url)
    .then(response => response.json())
    .then(data => {
        console.log(data);
        let username = usernameInput.value;
        let password = passwordInput.value;
    
        if (username === "" || password === "") {
            alert("Por favor, ingrese su usuario y contraseña");
            return;
        }
    
        let isUserValid = false; // Variable para rastrear si encontramos una coincidencia
        let tipo=0;
        data.forEach(element => {
            console.log(username);
            console.log(password);
            console.log(element.nombre);
            console.log(element.contrasena);
            if (username == element.nombre && password == element.contrasena) {
                isUserValid = true; // Si encontramos una coincidencia, establecemos esto como verdadero
                console.log('si se encontro el usuario')
                tipo= element.tipo;
                }

        });
    
        if (isUserValid) {
            alert("El usuario y la contraseña son correctos");
            if (tipo == 1) {
            window.location.replace('http://127.0.0.1:5000/admin');
            console.log(tipo);
            } else {
            // window.location.replace('http://...');
            console.log(tipo);
            }
        } else {
            alert("El usuario y la contraseña son incorrectos");
        }
    })
    .catch(error => {
        console.error('Error fetching data: ', error);
    });

});

