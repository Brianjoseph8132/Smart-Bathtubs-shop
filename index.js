
// Fetch all posts from the server
fetch('https://smart-bathtubs-shop-1.onrender.com/bathtub')
  .then((response) => response.json())
  .then((data) => {
    console.log(data); // Log the response data for debugging purposes
    const bathtub_low = document.getElementById("bathtub_low");
    
    // Clear the existing content (to prevent repeated appends)
    bathtub_low.innerHTML = "";

    // Loop through each post in the fetched data
    for (let post of data) {
        // Dynamically create the HTML structure and append it to the container
        bathtub_low.innerHTML += `
            <div class="col-md-3">
              <img src="${post.imageURL}" alt="${post.title}">
              <h4>${post.title}</h4>
              <p>${post.price}</p>
              <div class=reel>
                <div onclick="deletePost(${post.id})" class="delete"><i class="fa-solid fa-trash-can"></i>
                </div>
                <div>
                  <i onclick="editPost(${post.id})" class="fa-solid fa-pen-to-square"></i>
                </div>
              </div>
            </div>`;
    }})
  .catch((error) => {
    console.error('Error fetching data:', error); // Catch and log any errors
  });

  // add post
const add_form = document.getElementById("add_post_form");

add_form.addEventListener("submit", (event) => {
  event.preventDefault();

  const title = document.getElementById("title").value;
  const image = document.getElementById("imageURL").value;
  const price = document.getElementById("price").value;

  console.log(title, image, price);
  
  fetch('https://smart-bathtubs-shop-1.onrender.com/bathtub', { 
    method: 'POST',
    body: JSON.stringify({
      title: title,
      imageURL: image,
      price: price,
    }),
    headers: {
      'Content-type': 'application/json; charset=UTF-8',
    },
  })
    .then((response) => response.json())
    .then((res) => {
      const message = document.getElementById("message");
      message.innerText = "Post created successfully";
    })
    .catch((error) => {
      console.error("Error:", error);
      const message = document.getElementById("message");
      message.innerText = "Failed to create post";
    });
});


// delete post
function deletePost(id) {
  fetch(`https://smart-bathtubs-shop-1.onrender.com/bathtub/${id}`, {
    method: 'DELETE',
  })
  .then((res) => res.json())
  .then((response) => {
    const del_message = document.getElementById("delete-message");
    del_message.innerText = "Post deleted successfully";
  })
  .catch((error) => {
    console.error('Error:', error);
    const del_message = document.getElementById("delete-message");
    del_message.innerText = "Error deleting post";
  });
}

// edit post
function editPost(id) {
  fetch(`https://smart-bathtubs-shop-1.onrender.com/bathtub/${id}`)
    .then((response) => response.json())
    .then((data) => {
      const edit_container = document.getElementById("edit_container");

      edit_container.innerHTML = `
        <h5>EDIT Post</h5>
        <div id="edit_message" class="text-success" role="alert">
            <!-- This is where the success message will be displayed -->
        </div>
        <form id="edit_post_form" class="edit_post_form">
            <div class="mb-3">
                <input type="text" class="form-control" value="${data.title}" placeholder="Enter Title" id="edit_title" required>
            </div>
            <div class="mb-3">
                <input type="text" class="form-control" value="${data.imageURL}" placeholder="Image URL" id="edit_imageURL" required>
            </div>
            <div class="mb-3">
                <input type="number" class="form-control" value="${data.price}" placeholder="Price" id="edit_price" required>
            </div>
            <button type="submit" class="btn btn-primary">Edit</button>
        </form>
      `;

      const edit_form = document.getElementById("edit_post_form");

      edit_form.addEventListener("submit", (event) => {
        event.preventDefault();

        const title = document.getElementById("edit_title").value;
        const image = document.getElementById("edit_imageURL").value;
        const price = document.getElementById("edit_price").value;

        console.log(title, image, price);

        
        fetch(`https://smart-bathtubs-shop-1.onrender.com/bathtub/${id}`, {
          method: 'PATCH',
          body: JSON.stringify({
            title: title,
            imageURL: image,
            price: price,
          }),
          headers: {
            'Content-type': 'application/json; charset=UTF-8',
          },
        })
          .then((response) => response.json())
          .then((res) => {
            const edit_message = document.getElementById("edit_message");
            edit_message.innerText = "Post edited successfully";
          })
          .catch((error) => {
            // Optional: Handle errors if the PATCH request fails
            const edit_message = document.getElementById("edit_message");
            edit_message.innerText = "Failed to edit post";
            edit_message.classList.remove("text-success");
            edit_message.classList.add("text-danger");
            console.error("Error editing post:", error);
          });
      });
    });
}

