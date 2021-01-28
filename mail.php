<?php
require_once('ParseEnv.php');

(new ParseEnv(__DIR__ . '/.env'))->load();

$recipient = getenv('RECIPIENT_EMAIL');

if ($_SERVER['REQUEST_METHOD'] === "POST") {
  $response = [];

  if (empty($_POST['name'])) {
    $response['errors']['empty_name'] = 'Пожалуйста, введите имя';
  } else {
    $name = $_POST['name'];
  }

  if (empty($_POST['phone'])) {
    $response['errors']['empty_phone'] = 'Пожалуйста, введите номер телефона';
  } elseif (!preg_match('/^(\+7|7|8)?[\s\-]?\(?[489][0-9]{2}\)?[\s\-]?[0-9]{3}[\s\-]?[0-9]{2}[\s\-]?[0-9]{2}$/i', $_POST['phone'])) {
    $response['errors']['incorrect_phone'] = 'Пожалуйста, введите корректный номер телефона';
  } else {
    $phone = $_POST['phone'];
  }

  if (empty($_POST['email'])) {
    $response['errors']['empty_email'] = 'Пожалуйста, введите email';
  } elseif (!filter_var($_POST['email'], FILTER_VALIDATE_EMAIL)) {
    $response['errors']['incorrect_email'] = 'Пожалуйста, введите корректный email';
  } else {
    $email = $_POST['email'];
  }

  if ($_POST['agree'] === 'false') {
    $response['errors']['empty_agree'] = 'Пожалуйста, отметьте данный пункт';
  }

  if (empty($_POST['service'])) {
    $response['errors']['empty_service'] = 'Пожалуйста, выберите услугу';
  } else {
    $service = $_POST['service'];
  }

  if (empty($response['errors'])) {
    $headers = array(
      'From' => $email,
      'Reply-To' => $email,
      'MIME-Version' => '1.0',
      'Content-Type'=> 'text/html; charset=utf-8'
    );

    $subject = "Заказ услуги $service с сайта smmzoom.ru";

    $emailBody = "
      <html lang='ru'>
      <body>
        <p>Добрый день! Меня зовут $name, и я хотел бы заказать у вас следующую услугу: <b>$service</b></p>

        <br><br>

        <p>С уважением, $name</p>
        <p>Телефон для связи: $phone</p>
      </body>
      </html>
    ";

    $isSent = false;

    if (mail($recipient, $subject, $emailBody, $headers)) {
      $isSent = true;
    }

    if ($isSent) {
      $response['success'] = 'Спасибо, что написали нам!';
    }
  }

  echo json_encode($response);
}
