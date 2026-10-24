// Example starter JavaScript for disabling form submissions if there are invalid fields
(() => {
  "use strict";

  // Fetch all the forms we want to apply custom Bootstrap validation styles to
  const forms = document.querySelectorAll(".needs-validation");

  // Loop over them and prevent submission
  Array.from(forms).forEach((form) => {
    form.addEventListener(
      "submit",
      (event) => {
        if (!form.checkValidity()) {
          event.preventDefault();
          event.stopPropagation();
        }

        form.classList.add("was-validated");
      },
      false,
    );
  });
})();

// horizontal scroll on hero

const filterContainer = document.getElementById("filter-container");
const scrollLeftBtn = document.getElementById("scroll-left");
const scrollRightBtn = document.getElementById("scroll-right");

scrollLeftBtn.addEventListener("click", () => {
  filterContainer.scrollBy({
    left: -300,
    behavior: "smooth",
  });
});

scrollRightBtn.addEventListener("click", () => {
  filterContainer.scrollBy({
    left: 300,
    behavior: "smooth",
  });
});
