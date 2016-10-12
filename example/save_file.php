<?php

move_uploaded_file($_FILES["file"]["tmp_name"], $_FILES["file"]["name"]);

header('Content-Type: application/json;charset=utf-8');

echo '{"success": true, "msg": "Arquivo salvo em: ' . __DIR__ . '"}';