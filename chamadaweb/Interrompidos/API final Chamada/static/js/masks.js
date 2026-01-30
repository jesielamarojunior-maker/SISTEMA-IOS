document.addEventListener("DOMContentLoaded", function () {
  const cpfInput = document.getElementById("cpf");

  if (cpfInput) {
    cpfInput.addEventListener("input", function () {
      let value = this.value.replace(/\D/g, "");
      if (value.length > 11) {
        value = value.slice(0, 11);
      }

      if (value.length > 9) {
        this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
          6,
          9
        )}-${value.slice(9)}`;
      } else if (value.length > 6) {
        this.value = `${value.slice(0, 3)}.${value.slice(3, 6)}.${value.slice(
          6
        )}`;
      } else if (value.length > 3) {
        this.value = `${value.slice(0, 3)}.${value.slice(3)}`;
      } else {
        this.value = value;
      }
    });
  }
});
