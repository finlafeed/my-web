let cart = [];

function addToCart(id, name, price) {
    cart.push({ id, name, price });
    displayCart();
}

function displayCart() {
    const cartDiv = document.getElementById("cart");
    cartDiv.innerHTML = "<h3>ตะกร้าของคุณ</h3>";

    if (cart.length === 0) {
        cartDiv.innerHTML += "<p>ไม่มีสินค้าในตะกร้า</p>";
    } else {
        let total = 0;
        cart.forEach(item => {
            cartDiv.innerHTML += `<p>${item.name} - ${item.price} บาท</p>`;
            total += item.price;
        });
        cartDiv.innerHTML += `<p>รวมทั้งหมด: ${total} บาท</p>`;
        cartDiv.innerHTML += `<button onclick="checkout()">ดำเนินการสั่งซื้อ</button>`;
    }
}

function checkout() {
    // ส่งข้อมูลตะกร้าไปยัง PHP
    const xhr = new XMLHttpRequest();
    xhr.open("POST", "checkout.php", true);
    xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
    xhr.send("cart=" + JSON.stringify(cart));

    xhr.onload = function() {
        if (xhr.status == 200) {
            alert("การสั่งซื้อสำเร็จ");
            cart = [];
            displayCart();
        }
    };
}