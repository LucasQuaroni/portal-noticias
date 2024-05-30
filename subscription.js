document.addEventListener("DOMContentLoaded", function () {
  const form = document.getElementById("form");
  const submitButton = document.getElementById("submitButton");

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    if (validateForm()) {
      showAlert("¡Formulario enviado correctamente!");
    } else {
      showAlert("¡Formulario inválido! Revise los errores marcados.");
    }
  });

  function validateForm() {
    let isValid = true;

    const nombreInput = document.getElementById("nombre");
    const nombreError = document.getElementById("error-nombre");
    if (
      nombreInput.value.trim().length < 6 ||
      !nombreInput.value.includes(" ")
    ) {
      isValid = false;
      nombreError.textContent = "El nombre completo es inválido";
    } else {
      nombreError.textContent = "";
    }

    const emailInput = document.getElementById("email");
    const emailError = document.getElementById("error-email");
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      emailError.textContent = "El email es inválido";
    } else {
      emailError.textContent = "";
    }

    const passwordInput = document.getElementById("password");
    const passwordError = document.getElementById("error-password");
    if (passwordInput.value.length < 8 || !/\d/.test(passwordInput.value)) {
      isValid = false;
      passwordError.textContent =
        "La contraseña debe tener al menos 8 caracteres y contener al menos un número";
    } else {
      passwordError.textContent = "";
    }

    const password2Input = document.getElementById("password2");
    const password2Error = document.getElementById("error-password2");
    if (password2Input.value !== passwordInput.value) {
      isValid = false;
      password2Error.textContent = "Las contraseñas no coinciden";
    } else {
      password2Error.textContent = "";
    }

    const edadInput = document.getElementById("edad");
    const edadError = document.getElementById("error-edad");
    if (parseInt(edadInput.value) < 18 || isNaN(parseInt(edadInput.value))) {
      isValid = false;
      edadError.textContent =
        "La edad debe ser un número entero mayor o igual a 18";
    } else {
      edadError.textContent = "";
    }

    const telefonoInput = document.getElementById("telefono");
    const telefonoError = document.getElementById("error-telefono");
    const telefonoRegex = /^\d{7,}$/;
    if (!telefonoRegex.test(telefonoInput.value)) {
      isValid = false;
      telefonoError.textContent = "El teléfono es inválido";
    } else {
      telefonoError.textContent = "";
    }

    const direccionInput = document.getElementById("direccion");
    const direccionError = document.getElementById("error-direccion");
    if (direccionInput.value.trim().length < 5) {
      isValid = false;
      direccionError.textContent = "La dirección es inválida";
    } else {
      direccionError.textContent = "";
    }

    const ciudadInput = document.getElementById("ciudad");
    const ciudadError = document.getElementById("error-ciudad");
    if (ciudadInput.value.trim().length < 3) {
      isValid = false;
      ciudadError.textContent = "La ciudad es inválida";
    } else {
      ciudadError.textContent = "";
    }

    const codigoPostalInput = document.getElementById("codigo-postal");
    const codigoPostalError = document.getElementById("error-codigo-postal");
    if (codigoPostalInput.value.trim().length < 3) {
      isValid = false;
      codigoPostalError.textContent = "El código postal es inválido";
    } else {
      codigoPostalError.textContent = "";
    }

    const dniInput = document.getElementById("dni");
    const dniError = document.getElementById("error-dni");
    const dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(dniInput.value)) {
      isValid = false;
      dniError.textContent = "El DNI es inválido";
    } else {
      dniError.textContent = "";
    }

    return isValid;
  }

  function showAlert(message) {
    alert(message);
  }
});
