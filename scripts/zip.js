const zips = [
  10021, 10023, 10024, 10025, 10028, 10044, 10065, 10069, 10075, 10128, 10162,
  10001, 10011, 10018, 10019, 10020, 10036, 10110, 10111, 10112, 10119, 10199,
  10002, 10003, 10009, 10010, 10016, 10017, 10022, 10103, 10152, 10153, 10154,
  10165, 10167, 10168, 10169, 10170, 10171, 10172, 10173, 10174, 10177, 10031,
  10032, 10033, 10034, 10040, 10026, 10027, 10030, 10037, 10039, 10115, 10012,
  10013, 10014, 10004, 10005, 10006, 10007, 10038, 10271, 10278, 10279, 10280,
  10282, 10029, 10035, 10461, 10462, 10464, 10465, 10472, 10473, 10466, 10469,
  10470, 10475, 10453, 10457, 10460, 10458, 10467, 10468, 10463, 10471, 10451,
  10452, 10456, 10454, 10455, 10459, 10474, 11412, 11423, 11425, 11430, 11432,
  11433, 11434, 11435, 11436, 11451, 11101, 11102, 11103, 11104, 11105, 11106,
  11109, 11004, 11005, 11411, 11413, 11422, 11426, 11427, 11428, 11429, 11374,
  11375, 11379, 11385, 11691, 11692, 11693, 11694, 11697, 11351, 11354, 11355,
  11356, 11357, 11358, 11359, 11360, 11361, 11362, 11363, 11364, 11368, 11369,
  11370, 11371, 11372, 11373, 11377, 11378, 11365, 11366, 11367, 11414, 11415,
  11416, 11417, 11418, 11419, 11420, 11421, 11424, 11212, 11213, 11216, 11233,
  11238, 11201, 11205, 11215, 11217, 11231, 11203, 11210, 11225, 11226, 11206,
  11221, 11237, 11223, 11224, 11229, 11235, 11211, 11222, 11207, 11208, 11204,
  11218, 11219, 11230, 11234, 11236, 11239, 11209, 11214, 11228, 11220, 11232,
  10301, 10304, 10305, 10306, 10307, 10308, 10309, 10312, 10302, 10303, 10310,
  10311, 10314, 7047, 7030, 7094, 7002, 7086, 7032, 7302, 7304, 7305, 7306,
  7307, 7310, 7311, 7093, 7087, 7029, 7601, 7666, 7010, 7628, 7024, 7407, 7020,
  7073, 7632, 7070, 7604, 7644, 7072, 7631, 7071, 7650, 7670, 7607, 7026, 7022,
  7657, 7660, 7643, 7605, 7074, 7608, 7606, 7603, 7031, 7075, 7057, 7621, 7662,
  7663, 7661, 7646,
];

const form = document.querySelector(".zipcode_form");
const input = form.querySelector(".zipcode_form_input input");
const button = form.querySelector(".green_sumbit_btn");

// Загрузка сохраненного значения из sessionStorage
window.addEventListener("load", () => {
  const savedZipCode = sessionStorage.getItem("zipCode");
  if (savedZipCode) {
    input.value = savedZipCode;
  }
});

input.addEventListener("input", () => {
  // Ограничение на 5 символов
  if (input.value.length > 5) {
    input.value = input.value.slice(0, 5);
  }
});

button.addEventListener("click", (event) => {
  event.preventDefault();
  const zipCode = input.value.trim();

  if (zipCode.length !== 5 || isNaN(parseInt(zipCode, 10))) {
    form.classList.add("zipcode_form_error");
    form.classList.remove("zipcode_form_approved");
    return;
  }

  if (zips.includes(parseInt(zipCode, 10))) {
    // Сохранение значения в sessionStorage
    sessionStorage.setItem("zipCode", zipCode);

    form.classList.add("zipcode_form_approved");
    form.classList.remove("zipcode_form_error");
    document
      .querySelector(".services_quiz")
      .scrollIntoView({ behavior: "smooth", block: "start" });
  } else {
    form.classList.add("zipcode_form_error");
    form.classList.remove("zipcode_form_approved");
  }
});

input.addEventListener("input", () => {
  form.classList.remove("zipcode_form_approved", "zipcode_form_error");
});

const confirmButton = document.querySelector(".to_schedule");

confirmButton.addEventListener("click", (event) => {
  const zipCode = sessionStorage.getItem("zipCode");

  if (zipCode) {
    window.location.href = "./schedule.html";
  } else {
    event.preventDefault();

    document
      .querySelector(".services_header")
      .scrollIntoView({ behavior: "smooth", block: "start" });

    const form = document.querySelector(".zipcode_form");
    form.querySelector(".zipcode_form_input input").focus();
  }
});
