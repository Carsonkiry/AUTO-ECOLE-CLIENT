<?php 

$dbHost = "localhost";
$dbUser = "root";
$dbPassword = "";
$dbName = "contactme";

try {
  $dsn = "mysql:host=" . $dbHost . ";dbname=" . $dbName;
  $pdo = new PDO($dsn, $dbUser, $dbPassword);
} catch(PDOException $e) {
  echo "Erreur à la connexion à la bdd " . $e->getMessage();
}

$status = "";
if($_SERVER['REQUEST_METHOD'] == 'POST') {
  $name = $_POST['name'];
  $email = $_POST['email'];
  $message = $_POST['message'];

  if(empty($name) || empty($email) || empty($message)) {
    $status = "Tous les champs sont obligatoires.";
  } else {
    if(strlen($name) >= 255 || !preg_match("/^[a-zA-Z-'\s]+$/", $name)) {
      $status = "Veuillez entrer un nom valide";
    } else if(!filter_var($email, FILTER_VALIDATE_EMAIL)) {
      $status = "Veuillez entrer une adresse électronique valide";
    } else {

      $sql = "INSERT INTO contactinfo (name, email, message) VALUES (:name, :email, :message)";

      $stmt = $pdo->prepare($sql);
      
      $stmt->execute(['name' => $name, 'email' => $email, 'message' => $message]);

      $status = "Votre message à était envoyé avec succès !";
      $name = "";
      $email = "";
      $message = "";
    }
  }

}

?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <meta http-equiv="X-UA-Compatible" content="ie=edge">
  <link href="https://fonts.googleapis.com/css?family=Roboto" rel="stylesheet">
  <link rel="stylesheet" href="style.css">
  <title>Contactez-nous</title>
</head>

<body>

  <div class="container">
    <h1>Contactez-nous</h1>

    <form action="" method="POST" class="main-form">
      <div class="form-group">
        <label for="name">Nom complet</label>
        <input type="text" name="name" id="name" class="gt-input"
          value="<?php if($_SERVER['REQUEST_METHOD'] == 'POST') echo $name ?>">
      </div>

      <div class="form-group">
        <label for="email">Email</label>
        <input type="text" name="email" id="email" class="gt-input"
          value="<?php if($_SERVER['REQUEST_METHOD'] == 'POST') echo $email ?>">
      </div>

      <div class="form-group">
        <label for="message">Votre message </label>
        <textarea name="message" id="message" cols="30" rows="10"
          class="gt-input gt-text"><?php if($_SERVER['REQUEST_METHOD'] == 'POST') echo $message ?></textarea>
      </div>

      <input type="submit" class="gt-button" value="Envoyer">

      <div class="form-status">
        <?php echo $status ?>
      </div>
    </form>
  </div>

  <script src="main.js"></script>

</body>

</html>