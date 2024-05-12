class DevelopmentConfig():
    DEBUG = True
    #parametros conexion a la base de datos
    MYSQL_HOST = 'localhost'
    MYSQL_USER = 'root'
    MYSQL_PASSWORD = ''
    MYSQL_DB = 'burritos_final'

config = {
    'development': DevelopmentConfig
}
