document.addEventListener("DOMContentLoaded", function () {
    const userList = document.querySelector(".nosotros");

    fetch("https://jsonplaceholder.typicode.com/users")
        .then((response) => response.json())
        .then((data) => {
            data.forEach((user) => {
                const userCard = document.createElement("div");
                userCard.classList.add("card-nos");

                userCard.innerHTML = `
                    <img src="../img/nosotros3.jpg" >
                    <h2>${user.name}</h2>
                    <p><strong>Email:</strong> ${user.email}</p>
                    <p><strong>Teléfono:</strong> ${user.phone}</p>
                `;

                userList.appendChild(userCard);
            });
        })
        
});
