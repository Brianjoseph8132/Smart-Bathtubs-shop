document.getElementById("formist").addEventListener("submit", function(event) {
    // Prevent form from submitting and refreshing the page
    event.preventDefault();

    // Get the comment text from the textarea
    const commentText = document.getElementById("comment_input").value;

    // Get the element where the comments will be displayed
    const commentList = document.getElementById("comment_list");

    // Check if comment is not empty before appending
    if (commentText.trim() !== "") {
        // Append the new comment as a paragraph
        commentList.innerHTML += `<p>${commentText}</p>`;

        // Clear the textarea after adding the comment
        document.getElementById("comment_input").value = '';
    } else {
        alert("Please write a comment before submitting.");
    }
});
