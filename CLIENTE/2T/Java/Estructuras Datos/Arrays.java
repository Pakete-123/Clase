// import java.util.ArrayList;
import java.util.LinkedList;
import java.util.List;

public class Arrays {

  public static void main(String[] args) {

    // 1. ArrayList:
    // Creamos un arrayList de elementos de tipo String.
    // Utilizamos List para poder convertir si fuera necesario a otro tipo de List.

    // List<String> arrayStringList = new ArrayList<>();
    List<String> arrayStringList = new LinkedList<>();
    // Insertamos en el Array con add
    arrayStringList.add("Juan");
    arrayStringList.add("Pepe");
    arrayStringList.add("Ana");

    // Consultar
    String str = arrayStringList.get(0);
    System.out.println("El elemento de la posición 0 es: " + str);

    // Modificar
    arrayStringList.set(0, "Juan Modificado");

    // Consultamos el elemento modificado
    System.out.println("Tras la modificación, el de la posición 0 es: " + arrayStringList.get(0));

    // Borrado
    String strDel = arrayStringList.remove(0);
    System.out.println("El elemento de la posición 0 " + strDel + " ha sido eliminado.");

    // Recorremos el array
    int size = arrayStringList.size();
    for (int i = 0; i < size; i++) {
      System.out.println("El elemento de la posición " + i + " es " + arrayStringList.get(i));
    }



  }

}