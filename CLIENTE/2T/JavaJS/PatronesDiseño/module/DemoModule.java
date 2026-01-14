package module;

public class DemoModule {

  public static void main(String[] args) {

    AuthModule auth = new AuthModule();
    System.out.println(auth.isAuthenticated());
    System.out.println(auth.login("admin", "1234"));
    System.out.println(auth.isAuthenticated());
    auth.logout();
    System.out.println(auth.isAuthenticated());

  }

}
