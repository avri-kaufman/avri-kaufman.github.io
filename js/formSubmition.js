const form = document.getElementById("myForm");

form.addEventListener("submit", function (event) {
  event.preventDefault();

  const formData = new FormData(this);

  fetch(form.action, {
    method: "POST",
    body: formData,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        form.reset();
        alert("Thanks for your submission!");
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            console.log("Errors:", data.errors);
            alert("Something went wrong!");
          }
        });
      }
    })
    .catch((error) => {
      console.error("Error:", error);
      alert("An error occurred while sending the form. Please try again.");
    });
});
