public class MySqlDB implements Database {

  @Override
  public void connect() {

    System.out.println("Conexión a MySQL exitosa.");

  }

  @Override
  public void query(String sql) {

    System.out.println("Consulta ejecutada en MySQL: " + sql);

  }

  @Override
  public void close() {

    System.out.println("Recursos de BBDD MySQL cerrados");

  }

}
