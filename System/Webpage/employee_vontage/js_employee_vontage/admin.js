document.addEventListener("DOMContentLoaded", () => {
    const openFormBtn = document.getElementById("open-form-btn");
    const closeFormBtn = document.getElementById("close-form-btn");
    const formContainer = document.getElementById("form-container");
    const form = document.getElementById("employee-form");
    const tableBody = document.getElementById("employee-table");

    // Open form
    openFormBtn.addEventListener("click", () => {
        formContainer.classList.remove("hidden");
    });

    // Close form
    closeFormBtn.addEventListener("click", () => {
        formContainer.classList.add("hidden");
        form.reset();
    });

    // Form submission
    form.addEventListener("submit", (e) => {
        e.preventDefault();

        const firstName = document.getElementById("first-name").value;
        const lastName = document.getElementById("last-name").value;
        const email = document.getElementById("email").value;
        const city = document.getElementById("city").value;
        const phone = document.getElementById("phone").value;
        const jobs = document.getElementById("jobs").value;

        // Add a new row to the table
        const newRow = `
            <tr>
                <td>${firstName}</td>
                <td>${lastName}</td>
                <td>${email}</td>
                <td>${city}</td>
                <td>${phone}</td>
                <td>${jobs}</td>
            </tr>
        `;

        tableBody.insertAdjacentHTML("beforeend", newRow);

        // Reset and close form
        form.reset();
        formContainer.classList.add("hidden");
    });
});
