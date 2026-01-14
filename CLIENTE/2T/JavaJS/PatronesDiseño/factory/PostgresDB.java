public class PostgresDB implements Database {

  @Override
  public void connect() {

    System.out.println("Conexión a Postgres exitosa.");

  }

  @Override
  public void query(String sql) {

    System.out.println("Consulta ejecutada en PostgresSQL: " + sql);

  }

  @Override
  public void close() {

    System.out.println("Recursos de BBDD PostgresSQL cerrados");

  }

}
