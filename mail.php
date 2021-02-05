<?php
require_once('ParseEnv.php');

(new ParseEnv(__DIR__ . '/.env'))->load();

$tg_token = getenv('TELEGRAM_TOKEN');
$tg_chatid = getenv('TELEGRAM_CHATID');

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
    $isSent = false;

    $data = [
      'chat_id' => $tg_chatid,
      'text' =>
      "Здравствуйте! Меня зовут <b>$name</b>, и я хотел бы заказать у вас следующую услугу: <b>$service</b>" . PHP_EOL .
      PHP_EOL .
      "С уважением, $name". PHP_EOL .
      "Email для связи: $email" . PHP_EOL .
      "Телефон для связи: $phone",
      'parse_mode' => 'HTML'
    ];

    $resp = file_get_contents("https://api.telegram.org/bot" . $tg_token . "/sendMessage?" . http_build_query($data));

    if ($resp) {
      $isSent = true;
    }

    if ($isSent) {
      $response['success'] = 'Спасибо, что написали нам!';
    } else {
      $response['errors']['smth_wrong'] = 'Что-то пошло не так, попробуйте снова';
    }
  }

  echo json_encode($response);
}
