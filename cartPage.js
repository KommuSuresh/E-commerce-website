document.addEventListener("DOMContentLoaded", () => {
    // Retrieve product ID from the query parameter
    const queryParams = new URLSearchParams(window.location.search);
    const productId = queryParams.get("id");

    // Retrieve clicked card details from local storage
    const clickedCardDetails = JSON.parse(localStorage.getItem("clickedCardDetails")) || {};

    // Display the details on the product details page
    if (clickedCardDetails && clickedCardDetails.id === productId) {
      document.querySelector(".nameOfAccess").textContent = clickedCardDetails.name;
      document.querySelector(".companayName").textContent = clickedCardDetails.brand;
      document.querySelector(".priceOfAccess .price").textContent = clickedCardDetails.price;
      document.querySelector(".descriptionPara").textContent = clickedCardDetails.description;

      const subImagesContainer = document.querySelector(".sub-images-container");

      clickedCardDetails.photos.forEach((photo, index) => {
        // Create a button element
        const subImageBtn = document.createElement("button");
        subImageBtn.type = "button"; // Set the button type to 'button'

        // Add a class to the button
        subImageBtn.classList.add("sub-imges-btn");

        // Create an image element
        const subImage = document.createElement("img");
        subImage.src = photo;

        // Append the image to the button
        subImageBtn.appendChild(subImage);

        // Append the button to the sub-images container
        subImagesContainer.appendChild(subImageBtn);

        // Add an event listener to the button for redirection
        subImageBtn.addEventListener("click", () => {
          // Update the full image source based on the clicked sub-image
          document.querySelector(".fullimg").src = photo;
        });
      });

      // Set the default full image to the first image
      if (clickedCardDetails.photos.length > 0) {
        document.querySelector(".fullimg").src = clickedCardDetails.photos[0];
      }

      // Initialize count from local storage or set it to 0
      let count = parseInt(localStorage.getItem("totalItemsincart")) || 0;
      let obj_count = document.getElementById("Obj_count");
      obj_count.textContent = `${count}`;

      function addToLocalStorage() {
        let objectData = JSON.parse(localStorage.getItem(productId)) || { quantity: 0 }; // Initialize quantity to 0

        if (!objectData.quantity) {
          objectData.quantity = 1; // Initialize quantity to 1 if it doesn't exist
        } else {
          objectData.quantity += 1; // Increment the quantity
        }

        // Save the updated data back to local storage
        localStorage.setItem(productId, JSON.stringify({ ...clickedCardDetails, ...objectData }));

        // Increment the count and save it back to local storage
        count += 1;
        localStorage.setItem("totalItemsincart", count);
        obj_count.textContent = `${count}`;
      }

      let addToCartBtn = document.getElementById("cartBtn");
      addToCartBtn.addEventListener("click", addToLocalStorage);
    }
  });

  // Listen for changes in local storage and update the count dynamically
  window.addEventListener("storage", (event) => {
    if (event.key === "totalItemsincart") {
      let obj_count = document.getElementById("Obj_count");
      obj_count.textContent = `${localStorage.getItem("totalItemsincart")}`;
    } else {
      obj_count.textContent = 0;
    }
  });