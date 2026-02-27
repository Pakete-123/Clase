# Patrones de Diseño de Software

## Índice

1. [Singleton](#1-singleton)
2. [Facade](#2-facade)
3. [Módulo (Revealing Module)](#3-módulo-revealing-module)
4. [Factory (Simple / Method)](#4-factory-simple--method)
5. [Observer (Pub–Sub)](#5-observer-pubsub)

---

## 1. Singleton

### Definición

Garantiza que en toda la aplicación exista una **única instancia** de un determinado objeto y que haya un punto de acceso global para obtenerla.

### Ejemplo

```javascript
class AppConfig {
  constructor() {
    this.theme = 'dark';
    this.language = 'es';
  }

  static getInstance() {
    if (!AppConfig.instance) {
      AppConfig.instance = new AppConfig();
    }
    return AppConfig.instance;
  }
}

const config1 = AppConfig.getInstance();
const config2 = AppConfig.getInstance();

console.log(config1 === config2); // true → es la misma instancia
config1.theme = 'light';
console.log(config2.theme); // 'light' → porque son el mismo objeto
```

### ✅ Ventajas

| Ventaja | Descripción |
|---|---|
| Instancia única garantizada | Evita inconsistencias por duplicación de estado. |
| Punto de acceso claro | API simple y predecible: `Singleton.getInstance()`. |
| Ahorro de recursos | Útil cuando la inicialización es costosa (p. ej., conexión a BD). |

### ❌ Desventajas

| Desventaja | Descripción |
|---|---|
| Acoplamiento global | La instancia se usa "por todas partes", dificultando los tests. |
| Difícil de testear en aislamiento | El estado persiste entre pruebas si no se resetea manualmente. |
| Riesgo de "cajón de sastre" | Si se abusa, puede acumular responsabilidades que no le corresponden. |

---

## 2. Facade

### Definición

Proporciona una **interfaz simple y unificada** a un conjunto de funcionalidades internas complejas, reduciendo el acoplamiento entre el cliente y los subsistemas.

### Ejemplo

```javascript
class AuthService {
  validate(user, pass) { return user === 'admin' && pass === '1234'; }
}
class SessionStorage {
  save(user) { console.log(`Sesión guardada para: ${user}`); }
}
class UIManager {
  showDashboard() { console.log('Mostrando dashboard...'); }
}

// La Facade que orquesta todo
class LoginFacade {
  constructor() {
    this.auth = new AuthService();
    this.session = new SessionStorage();
    this.ui = new UIManager();
  }

  login(user, pass) {
    if (!this.auth.validate(user, pass)) {
      console.log('Credenciales incorrectas');
      return;
    }
    this.session.save(user);
    this.ui.showDashboard();
  }
}

// El cliente solo conoce esto:
const facade = new LoginFacade();
facade.login('admin', '1234');
// → Sesión guardada para: admin
// → Mostrando dashboard...
```

### ✅ Ventajas

| Ventaja | Descripción |
|---|---|
| Simplifica el uso | El cliente interactúa con una sola interfaz en lugar de múltiples subsistemas. |
| Reduce el acoplamiento | El cliente no necesita conocer los detalles internos. |
| Centraliza decisiones | Nombres, flujos y validaciones en un único lugar. |

### ❌ Desventajas

| Desventaja | Descripción |
|---|---|
| Riesgo de "objeto dios" | Si acumula demasiadas responsabilidades, se convierte en un cuello de botella. |
| Ocultación excesiva | Puede esconder errores relevantes que el cliente debería conocer. |
| Capa extra sin valor | Si la fachada no simplifica nada realmente, solo añade complejidad. |

---

## 3. Módulo (Revealing Module)

### Definición

Agrupa variables y funciones relacionadas, mantiene un **estado interno privado** y expone solo la API pública que otros necesitan.

### Ejemplo

```javascript
const CartModule = (() => {
  // Estado privado — nadie fuera puede tocarlo directamente
  let items = [];

  function add(product) {
    items.push(product);
    console.log(`Añadido: ${product.name}`);
  }

  function remove(productId) {
    items = items.filter(p => p.id !== productId);
  }

  function getTotal() {
    return items.reduce((sum, p) => sum + p.price, 0);
  }

  // Solo se revela lo que el exterior necesita
  return { add, remove, getTotal };
})();

CartModule.add({ id: 1, name: 'Teclado', price: 80 });
CartModule.add({ id: 2, name: 'Ratón', price: 40 });
console.log(CartModule.getTotal()); // 120
console.log(CartModule.items);      // undefined → está protegido
```

### ✅ Ventajas

| Ventaja | Descripción |
|---|---|
| Encapsulación real | El estado interno no es accesible desde el exterior. |
| Sin contaminación global | Evita conflictos de nombres en el ámbito global. |
| API pequeña y coherente | Fácil de documentar, entender y probar. |

### ❌ Desventajas

| Desventaja | Descripción |
|---|---|
| Dificulta los tests | El estado interno no inyectable complica las pruebas unitarias. |
| Tendencia a crecer | Sin disciplina, el módulo acumula responsabilidades (viola el SRP). |
| Menos flexible | No puede extenderse como una clase; hay que reescribir para añadir comportamiento. |

---

## 4. Factory (Simple Factory / Factory Method)

### Definición

Patrón para **crear objetos sin exponer la lógica concreta de construcción**. El cliente solicita un objeto que cumpla una interfaz y la fábrica decide qué clase instanciar.

### Ejemplo

```javascript
class FetchClient {
  request(url) { console.log(`Fetch → ${url}`); }
}

class MockClient {
  request(url) { console.log(`Mock → ${url} (respuesta simulada)`); }
}

// La fábrica decide qué crear según el entorno
class HttpClientFactory {
  static create(env) {
    if (env === 'production') return new FetchClient();
    if (env === 'test')       return new MockClient();
    throw new Error(`Entorno desconocido: ${env}`);
  }
}

// El cliente nunca hace "new FetchClient()" directamente
const client = HttpClientFactory.create('test');
client.request('/api/users');
// → Mock → /api/users (respuesta simulada)
```

### ✅ Ventajas

| Ventaja | Descripción |
|---|---|
| Centraliza la construcción | Los cambios en cómo se crea un objeto se hacen en un solo lugar. |
| Desacopla al cliente | El cliente no depende de clases concretas, solo de la interfaz. |
| Facilita el testing | Se puede inyectar una implementación mock sin modificar el cliente. |

### ❌ Desventajas

| Desventaja | Descripción |
|---|---|
| Complejidad extra innecesaria | Si solo hay una implementación, la fábrica no aporta valor real. |
| Proliferación de clases | Un abuso del patrón genera muchas clases de "pegamento" difíciles de seguir. |
| Menor visibilidad | Es menos obvio qué tipo concreto se está usando en un momento dado. |

---

## 5. Observer (Pub–Sub)

### Definición

Define un **emisor (sujeto)** que notifica eventos y varios **observadores** que reaccionan sin conocerse entre sí. Base del modelo de eventos y la comunicación desacoplada en el cliente.

### Ejemplo

```javascript
class EventEmitter {
  constructor() {
    this.listeners = {};
  }

  on(event, callback) {
    if (!this.listeners[event]) this.listeners[event] = [];
    this.listeners[event].push(callback);
  }

  off(event, callback) {
    this.listeners[event] = this.listeners[event].filter(cb => cb !== callback);
  }

  emit(event, data) {
    (this.listeners[event] || []).forEach(cb => cb(data));
  }
}

const emitter = new EventEmitter();

// Varios observadores reaccionan al mismo evento
emitter.on('new-order', order => console.log(`📦 Almacén: preparando pedido #${order.id}`));
emitter.on('new-order', order => console.log(`📧 Email enviado al cliente ${order.customer}`));
emitter.on('new-order', order => console.log(`📊 Analytics: registrando venta`));

// El emisor no sabe quién escucha ni qué hacen
emitter.emit('new-order', { id: 42, customer: 'María' });
// → 📦 Almacén: preparando pedido #42
// → 📧 Email enviado al cliente María
// → 📊 Analytics: registrando venta
```

### ✅ Ventajas

| Ventaja | Descripción |
|---|---|
| Desacoplamiento total | El emisor no conoce a sus observadores ni depende de ellos. |
| Escalabilidad | Se pueden añadir nuevos observadores sin modificar el emisor. |
| Reutilización | Los observadores pueden suscribirse a múltiples emisores independientemente. |

### ❌ Desventajas

| Desventaja | Descripción |
|---|---|
| Difícil de depurar | Con muchos eventos, el flujo de ejecución se vuelve difícil de seguir. |
| Fuga de memoria | Si los observadores no se desuscriben correctamente, permanecen en memoria. |
| Pérdida de trazabilidad | Sin una buena documentación de tópicos y contratos, el sistema se vuelve opaco. |

---

## Resumen Comparativo

| Patrón | Propósito principal | Ventaja clave | Riesgo principal |
|---|---|---|---|
| **Singleton** | Una sola instancia global | Consistencia de estado | Acoplamiento global |
| **Facade** | Simplificar interfaz compleja | Reduce acoplamiento con subsistemas | Puede convertirse en "objeto dios" |
| **Módulo** | Encapsular estado y API | Privacidad y cohesión | Módulos gigantes difíciles de mantener |
| **Factory** | Delegar creación de objetos | Desacopla al cliente de clases concretas | Complejidad innecesaria en casos simples |
| **Observer** | Notificar cambios de forma desacoplada | Escalabilidad sin modificar el emisor | Fugas de memoria y depuración difícil |
