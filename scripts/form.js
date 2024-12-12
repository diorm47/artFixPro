const BOT_TOKEN = "7893714213:AAE0oAvbUKM_lWqlhj1B4GwWiydCJeDIL0w";
const CHAT_ID = "1060696046";
const TELEGRAM_API_URL = `https://api.telegram.org/bot${BOT_TOKEN}/sendMessage`;

const formWrapper = document.querySelector(".contact_form_wrapper");
const inputs = formWrapper.querySelectorAll(".contact_form_input");
const textarea = formWrapper.querySelector(".contact_form_textarea");
const checkbox = formWrapper.querySelector("input[type=checkbox]");
const sendButton = formWrapper.querySelector(".send_btn");
const errorMessages = formWrapper.querySelectorAll(".input_error");

function showError(input, message) {
  const errorDiv = input.nextElementSibling;
  errorDiv.style.visibility = "visible";
  errorDiv.querySelector("span").textContent = message;
}

function hideError(input) {
  const errorDiv = input.nextElementSibling;
  errorDiv.style.visibility = "hidden";
}

function validateInputs() {
  let isValid = true;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, `Fill ${input.placeholder}`);
      isValid = false;
    } else {
      hideError(input);
    }
  });

  if (!textarea.value.trim()) {
    showError(textarea, "Fill Questions or Comments");
    isValid = false;
  } else {
    hideError(textarea);
  }

  if (!checkbox.checked) {
    alert("You must agree to the terms and conditions.");
    isValid = false;
  }

  return isValid;
}

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

    alert("Message sent successfully!");
  } catch (error) {
    console.error("Error:", error);
    alert("Failed to send message. Please try again later.");
  }
}

function formatMessage() {
  const firstName = inputs[0].value;
  const lastName = inputs[1].value;
  const email = inputs[2].value;
  const phone = inputs[3].value;
  const comment = textarea.value;

  return `
<b>New Contact Request</b>

<b>First Name:</b> ${firstName}
<b>Last Name:</b> ${lastName}
<b>Email:</b> ${email}
<b>Phone:</b> ${phone}
<b>Comment:</b> ${comment}
  `;
}

sendButton.addEventListener("click", (event) => {
  event.preventDefault();

  if (validateInputs()) {
    const message = formatMessage();
    sendToTelegram(message);
  }
});
