package observer;

/**
 * Clase de inicio con un ejemplo de uso del patrón.
 * Crearemos dos observers (UI y LOGGER) suscrito a un contador observable
 */
public class Main {

  public static void main(String[] args) {

    // 1.- Creamos una instancia de nuestro contador
    Counter counter = new Counter();

    // 2.- Creamos el observador 1
    ObserverObj ui = new ObserverObj() {
      @Override
      public void update(int v) {
        System.out.println("UI -> Valor: " + v);
      }
    };

    // 3.- Creamos el observador 2
    ObserverObj logger = new ObserverObj() {
      @Override
      public void update(int nuevoValor) {
        System.out.println("[LOGGER] -> valor: " + nuevoValor);
      }
    };

    // 4.- Los suscribo
    counter.subscribe(ui);
    counter.subscribe(logger);

    // 5.- Invocamos a increment para notificar a los observadores
    counter.increment();
    counter.increment();

  }

}
