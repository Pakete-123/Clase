public class OracleDB implements Database {

  @Override
  public void connect() {

    System.out.println("Conexión a Oracle exitosa.");

  }

  @Override
  public void query(String sql) {

    System.out.println("Consulta ejecutada en Oracle: " + sql);

  }

  @Override
  public void close() {

    System.out.println("Recursos de BBDD Oracle cerrados");

  }

}
