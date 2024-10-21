let form = document.getElementById("form")

form.addEventListener("submit",function (event){
    event.preventDefault();


    const name = document.getElementById("name").value;
    const email = document.getElementById("email").value;
    const subject = document.getElementById("subject").value;
    const message = document.getElementById("message").value;
form.reset();
console.log(name,email,subject,message)
})

const button = document.querySelector(".btn")

function alertBtn(){
    alert("Thank you for your feedback")
}
button.addEventListener("click",alertBtn)


