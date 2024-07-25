let label = document.querySelector("#label");
let shoppingCart = document.querySelector("#shopping-cart");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let calculate = () => {
  let cartAmount = document.getElementById("cart-amount");
  cartAmount.innerHTML = basket
    .map((basketItem) => basketItem.item)
    .reduce((acc, basketItem) => acc + basketItem, 0);
};
calculate();

let generateCartItems = () => {
  if (basket.length !== 0) {
    return (shoppingCart.innerHTML = basket
      .map((basketItem) => {
        let { id, item } = basketItem;
        let search = products.find((product) => product.id === id) || [];
        return `
        <div class="cart-items">
           <img class = "cart-item-img" width = 100 src=img/${
             search.image
           } alt=""/>
            <div class="details">
              <div class="title-price-x">
                  <h4 class="name-price">
                  <p>${search.name}</p>
                  <p class="cart-item-price">$ ${search.price}</p>
                  </h4>
                  <i onClick= "removeItem(${id})" class="bi bi-x-lg"></i>
              </div>
              <div class="buttons">
                  <i onClick = "decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id = "${id}" class="quantity">${item}</div>
                  <i onClick= "increment(${id})" class="bi bi-plus-lg"></i>
              </div>
                <h3>
                $ ${item * search.price}
                </h3>


            </div>
        </div>`;
      })
      .join(""));
  } else {
    shoppingCart.innerHTML = ``;
    label.innerHTML = `
    <h2>Your shopping cart is empty</h2>
    <a href="index.html""><button class="homeBtn">Back To Home</button></a>
    `;
  }
};

generateCartItems();

let increment = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  } else {
    search.item += 1;
  }
  generateCartItems();
  update(id);

  localStorage.setItem("data", JSON.stringify(basket));
};
let decrement = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  if (search === undefined) return;
  else if (search.item === 0) return;
  else {
    search.item -= 1;
  }
  update(id);

  basket = basket.filter((basketItem) => basketItem.item !== 0);

  generateCartItems();
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculate();
  generateCartItems();
  totalAmount();
};

let removeItem = (id) => {
  basket = basket.filter((basketItem) => basketItem.id !== id);
  generateCartItems();
  totalAmount();
  calculate();
  localStorage.setItem("data", JSON.stringify(basket));
};

let clearCart = () => {
  basket = [];
  generateCartItems();
  calculate();
  localStorage.setItem("data", JSON.stringify(basket));
};

let totalAmount = () => {
  if (basket.length !== 0) {
    let total = basket
      .map((basketItem) => {
        let { id, item } = basketItem;
        let search = products.find((product) => product.id === id) || [];
        return item * search.price;
      })
      .reduce((acc, item) => acc + item, 0);

    label.innerHTML = `
      <h2>Total Bill : $ ${total}</h2>
      <button class="checkout">Checkout</button>
      <button onclick="clearCart()" class="removeAll">Clear Cart</button>
      `;
  } else return;
};
totalAmount();
