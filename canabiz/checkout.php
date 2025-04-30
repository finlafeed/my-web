<?php
if ($_SERVER["REQUEST_METHOD"] == "POST") {
    // รับข้อมูลจาก JavaScript
    $cart = json_decode($_POST['cart'], true);
    
    //อันนี้ตัวแปร/ กำหนดการเชื่อมต่อฐานข้อมูล
    $servername = "localhost";
    $username = "root";
    $password = "";
    $dbname = "shop_db";
    
    // เชื่อมต่อกับฐานข้อมูล
    $conn = new mysqli($servername, $username, $password, $dbname);
    
    if ($conn->connect_error) {
        die("Connection failed: " . $conn->connect_error);
    }

    // บันทึกข้อมูลการสั่งซื้อ
    foreach ($cart as $item) {
        $name = $item['name'];
        $price = $item['price'];

        $sql = "INSERT INTO orders (product_name, price) VALUES ('$name', $price)";
        if (!$conn->query($sql)) {
            echo "Error: " . $sql . "<br>" . $conn->error;
        }
    }

    $conn->close();

    echo "Order placed successfully";
} else {
    echo "Invalid request";
}
?>
