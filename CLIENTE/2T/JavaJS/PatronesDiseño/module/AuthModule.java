package module;

public class AuthModule {

  // Quiero ocultar al API este atributo por ser oculto para el usuario
  private String token = null;

  public boolean login(String user, String pass) {
    // Si el usr y pass son correctas, creo u token y devuelvo true indicando que el
    // usuario está autenticado

    if ("admin".equals(user) && "1234".equals(pass)) {
      this.token = "tok_" + System.nanoTime();
      return true;
    }
    return false;
  }

  public void logout() {
    this.token = null;
  }

  public boolean isAuthenticated() {
    return this.token != null;
  }

}
