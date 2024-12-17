document.querySelector(".to_contacts_main").addEventListener("click", () => {
  const targetBlock = document.querySelector("#contacts_block");
  if (targetBlock) {
    targetBlock.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});

document.querySelector(".to_services_main").addEventListener("click", () => {
  const targetBlock = document.querySelector("#services_block");
  if (targetBlock) {
    targetBlock.scrollIntoView({ behavior: "smooth", block: "start" });
  }
});
