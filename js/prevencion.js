

/* 
function openModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "block";
}

function closeModal(modalId) {
    let modal = document.getElementById(modalId);
    modal.style.display = "none";
}

 */

document.addEventListener("DOMContentLoaded", function () {
    const openButtons = document.querySelectorAll(".open");
    const closeButtons = document.querySelectorAll(".close");

    openButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const modalId = button.getAttribute("data-modal");
            openModal(modalId);
        });
    });

    closeButtons.forEach(function (button) {
        button.addEventListener("click", function () {
            const modalId = button.getAttribute("data-modal");
            closeModal(modalId);
        });
    });

    function openModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "block";
    }

    function closeModal(modalId) {
        let modal = document.getElementById(modalId);
        modal.style.display = "none";
    }
});
