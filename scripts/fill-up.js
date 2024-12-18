// deploy
// const BOT_TOKEN = "8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0";
// const CHAT_ID = "443139059";

//  test
const BOT_TOKEN = "8199670261:AAGXg_1JQEOAL99pm5h-XwszjUQlMOmu2po";
const CHAT_ID = "1060696046";

const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const formWrapper = document.querySelector(".fill_form");
const inputs = formWrapper.querySelectorAll("input, textarea"); // Select all inputs and textarea
const textarea = formWrapper.querySelector("textarea");
const sendButton = document.querySelector(".green_sumbit_btn");
const errorMessages = formWrapper.querySelectorAll(".input_error");

window.addEventListener("load", () => {
  const savedZipCode = sessionStorage.getItem("zipCode");
  const zipCodeInput = document.querySelector(".zip_code_fill_up");

  if (savedZipCode && zipCodeInput) {
    zipCodeInput.value = savedZipCode; // Устанавливаем значение из sessionStorage
  }
});

function showError(input, message) {
  const errorDiv = input.nextElementSibling;
  errorDiv.style.visibility = "visible";
  errorDiv.querySelector("span").textContent = message;
}

function hideError(input) {
  const errorDiv = input.nextElementSibling;
  if (errorDiv && errorDiv.classList.contains("input_error")) {
    errorDiv.style.visibility = "hidden";
  }
}

function validateInputs() {
  let isValid = true;
  const phoneInput = formWrapper.querySelector(
    "input[placeholder='Phone number*']"
  );
  const phoneRegex = /^[+]?[0-9\s()-]{7,15}$/; // Гибкое регулярное выражение для телефона

  inputs.forEach((input) => {
    if (input.required && !input.value.trim()) {
      showError(input, `Fill ${input.placeholder}`);
      isValid = false;
    } else if (input === phoneInput && !phoneRegex.test(input.value.trim())) {
      showError(
        input,
        "Invalid phone number format. Use a valid phone number format"
      );
      isValid = false;
    } else {
      hideError(input); // Вызываем hideError для всех полей
    }
  });

  // Проверка textarea
  if (!textarea.value.trim()) {
    showError(textarea, "Fill additional notes");
    isValid = false;
  } else {
    hideError(textarea);
  }

  return isValid;
}

sendButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (validateInputs()) {
    const firstName = formWrapper.querySelector(
      "input[placeholder='First name*']"
    ).value;
    const lastName = formWrapper.querySelector(
      "input[placeholder='Last name*']"
    ).value;
    const phone = formWrapper.querySelector(
      "input[placeholder='Phone number*']"
    ).value;
    const email = formWrapper.querySelector(
      "input[placeholder='Email address*']"
    ).value;
    const summaryData = JSON.parse(sessionStorage.getItem("summaryData"));
    const totalSumm = summaryData.totalSum;
    // Заполняем модалку данными для подтверждения
    document.getElementById(
      "confirmFirstName"
    ).value = `${firstName} ${lastName}`;

    document.getElementById("confirmPhone").value = phone;
    document.getElementById("confirmEmail").value = email;
    document.getElementById("estimatedAmount").textContent = totalSumm;

    document
      .querySelector(".form_confirmation")
      .classList.add("visible_overlay");

    // const message = formatMessage();
    // sendToTelegram(message);
  }
});

document.getElementById("finalConfirmBtn").addEventListener("click", () => {
  const message = formatMessage();
  sendToTelegram(message);
  document
    .querySelector(".form_confirmation")
    .classList.remove("visible_overlay"); // Закрытие модалки после отправки
});

async function sendToTelegram(data) {
  try {
    const response = await fetch(TELEGRAM_API_URL, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        chat_id: CHAT_ID,
        text: data,
        parse_mode: "HTML",
      }),
    });

    if (!response.ok) {
      throw new Error("Failed to send message");
    }

    document.querySelector(".overlay").classList.add("visible_overlay");
  } catch (error) {
    console.error("Error:", error);
  }
}

function formatMessage() {
  const firstName = formWrapper.querySelector(
    "input[placeholder='First name*']"
  ).value;
  const lastName = formWrapper.querySelector(
    "input[placeholder='Last name*']"
  ).value;
  const phone = formWrapper.querySelector(
    "input[placeholder='Phone number*']"
  ).value;
  const address = formWrapper.querySelector(
    "input[placeholder='Address*']"
  ).value;
  const zip = formWrapper.querySelector("input[placeholder='ZIPcode*']").value;
  const state = formWrapper.querySelector("input[placeholder='State*']").value;
  const city = formWrapper.querySelector("input[placeholder='City*']").value;
  const building = formWrapper.querySelector(
    "input[placeholder='Building no*']"
  ).value;
  const unit = formWrapper.querySelector("input[placeholder='Unit no*']").value;
  const gateCode = formWrapper.querySelector(
    "input[placeholder='Gate code*']"
  ).value;
  const email = formWrapper.querySelector(
    "input[placeholder='Email address*']"
  ).value;
  const comment = textarea.value;

  let orderHtml = `
<b>New order</b>

<b>First Name:</b> ${firstName}
<b>Last Name:</b> ${lastName}
<b>Phone:</b> ${phone}
<b>Address:</b> ${address}
<b>ZIPcode:</b> ${zip}
<b>State:</b> ${state}
<b>City:</b> ${city}
<b>Building No:</b> ${building}
<b>Unit No:</b> ${unit}
<b>Gate Code:</b> ${gateCode}
<b>Email:</b> ${email}
<b>Comment:</b> ${comment}
<b>Date:</b> ${sessionStorage.getItem("selectedDate")}
<b>Time:</b> ${sessionStorage.getItem("selectedTime")}

<b>Selected Serives</b>
`;

  // Получаем массив summaryItems из sessionStorage
  const summaryData = JSON.parse(sessionStorage.getItem("summaryData"));
  const summaryItems = summaryData.summaryItems;
  const totalSumm = summaryData.totalSum;

  if (summaryItems[0].question) {
    summaryItems.forEach((item) => {
      orderHtml += `
        <b>Question:</b> ${item.question}\n`;
      orderHtml += `<b>Answer:</b> ${item.answer}\n`;
      if (item.price) {
        orderHtml += `<b>Price:</b> ${item.price}\n`;
      }
    });
  } else if (summaryItems[0].title) {
    summaryItems.forEach((item) => {
      orderHtml += `
        <b>Title:</b> ${item.title}\n`;
      orderHtml += `<b>Description:</b> ${item.description}\n`;
      if (item.price) {
        orderHtml += `<b>Price:</b> ${item.price}\n`;
      }
    });
  } else if (summaryItems[0].itemName) {
    summaryItems.forEach((item) => {
      orderHtml += `
        <b>Furniture:</b> ${item.itemName}\n`;
      orderHtml += `<b>Quantity:</b> ${item.quantity}\n`;
      if (item.price) {
        orderHtml += `<b>Price:</b> $${item.price}\n`;
      }
    });
  }

  orderHtml += `  
  <b>Total:</b> ${totalSumm}`;

  return orderHtml;
}

function goBackTwoPages() {
  window.history.go(-2);
}

function closeModals() {
  document.querySelector(".success_mess_modal").classList.remove("visible_overlay");
  document.querySelector(".form_confirmation").classList.remove("visible_overlay");
}
