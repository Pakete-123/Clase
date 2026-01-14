package factory_2;

public class FactoryDemo {

  public static void main(String[] args) {

    Database db = DBFactory.create("mysql");
    db.connect();
    ((MySQL) db).query("SELECT * FROM alumnos");
    db.close();

    db = DBFactory.create("ftp");
    db.connect();
    ((FTP) db).get("holaMundo.png");
    db.close();

    db = DBFactory.create("webservice");
    db.connect();
    ((WebService) db).execute("DSII:SOTFS.exe");
    db.close();

  }

}
