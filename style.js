console.log("Snack Fit Website Loaded Successfully");

/* ================= CART ================= */

let cart = JSON.parse(localStorage.getItem("snackCart")) || [];

const cartButtons = document.querySelectorAll(".card button");
const cartDisplay = document.getElementById("cart-count");

cartDisplay.innerText = cart.length;

cartButtons.forEach((button) => {

  button.addEventListener("click", () => {

    const card = button.parentElement;

    const productName = card.querySelector("h3").innerText;

    const productPrice = parseInt(
      card.querySelector("p").innerText.replace("₹", "")
    );
 const existingItem = cart.find(item => item.name === productName);

    if(existingItem){
      existingItem.quantity += 1;
    }
    else{
      cart.push({
        name: productName,
        price: productPrice,
        quantity:1
      });
    }

    localStorage.setItem("snackCart", JSON.stringify(cart));

    updateCart();

  });

});
function updateCart() {

  const cartItems = document.getElementById("cart-items");
  const cartTotal = document.getElementById("cart-total");
  const discountText = document.getElementById("discount");
  const finalPrice = document.getElementById("final-price");

  cartDisplay.innerText = cart.reduce((sum,item)=>sum+item.quantity,0);

  cartItems.innerHTML = "";

  let total = 0;
  let prices = [];

  cart.forEach((item,index) => {

    total += item.price * item.quantity;

    for(let i=0;i<item.quantity;i++){
      prices.push(item.price);
    }
     cartItems.innerHTML += `
      <div class="cart-item">

        <div>
          <h4>${item.name}</h4>
          <p>₹${item.price}</p>
        </div>

        <div class="qty-box">
          <button onclick="decreaseQty(${index})">-</button>
          <span>${item.quantity}</span>
          <button onclick="increaseQty(${index})">+</button>
        </div>

        <button class="remove-btn" onclick="removeItem(${index})">
          Remove
        </button>

      </div>
    `;

  });
   prices.sort((a,b)=>a-b);

  let discount = 0;

  for(let i=0;i<prices.length;i+=2){

    if(prices[i+1]){
      discount += prices[i];
    }

  }

  const finalAmount = total - discount;

  cartTotal.innerText = total;
  discountText.innerText = discount;
  finalPrice.innerText = finalAmount;

  localStorage.setItem("snackCart", JSON.stringify(cart));

}
function removeItem(index){

  cart.splice(index,1);
  updateCart();

}

function increaseQty(index){

  cart[index].quantity++;
  updateCart();

}

function decreaseQty(index){

  if(cart[index].quantity > 1){
    cart[index].quantity--;
  }
  else{
    cart.splice(index,1);
  }
   updateCart();

}

updateCart();

/* ================= EMPTY CART ================= */

const emptyCartBtn = document.getElementById("empty-cart");

emptyCartBtn.addEventListener("click",()=>{

  cart = [];
  updateCart();

});

/* ================= CHECKOUT ================= */

const checkoutBtn = document.getElementById("checkout-btn");

checkoutBtn.addEventListener("click",()=>{
alert("Order Placed Successfully!");

});

/* ================= CART POPUP ================= */

const cartIcon = document.getElementById("cart-icon");
const cartPopup = document.getElementById("cartPopup");
const closeCart = document.getElementById("closeCart");

cartIcon.addEventListener("click", () => {

  cartPopup.style.display = "flex";

});

closeCart.addEventListener("click", () => {

  cartPopup.style.display = "none";

});

/* ================= ABOUT POPUP ================= */

const readMoreBtn = document.querySelector(".about-content button");
const aboutPopup = document.getElementById("aboutPopup");
const closeAbout = document.getElementById("closeAbout");

readMoreBtn.addEventListener("click", () => {

  aboutPopup.style.display = "flex";

});

closeAbout.addEventListener("click", () => {

  aboutPopup.style.display = "none";

});

/* ================= LOGIN POPUP ================= */

const loginBtn = document.getElementById("login-btn");
const loginPopup = document.getElementById("loginPopup");
const closeLogin = document.getElementById("closeLogin");
loginBtn.addEventListener("click",()=>{

  loginPopup.style.display = "flex";

});

closeLogin.addEventListener("click",()=>{

  loginPopup.style.display = "none";

});

/* ================= LOGIN VALIDATION ================= */

const loginSubmit = document.getElementById("login-submit");

loginSubmit.addEventListener("click", () => {

  const email = document
    .getElementById("login-email")
    .value;

  const password = document
    .getElementById("login-password")
    .value;

  // EMAIL VALIDATION

  if(email === ""){

    alert("Please enter email");

    return;

  }

  if(!email.includes("@")){

    alert("Email must contain @ character");

    return;

  }

  if(!email.includes(".com")){

    alert("Email must contain .com");

    return;

  }

  // PASSWORD VALIDATION

  if(password === ""){

    alert("Please enter password");

    return;

  }

  if(password.length < 6){

    alert("Password must be at least 6 characters");

    return;

  }

  // SUCCESS

  alert("Login Successful!");

  loginPopup.style.display = "none";

});

/* ================= SEARCH ================= */

const searchBox = document.querySelector(".search-box");
const searchBtn = document.getElementById("search-btn");
const searchInput = document.getElementById("search-input");
const cards = document.querySelectorAll(".card");

searchBtn.addEventListener("click",()=>{

  searchBox.classList.toggle("active");
  });

searchInput.addEventListener("keyup",()=>{

  const value = searchInput.value.toLowerCase();

  cards.forEach(card=>{

    const product = card.querySelector("h3").innerText.toLowerCase();

    if(product.includes(value)){

      card.style.display = "block";

    }
    else{

      card.style.display = "none";

    }

  });

});

/* ================= DARK MODE ================= */

const darkBtn = document.getElementById("dark-mode-btn");

darkBtn.addEventListener("click",()=>{

  document.body.classList.toggle("dark-mode");

});

/* ================= WINDOW CLICK ================= */

window.addEventListener("click", (e) => {

  if(e.target === aboutPopup){
    aboutPopup.style.display = "none";
  }

  if(e.target === cartPopup){
    cartPopup.style.display = "none";
  }

  if(e.target === loginPopup){
    loginPopup.style.display = "none";
  }

});

/* ================= OFFER BUTTON ================= */

const offerBtn = document.getElementById("offer-order-btn");

offerBtn.addEventListener("click", () => {

  // Scroll to products section

  document.getElementById("products")
    .scrollIntoView({
      behavior: "smooth"
    });

});

/* ================= MOBILE MENU ================= */

const menuToggle = document.getElementById("menu-toggle");
const nav = document.querySelector("nav");

menuToggle.addEventListener("click", () => {
  nav.classList.toggle("active");
});

/* CLOSE MENU WHEN CLICK LINK */

const navLinks = document.querySelectorAll("nav ul li a");

navLinks.forEach(link => {
  link.addEventListener("click", () => {
    nav.classList.remove("active");
  });
});

/* CLOSE MENU ON SCROLL */

window.addEventListener("scroll", () => {
  nav.classList.remove("active");
});

/* ================= SHOP NOW BUTTON ================= */

const shopNowBtn = document.getElementById("shop-now-btn");

shopNowBtn.addEventListener("click", () => {

  document.getElementById("products").scrollIntoView({
    behavior: "smooth"
  });

})