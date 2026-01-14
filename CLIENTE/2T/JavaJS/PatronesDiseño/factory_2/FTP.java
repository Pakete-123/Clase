package factory_2;

public class FTP implements Database {

  @Override
  public void connect() {
    System.out.println("Conexión a FTP exitosa");
  }

  @Override
  public void close() {
    System.out.println("Recursos de FTP cerrados");
  }

  public void get(String file) {
    System.out.println("Se ha recogido correctamente el archivo: " + file);
  }

}
