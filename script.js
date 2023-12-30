document.addEventListener("DOMContentLoaded", () => {
  const url = "https://5d76bf96515d1a0014085cf9.mockapi.io/product";

  fetch(url)
    .then(response => response.json())
    .then(data => {
      // Display the first set of cards (index 0 to 4)
      let cardsHtml = "";
      data.slice(0, 5).forEach((values, index) => {
        cardsHtml += createCard(values, index + 1);
      });
      document.getElementById("cards").innerHTML = cardsHtml;

      // Display the next set of cards (index 5 onwards)
      let nextCardsHtml = "";
      data.slice(5).forEach((values, index) => {
        nextCardsHtml += createCard(values, index + 1);
      });
      document.getElementById("next-cards").innerHTML = nextCardsHtml;

      document.querySelectorAll(".card-img").forEach((img, index) => {
        img.addEventListener("click", () => {
          // Store the clicked card's details in local storage
          const clickedCardDetails = {
            id: data[index].id,
            name: data[index].name,
            brand: data[index].brand,
            price: data[index].price,
            preview: data[index].preview,
            photos: data[index].photos,
            description: data[index].description,
          };
          localStorage.setItem("clickedCardDetails", JSON.stringify(clickedCardDetails));

          // Redirect to cartPage.html with product ID as a query parameter
          window.location.href = `cartPage.html?id=${data[index].id}`;
        });
      });
    });

  let obj_count = document.getElementById("Obj_count");
  let totalItemsInCart = localStorage.getItem("totalItemsincart");
  obj_count.textContent = totalItemsInCart;

  if (parseInt(totalItemsInCart) === 0) {
    obj_count.textContent = "0";
  }

  function createCard(values, cardId) {
    return `<a href="cartPage.html?id=${values.id}" class="card col-md-2" data-id="${values.id}">
      <img class="card-img" src=${values.preview}> 
      <h2 class="title">${values.name}</h2>
      <h4 class="company">${values.brand}</h4>
      <p class="price">Rs   <span>${values.price}</span></p>
      </a>`;
  }
});