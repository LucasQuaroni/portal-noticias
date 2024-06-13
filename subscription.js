var API_URL = "https://jsonplaceholder.typicode.com";

document.addEventListener("DOMContentLoaded", function () {
  var form = document.getElementById("form");
  var submitButton = document.getElementById("submitButton");
  var modal = document.getElementById("modal");
  var closeButton = document.getElementById("closeButton");
  var modalMessage = document.getElementById("modal-message");
  var modalResponse = document.getElementById("modal-response");

  addFocusListeners();
  loadFormValues();

  var nombreInput = document.getElementById("nombre");
  nombreInput.addEventListener("keyup", function () {
    var hola = document.getElementById("hola");
    hola.textContent = ", " + nombreInput.value;
  });

  var showModal = (message) => {
    modalMessage.textContent = message;
    modal.style.display = "block";
  };

  closeButton.onclick = function () {
    modal.style.display = "none";
  };

  window.onclick = function (event) {
    if (event.target == modal) {
      modal.style.display = "none";
    }
  };

  submitButton.addEventListener("click", function (event) {
    event.preventDefault();
    var errores = [];
    if (validateForm(errores)) {
      var formData = new FormData(form);
      var data = new URLSearchParams(formData);
      fetch(`${API_URL}/posts`, {
        method: "POST",
        body: data,
      })
        .then((response) => response.json())
        .then((data) => {
          console.log("Success:", data);
          saveFormValues();
          showModal("¡Formulario enviado correctamente!");
          modalResponse.textContent = JSON.stringify(data);
        })
        .catch((error) => {
          console.error("Error:", error);
          showModal("Error al enviar el formulario: " + error.message);
          modalResponse.textContent = "";
        });
    } else {
      showModal("Hay errores en el formulario: " + errores.join(", "));
      modalResponse.textContent = "";
    }
  });

  function addFocusListeners() {
    var inputs = [
      "nombre",
      "email",
      "password",
      "password2",
      "edad",
      "telefono",
      "direccion",
      "ciudad",
      "codigo-postal",
      "dni",
    ];
    inputs.forEach((inputId) => {
      var inputElement = document.getElementById(inputId);
      var errorElement = document.getElementById(`error-${inputId}`);
      inputElement.addEventListener("focus", () => {
        errorElement.textContent = "";
      });
    });
  }

  function validateForm(errores) {
    var isValid = true;

    var nombreInput = document.getElementById("nombre");
    var nombreError = document.getElementById("error-nombre");
    if (
      nombreInput.value.trim().length < 6 ||
      !nombreInput.value.includes(" ")
    ) {
      isValid = false;
      nombreError.textContent = "El nombre es inválido";
      errores.push("Nombre");
    } else {
      nombreError.textContent = "";
    }

    var emailInput = document.getElementById("email");
    var emailError = document.getElementById("error-email");
    var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(emailInput.value)) {
      isValid = false;
      emailError.textContent = "El email es inválido";
      errores.push("Email");
    } else {
      emailError.textContent = "";
    }

    var passwordInput = document.getElementById("password");
    var passwordError = document.getElementById("error-password");
    if (passwordInput.value.length < 8 || !/\d/.test(passwordInput.value)) {
      isValid = false;
      passwordError.textContent = "Minimo 8 carat. y un num";
      errores.push("Password");
    } else {
      passwordError.textContent = "";
    }

    var password2Input = document.getElementById("password2");
    var password2Error = document.getElementById("error-password2");
    if (password2Input.value !== passwordInput.value) {
      isValid = false;
      password2Error.textContent = "Las contraseñas no coinciden";
      errores.push("Contraseñas diferentes");
    } else {
      password2Error.textContent = "";
    }

    var edadInput = document.getElementById("edad");
    var edadError = document.getElementById("error-edad");
    if (parseInt(edadInput.value) < 18 || isNaN(parseInt(edadInput.value))) {
      isValid = false;
      edadError.textContent = "La edad debe ser >= a 18";
      errores.push("Edad");
    } else {
      edadError.textContent = "";
    }

    var telefonoInput = document.getElementById("telefono");
    var telefonoError = document.getElementById("error-telefono");
    var telefonoRegex = /^\d{7,}$/;
    if (!telefonoRegex.test(telefonoInput.value)) {
      isValid = false;
      telefonoError.textContent = "El teléfono es inválido";
      errores.push("Teléfono");
    } else {
      telefonoError.textContent = "";
    }

    var direccionInput = document.getElementById("direccion");
    var direccionError = document.getElementById("error-direccion");
    if (direccionInput.value.trim().length < 5) {
      isValid = false;
      direccionError.textContent = "La dirección es inválida";
      errores.push("Dirección");
    } else {
      direccionError.textContent = "";
    }

    var ciudadInput = document.getElementById("ciudad");
    var ciudadError = document.getElementById("error-ciudad");
    if (ciudadInput.value.trim().length < 3) {
      isValid = false;
      ciudadError.textContent = "La ciudad es inválida";
      errores.push("Ciudad");
    } else {
      ciudadError.textContent = "";
    }

    var codigoPostalInput = document.getElementById("codigo-postal");
    var codigoPostalError = document.getElementById("error-codigo-postal");
    if (codigoPostalInput.value.trim().length < 3) {
      isValid = false;
      codigoPostalError.textContent = "El código postal es inválido";
      errores.push("Código Postal");
    } else {
      codigoPostalError.textContent = "";
    }

    var dniInput = document.getElementById("dni");
    var dniError = document.getElementById("error-dni");
    var dniRegex = /^\d{7,8}$/;
    if (!dniRegex.test(dniInput.value)) {
      isValid = false;
      dniError.textContent = "El DNI es inválido";
      errores.push("DNI");
    } else {
      dniError.textContent = "";
    }

    return isValid;
  }

  function showAlert(message) {
    alert(message);
  }

  function saveFormValues() {
    var inputs = [
      "nombre",
      "email",
      "password",
      "password2",
      "edad",
      "telefono",
      "direccion",
      "ciudad",
      "codigo-postal",
      "dni",
    ];
    inputs.forEach((inputId) => {
      var inputElement = document.getElementById(inputId);
      localStorage.setItem(inputId, inputElement.value);
    });
  }

  function loadFormValues() {
    var inputs = [
      "nombre",
      "email",
      "password",
      "password2",
      "edad",
      "telefono",
      "direccion",
      "ciudad",
      "codigo-postal",
      "dni",
    ];
    inputs.forEach((inputId) => {
      var inputElement = document.getElementById(inputId);
      var storedValue = localStorage.getItem(inputId);
      if (storedValue) {
        inputElement.value = storedValue;
      }
    });
  }
});
