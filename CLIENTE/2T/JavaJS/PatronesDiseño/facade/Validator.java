package facade;

public class Validator {

  public boolean validator(String usr, String email) {

    if (email.contains("@") && email.contains(".com")) {
      return true;
    }

    return false;

  }

}
