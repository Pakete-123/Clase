public class DatabaseFactory {

  /**
   * Definimos un método estático para crear los objetos correspondientes
   * 
   * @param type
   * @return instancia que implementa el interface Database
   */
  public static Database create(String type) {

    if ("mysql".equalsIgnoreCase(type)) {
      return new MySqlDB();

    } else if ("oracle".equalsIgnoreCase(type)) {
      return new OracleDB();

    } else if ("postgressql".equalsIgnoreCase(type)) {
      return new PostgresDB();
    }

    // Si no coincide con ninguna de las implementadas, lanzamos una excepión
    // indicando que no se soporta esa BBDD
    throw new IllegalArgumentException("DB no soportada: " + type);
  }

}
