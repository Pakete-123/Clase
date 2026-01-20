package observer;

public class Counter extends Subject {
  private int value = 0;

  /**
   * Incrementa el contador y notifica
   */
  public void increment() {
    this.value++;
    notifyAllObservers(value);
  }

  public int getValue() {
    return this.value;
  }
}
