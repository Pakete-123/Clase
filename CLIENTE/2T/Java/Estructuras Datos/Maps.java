
import java.util.HashMap;
import java.util.Iterator;
import java.util.Map;
import java.util.Set;

public class Maps {

  public static void main(String[] args) {

    // Maps
    Map<String, String> map = new HashMap<>();

    // Insertar
    System.out.println("Insertamos 3 pares K-V");
    map.put("F0", "Juan0");
    map.put("F1", "Juan1");
    map.put("F2", "Juan2");

    // Modificar
    // Puedo utilizar put o replace siempre y cuando se utilice la misma clave que
    // la que tenga el elemento que queramos modificar
    System.out.println("Modificamos el valor de 'F0'");
    map.replace("F0", "Juan0Mod");
    System.out.println("---------");

    // Eliminar
    System.out.println("Eliminamos la clave 'F2'");
    map.remove("F2");
    System.out.println("---------");

    // Mostrar
    String val = map.get("F0");
    System.out.println("El valor de la clave 'F0' es: " + val);

    // Almaceno las claves en un Set
    Set<String> keysSet = map.keySet();

    // Creo un Iterator para ese conjunto de claves
    Iterator<String> keysIt = keysSet.iterator();
    String key;
    while (keysIt.hasNext()) {
      key = keysIt.next();
      System.out.println("Para la clave " + key + " el valor es " + map.get(key));
    }

  }

}
