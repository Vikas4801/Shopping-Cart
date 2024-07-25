let shop = document.querySelector("#shop");

let basket = JSON.parse(localStorage.getItem("data")) || [];

let generateCard = () => {
  return (shop.innerHTML = products
    .map((x) => {
      let { id, name, image, price } = x;
      let search = basket.find((x) => x.id === id) || [];
      return `
     <div id = "product-id-${id}" class="item">
             <img class="item-img" width="200" src=img/${image} alt="img" />
            <div class="details">
              <h3 class="details-product-name">${name}</h3>
              <button type="button" onClick = "addToCart(${id})" class="add-to-cart">Add to Cart</button>
              <div class="price-quantity">
                <h2>$ ${price}</h2>
                <div class="buttons">
                  <i onClick = "decrement(${id})" class="bi bi-dash-lg"></i>
                  <div id = "${id}" class="quantity">${
        search.item === undefined ? 0 : search.item
      }</div>
                  <i onClick= "increment(${id})" class="bi bi-plus-lg"></i>
                </div>
              </div>
            </div>
          </div>
    `;
    })
    .join(""));
};

generateCard();

let addToCart = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  if (search === undefined) {
    basket.push({
      id: id,
      item: 1,
    });
  }
  //console.log(basket);
  update(id);
  localStorage.setItem("data", JSON.stringify(basket));
};

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
  //console.log(basket);
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

  // console.log(basket);
  localStorage.setItem("data", JSON.stringify(basket));
};
let update = (id) => {
  let search = basket.find((basketItem) => basketItem.id === id);
  document.getElementById(id).innerHTML = search.item;
  calculate();
};

let calculate = () => {
  let cartAmount = document.getElementById("cart-amount");
  cartAmount.innerHTML = basket
    .map((basketItem) => basketItem.item)
    .reduce((acc, basketItem) => acc + basketItem, 0);
};
calculate();
