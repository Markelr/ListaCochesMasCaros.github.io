// Datos de Productos
const products = [
    { id: 1, name: "Ferrari Enzo", price: 50000, image: "img/FerrariEnzo.jpg" },
    { id: 2, name: "Lamborghini Diablo", price: 35000, image: "img/LDiablo.jpg" },
    { id: 3, name: "Mercedes Benz 300SL", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 4, name: "", price: 50000, image: "img/FerrariEnzo.jpg" },
    { id: 5, name: "", price: 35000, image: "img/LDiablo.jpg" },
    { id: 6, name: "", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 7, name: "", price: 50000, image: "img/FerrariEnzo.jpg" },
    { id: 8, name: "", price: 35000, image: "img/LDiablo.jpg" },
    { id: 9, name: "", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 10, name: "", price: 50000, image: "img/FerrariEnzo.jpg" },
    { id: 11, name: "", price: 35000, image: "img/LDiablo.jpg" },
    { id: 12, name: "", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 13, name: "", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 14, name: "", price: 40000, image: "img/MercedesBenz300SL.jpg" },
    { id: 15, name: "Mercedes Benz 300SL", price: 40000, image: "img/MercedesBenz300SL.jpg" },
  ];
  
  // Estado del Carrito
  let cart = [];
  let exchangeRates = { EUR: 1, USD: 1.1, GBP: 0.9 };
  let selectedCurrency = "EUR";
  
  // Renderizar Productos
  const productList = document.getElementById("productList");
  products.forEach((product) => {
    const productCard = document.createElement("div");
    productCard.classList.add("product-card");
    productCard.innerHTML = `
      <h3>${product.name}</h3>
      <img src="${product.image}" alt="${product.name}">
      <p>${product.price} €</p>
      <input type="number" min="1" value="1" id="quantity-${product.id}">
      <button onclick="addToCart(${product.id})">Añadir al carrito</button>
    `;
    productList.appendChild(productCard);
  });
  
  // Añadir al Carrito
  function addToCart(productId) {
    const product = products.find((p) => p.id === productId);
    const quantity = parseInt(document.getElementById(`quantity-${product.id}`).value);
    const existingItem = cart.find((item) => item.id === productId);
  
    if (existingItem) {
      existingItem.quantity += quantity;
    } else {
      cart.push({ ...product, quantity });
    }
    alert(`${product.name} añadido al carrito.`);
  }
  
  // Mostrar Carrito
  const cartSidebar = document.getElementById("cartSidebar");
  const viewCartBtn = document.getElementById("viewCartBtn");
  const closeSidebar = document.getElementById("closeSidebar");
  
  viewCartBtn.addEventListener("click", () => {
    renderCart();
    cartSidebar.classList.add("active");
  });
  
  closeSidebar.addEventListener("click", () => {
    cartSidebar.classList.remove("active");
  });
  
  // Renderizar Carrito
  function renderCart() {
    const cartItems = document.getElementById("cartItems");
    const totalAmount = document.getElementById("totalAmount");
    cartItems.innerHTML = "";
    let total = 0;
  
    cart.forEach((item) => {
      const subtotal = item.price * item.quantity * exchangeRates[selectedCurrency];
      total += subtotal;
      const listItem = document.createElement("li");
      listItem.textContent = `${item.name} x ${item.quantity} = ${subtotal.toFixed(2)} ${selectedCurrency}`;
      cartItems.appendChild(listItem);
    });
  
    totalAmount.textContent = `Total: ${total.toFixed(2)} ${selectedCurrency}`;
  }
  
  // Manejar Cambio de Moneda
  const currencySelector = document.getElementById("currency");
  currencySelector.addEventListener("change", (e) => {
    selectedCurrency = e.target.value;
    renderCart();
  });
  
  // Actualizar Tasas de Cambio (Simulación)
  setInterval(() => {
    exchangeRates = {
      EUR: 1,
      USD: 1.1 + Math.random() * 0.1,
      GBP: 0.9 + Math.random() * 0.1,
    };
  }, 10000);
  