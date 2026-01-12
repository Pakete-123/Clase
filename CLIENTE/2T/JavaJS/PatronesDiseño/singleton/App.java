package singleton;

public class App {
    public static void main(String[] args) {
        CacheManager<String, String> cache = CacheManager.getInstance();

        System.out.println("Numero de elementos en la cache: " + cache.size());

        cache.put("user:1", "Rafa");
        cache.put("user:2", "Lucia");
        cache.put("user:3", "Ñoñek");

        System.out.println(cache.get("user:1"));
        System.out.println(cache.get("user:2"));
        System.out.println(cache.get("user:3"));

        System.out.println("Modifico un elemento de la caché---------");
        cache.replace("user:3", "Paquito");
        System.out.println(cache.get("user:1"));
        System.out.println(cache.get("user:2"));
        System.out.println(cache.get("user:3"));

        System.out.println("Numero de elementos en la cache: " + cache.size());

        System.out.println("Borro un elemento de la cache");
        cache.delete("user:3");

        System.out.println("Numero de elementos en la cache: " + cache.size());

        System.out.println("Limpiamos la cache");

        cache.clear();

        System.out.println("Numero de elementos en la cache: " + cache.size());

    }
}