// General modal handling logic
function setupModal(modalId, triggerButtonId) {
    const modal = document.getElementById(modalId);
    const triggerButton = document.getElementById(triggerButtonId);
    const closeBtn = modal.querySelector(".close");
    const cancelButton = modal.querySelector("#cancelButton");

    // Show the modal when the trigger button is clicked
    if (triggerButton) {
        triggerButton.addEventListener("click", () => {
            modal.style.display = "block";
        });
    }

    // Close the modal when the close button is clicked
    if (closeBtn) {
        closeBtn.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Close the modal when the cancel button is clicked
    if (cancelButton) {
        cancelButton.addEventListener("click", () => {
            modal.style.display = "none";
        });
    }

    // Close the modal when clicking outside of it
    window.addEventListener("click", (event) => {
        if (event.target === modal) {
            modal.style.display = "none";
        }
    });
}

// Set up the Add Product modal
setupModal("updateproduct", "addProductButton");

// Handle multiple Edit buttons for the Edit modal
const editModal = document.getElementById("popupModal");
const editButtons = document.querySelectorAll("button"); // Select all buttons
const editCloseBtn = editModal.querySelector(".close");
const editCancelButton = editModal.querySelector("#cancelButton");

// Add event listeners to all Edit buttons
editButtons.forEach((button) => {
    if (button.textContent.trim() === "Edit") {
        button.addEventListener("click", () => {
            editModal.style.display = "block";
        });
    }
});

// Close the Edit modal when the close button is clicked
if (editCloseBtn) {
    editCloseBtn.addEventListener("click", () => {
        editModal.style.display = "none";
    });
}

// Close the Edit modal when the cancel button is clicked
if (editCancelButton) {
    editCancelButton.addEventListener("click", () => {
        editModal.style.display = "none";
    });
}

// Close the Edit modal when clicking outside of it
window.addEventListener("click", (event) => {
    if (event.target === editModal) {
        editModal.style.display = "none";
    }
});
