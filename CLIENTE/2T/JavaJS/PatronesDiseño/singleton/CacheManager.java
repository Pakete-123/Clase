package singleton;

import java.util.HashMap;
import java.util.Map;

/**
 * 
 * CacheManager: gestor de cache utilizand el patron singleton
 * 
 * Este patron tiene como caracteristica principal que trabaja con una unica
 * instancia
 * donde se encuentran los datos.
 * 
 * 
 * Implementar algunos metodos pra acceder a la cache (Metodo put, get, has,
 * delete, clear, size).
 */

public class CacheManager<K, V> {
    // Necesitamos una unica instancia global, compartida con todos los usuarios.

    private static CacheManager<?, ?> instance;

    /**
     * 
     * Metodo que retorna la instancia unica
     * 
     * @return retorna la instancia compartida.
     * 
     */

    // Esta anotacion me evita errores de conexion en tiempo de compilacion con los
    // tipos.
    // Es interesante ponerlo para las clases/atributos que utilizan tipos
    // genericos.

    @SuppressWarnings("unchecked")
    public static synchronized <K, V> CacheManager<K, V> getInstance() {
        if (instance == null) {
            // No existe ninguna, entonces se crea
            instance = new CacheManager<>();
        }
        // Si ya hay instancia creada, la retorno.
        return (CacheManager<K, V>) instance;

    }

    /**
     * Pongo el constructor privado para evitar que desde un main se haga un new
     */

    private CacheManager() {

    }

    // Creamos el almacen para los datos

    private final Map<K, V> store = new HashMap<>();

    // Operaciones a realizar con la cache

    /**
     * Metodo para añadir una entrada en la cache
     * 
     * @param key   clave que identifica la entrada
     * @param value valor de la entrada
     * 
     */
    public synchronized void put(K key, V value) {
        store.put(key, value);
    }

    /**
     * Metodo para obtener el valor de una entrada en la cache
     * 
     * @param key clave que identifica la entrada de la que quiero obtener su valor
     * @return el valor de la entrada
     * 
     */
    public V get(K key) {
        return store.get(key);
    }

    /**
     * Metodo que retorna true si la key esta en la cache, false en caso contrario.
     * 
     * @param key clave de la que quiero saber si esta en la cache
     * @return true o false, si esta o no.
     * 
     */
    public synchronized boolean has(K key) {
        return store.containsKey(key);
    }

    /**
     * Metodo para borrar una entrada de la cache por su key
     * 
     * @param key
     * 
     * 
     */
    public synchronized void delete(K key) {
        if (has(key)) {
            store.remove(key);
        }
    }

    /**
     * Metodo para dar el tamaño del map store.
     * 
     */
    public synchronized int size() {
        return store.size();
    }

    /**
     * Metodo para borrar todos los elementos del store
     * 
     */
    public synchronized void clear() {
        store.clear();
    }

    public synchronized void replace(K key, V value) {
        if (has(key)) {
            store.replace(key, value);
        }
    }

}