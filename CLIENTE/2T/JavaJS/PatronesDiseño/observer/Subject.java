package observer;

import java.util.ArrayList;
import java.util.List;

/**
 * Esta clase implementa el rol de Sujeto (objeto observable) del patrón
 * Observer
 * Mantienela lista de observadores y ofrece operaciones de suscripción, baja y
 * notificación
 */
public class Subject {

  // Lista que almacena los observadores
  private final List<ObserverObj> observers = new ArrayList<>();

  /**
   * Método público que permite suscribir a un Observador
   * 
   * @param o
   */
  public void subscribe(ObserverObj o) {
    observers.add(o);
  }

  /**
   * Método público para dar de baja a un observador
   * 
   * @param o
   */
  public void unsubscribe(ObserverObj o) {
    observers.remove(0);
  }

  /**
   * Método que notifica a todos los observadores el cambio producido.
   * En este caso el cambio
   * 
   * @param value
   */
  public void notifyAllObservers(int value) {
    for (ObserverObj o : observers) {
      o.update(value);
    }
  }
}
