package facade;

import java.util.HashMap;

public class Storage {

  private int i = 0;
  private HashMap<Integer, String[]> storage = new HashMap<>();

  public void save(String usr, String email) {

    this.i++;
    String array[] = { usr, email };
    this.storage.put(this.i, array);

  }

}
