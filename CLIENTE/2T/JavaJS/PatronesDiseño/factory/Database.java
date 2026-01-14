/**
 * Interface que define los métodos que tendrán que implementar cada una de las
 * clases de BBDD
 */

public interface Database {

  /**
   * Realiza la conexión con la BBDD
   */
  public void connect();

  /**
   * Ejecuta la sentencia sql en la BBDD
   * 
   * @param sql un String con la sentencia sql a ejecutar
   */
  public void query(String sql);

  /**
   * Cierra los recursos y la conexión con la BBDD
   */
  public void close();

}
