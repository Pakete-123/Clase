package factory_2;

public class DBFactory {

  public static Database create(String method) {

    if ("mysql".equalsIgnoreCase(method)) {
      return new MySQL();
    } else if ("ftp".equalsIgnoreCase(method)) {
      return new FTP();
    } else if ("webservice".equalsIgnoreCase(method)) {
      return new WebService();
    }

    throw new IllegalArgumentException("Operación imposible");
  }

}
