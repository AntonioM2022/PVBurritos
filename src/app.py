from flask import Flask, jsonify, render_template, request
from config import config
from flask_mysqldb import MySQL
from flask_cors import CORS
from flask import send_from_directory


app = Flask(__name__)
CORS(app)
conexion = MySQL(app)

#ruta para obetner todos los datos de la base con un get
@app.route('/datos/iniciosesion', methods= {'GET'}) #esto es la ruta defualt
def usuarios():
    try:
        cursor = conexion.connection.cursor()
        sql='SELECT nombre, contrasena, tipo FROM users'
        cursor.execute(sql)
        datos = cursor.fetchall()
        usuarios = []
        for fila in datos:
            usuario={'nombre':fila[0], 'contrasena':fila[1], 'tipo':fila[2]}
            usuarios.append(usuario)
        return jsonify(usuarios) 
    except Exception as ex:
        return 'No se puede obtener los usuarios'
    
@app.route('/datos/ordenes', methods=['GET'])
def ordenes():
    cursor = None
    try:
        cursor = conexion.connection.cursor()
        sql = """
        SELECT 
            orden.idorden,
            orden.nombre AS nombre_cliente,
            orden.telefono,
            orden.fecha,
            productos.nombre AS nombre_producto,
            orden.cantidad,
            productos.precio AS precio_individual,
            productos.precio * orden.cantidad AS total_calculado
        FROM orden
        JOIN productos ON orden.producto = productos.idproductos
        """
        cursor.execute(sql)
        datos = cursor.fetchall()
        ordenes = []
        for fila in datos:
            orden = {
                'numero_Orden': fila[0],
                'nombre_cliente': fila[1],
                'telefono': fila[2],
                'fecha': fila[3],
                'producto': fila[4],
                'cantidad': fila[5],
                'precio_producto': fila[6],
                'total_orden': fila[7]
            }
            ordenes.append(orden)
        return jsonify(ordenes)
    except Exception as ex:
        return jsonify({'error': 'No se puede obtener los datos de las ordenes', 'exception': str(ex)}), 500
    finally:
        if cursor:
            cursor.close()

@app.route('/datos/ultimaOrden', methods=['GET'])
def ultimaOrden():
    cursor = None
    try:
        cursor = conexion.connection.cursor()
        sql = 'SELECT MAX(idorden) AS idorden FROM orden;'
        cursor.execute(sql)
        datos = cursor.fetchall()
        ordenes = []
        for fila in datos:
            orden = {
                'numero_Orden': fila[0]
                
            }
            ordenes.append(orden)
        return jsonify(ordenes)
    except Exception as ex:
        return jsonify({'error': 'No se puede obtener los datos de las ordenes', 'exception': str(ex)}), 500
    finally:
        if cursor:
            cursor.close()


#Ruta de los post
@app.route('/enviar/producto', methods= {'POST'}) 
def crearProducto():
    try:
        #print (request.json)
        cursor= conexion.connection.cursor()
        sql = """INSERT INTO productos (nombre, precio, tipo) VALUES('{0}', {1}, {2})""".format(request.json['nombre'], request.json['precio'], request.json['tipo'])
        cursor.execute(sql)
        conexion.connection.commit()#confirma la accion de insertar
        return jsonify({'mensaje': "Producto creado"})
    except Exception as ex:
        return 'No se pudo enviar la orden'

@app.route('/enviar/orden', methods= {'POST'}) 
def crearOrden():
    try:
        #print (request.json)
        cursor= conexion.connection.cursor()
        sql = """INSERT INTO orden (nombre, telefono, fecha, producto, cantidad, total) VALUES('{0}', {1}, '{2}', '{3}', {4}, {5})""".format(request.json['nombre'], request.json['telefono'], request.json['fecha'], request.json['producto'], request.json['cantidad'], request.json['total'])
        cursor.execute(sql)
        conexion.connection.commit()#confirma la accion de insertar
        return jsonify({'mensaje': "Orden creada"})
    except Exception as ex:
        return 'No se pudo enviar la orden'
    


        
"""""
@app.route('/enviar/usuario', methods= {'POST'}) 
def crearUsuario():
    try:
        #print (request.json)
        cursor= conexion.connection.cursor()
        sql = INSERT INTO users(nombre, apellido, email, contrasena, tipo)  VALUES ('{0}','{1}', '{2}', {3}, {4}).format(request.json['nombre'], request.json['apellido'], request.json['email'], request.json['contrasena'], request.json['tipo'])
        cursor.execute(sql)
        conexion.connection.commit()#confirma la accion de insertar
        return jsonify({'mensaje': "Usuario creado"})
    except Exception as ex:
        return 'No se pudo crear el usuario'
"""
#rutas para los renders de los html
@app.route('/sesion', methods=['GET', 'POST'])
def sesion():
    return render_template('index.html')

#rutas admin
@app.route('/admin/ventas')
def ventas():
    return render_template('admin/ventas.html')

@app.route('/admin/usuarios', methods=['GET', 'POST'])
def usrs():
    if request.method == 'POST':
        
        try:
            cursor= conexion.connection.cursor()
            sql = """INSERT INTO users(nombre, apellido, email, contrasena, tipo)  VALUES ('{0}','{1}', '{2}', {3}, {4})""".format(request.json['nombre'], request.json['apellido'], request.json['email'], request.json['contrasena'], request.json['tipo'])
            cursor.execute(sql)
            conexion.connection.commit()#confirma la accion de insertar
            return jsonify({'mensaje': "Usuario creado"})
        except Exception as ex:
                    return 'No se pudo crear el usuario'
    else:
        # Para solicitudes GET, simplemente renderiza la página HTML
        return render_template('admin/usuarios.html')


#rutas empleados
@app.route('/empleado/orden', methods=['GET', 'POST'])
def orden():
    if request.method == 'POST':
        try:
            cursor= conexion.connection.cursor()
            sql = """INSERT INTO orden (nombre, telefono, fecha, producto, cantidad, total) VALUES('{0}', {1}, '{2}', '{3}', {4}, {5})""".format(request.json['nombre'], request.json['telefono'], request.json['fecha'], request.json['producto'], request.json['cantidad'], request.json['total'])
            cursor.execute(sql)
            conexion.connection.commit()
            return jsonify({'mensaje': "Orden creada"})
        except Exception as ex:
            return ('No se pudo enviar la orden')
    else:
        return render_template('empleado/orden.html')

@app.route('/empleado/detalleOrden')
def detalleOrden():
    return render_template('empleado/detalleOrden.html')

@app.route('/empleado/cierre')
def cierre():
    return render_template('empleado/cierre.html')




#para cuando ponga el usuario un url que no existe
def pagina_no_encontrada(error):
    return '<h1>La pagina que buscas no existe</h1>'


if __name__ == '__main__':
    app.config.from_object(config['development'])
    app.register_error_handler(404, pagina_no_encontrada)
    app.run()