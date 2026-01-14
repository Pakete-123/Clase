package factory_2;

public class WebService implements Database {

  @Override
  public void connect() {
    System.out.println("Conexión a WebService exitosa");
  }

  @Override
  public void close() {
    System.out.println("Recursos de WebService cerrados");
  }

  public void execute(String exe) {
    System.out.println("Se ha ejecutado correctamente la aplicación: " + exe);
  }
}
