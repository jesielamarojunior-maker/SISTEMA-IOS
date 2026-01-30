// Toggle switches para faltas
document.querySelectorAll('input[type="checkbox"]').forEach((checkbox) => {
  checkbox.addEventListener("change", function () {
    const container = this.closest(".flex.items-center.justify-between");
    const presentSpan = container.querySelector(".text-green-600");
    const absentSpan = container.querySelector(".text-red-600");
    const icon = container.querySelector(".fas");

    if (this.checked) {
      presentSpan.style.display = "none";
      absentSpan.style.display = "block";
      icon.className = "fas fa-user-times text-red-500 text-lg";
    } else {
      presentSpan.style.display = "block";
      absentSpan.style.display = "none";
      icon.className = "fas fa-user-check text-green-500 text-lg";
    }
  });
});
