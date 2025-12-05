
import java.util.HashSet;
import java.util.Iterator;
import java.util.Set;

public class Sets {

  public static void main(String[] args) {
    

    Set<String> etiqSet = new HashSet<>();

    // Insertar
    System.out.println("Insertamos 3 etiquetas");
    etiqSet.add("java");
    etiqSet.add("javascript");
    etiqSet.add("typescript");
    System.out.println("---------");

    // Modificar / Eliminar
    // En un set no hay índices para modificarlo, necesito eliminarlo y luego añadirlo con la modificación
    System.out.println("Modificamos una etiqueta");
    if (etiqSet.remove("javascript")) {
      etiqSet.add("Mod JavaScript");
    }
    System.out.println("---------");


    // Consulta
    System.out.println("Mediante un Iterator, recorremos el Set");
    Iterator<String> it = etiqSet.iterator();
    while (it.hasNext()) {
      System.out.println(it.next());
    }

  }
}
