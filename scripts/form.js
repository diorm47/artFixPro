const BOT_TOKEN = "8064031856:AAGYg6dkeDBdHp0C8XmV9UdNO20TedaMLd0";
const CHAT_ID = "443139059";
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
  const phoneInput = formWrapper.querySelector(
    "input[placeholder='Phone number*']"
  );
  const phoneRegex = /^\d{10}$/;

  inputs.forEach((input) => {
    if (!input.value.trim()) {
      showError(input, `Fill ${input.placeholder}`);
      isValid = false;
    } else if (input === phoneInput && !phoneRegex.test(input.value.trim())) {
      showError(input, "Invalid phone number format. Use (###) ###-####");
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
    
    document
      .querySelector(".success_modal")
      .classList.add("visible_success_modal");
    setTimeout(() => {
      document
        .querySelector(".success_modal")
        .classList.remove("visible_success_modal");
    }, 3000);
  } catch (error) {
    console.error("Error:", error);
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

document.querySelector(".to_contacts").addEventListener("click", () => {
  const targetBlock = document.querySelector("#contacts_block");
  if (targetBlock) {
    targetBlock.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
