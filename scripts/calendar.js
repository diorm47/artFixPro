// Генерация календаря
document.addEventListener("DOMContentLoaded", () => {
  const calendar = document.querySelector(".calendar");
  const calendarTop = calendar.querySelector(".calendar_top");
  const calendarDays = calendar.querySelector(".calendar_days");

  let currentDate = new Date();

  const renderCalendar = (date) => {
    const year = date.getFullYear();
    const month = date.getMonth();

    // Получаем количество дней в текущем месяце
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    // Первый день месяца (0 - воскресенье, 1 - понедельник и т.д.)
    const firstDayIndex = new Date(year, month, 1).getDay();

    // Последний день предыдущего месяца
    const prevLastDay = new Date(year, month, 0).getDate();

    // Текущая дата
    const today = new Date();

    // Обновление заголовка месяца
    const monthNames = [
      "January",
      "February",
      "March",
      "April",
      "May",
      "June",
      "July",
      "August",
      "September",
      "October",
      "November",
      "December",
    ];

    calendarTop.querySelector(
      "h3"
    ).innerHTML = `${monthNames[month]} <span>${year}</span>`;

    // Очищаем календарь
    calendarDays.innerHTML = "";

    // Добавляем невидимые дни предыдущего месяца
    for (let i = firstDayIndex; i > 0; i--) {
      const day = document.createElement("div");
      day.classList.add("calendar_day_invicible");
      day.textContent = prevLastDay - i + 1;
      calendarDays.appendChild(day);
    }

    // Добавляем дни текущего месяца
    for (let i = 1; i <= daysInMonth; i++) {
      const day = document.createElement("div");
      day.classList.add("calendar_day");

      if (
        year === today.getFullYear() &&
        month === today.getMonth() &&
        i < today.getDate()
      ) {
        day.classList.add("calendar_day_disabled");
      }

      day.innerHTML = `<p>${i}</p>`;
      calendarDays.appendChild(day);
    }

    // Добавляем дни следующего месяца до конца недели
    const nextDays = 7 - ((firstDayIndex + daysInMonth) % 7);

    if (nextDays < 7) {
      for (let i = 1; i <= nextDays; i++) {
        const day = document.createElement("div");
        day.classList.add("calendar_day_invicible");
        day.textContent = i;
        calendarDays.appendChild(day);
      }
    }
  };

  // Слушатели событий для переключения месяца
  const arrows = calendar.querySelectorAll(".calendar_arrow");
  arrows[0].addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() - 1);
    renderCalendar(currentDate);
  });

  arrows[1].addEventListener("click", () => {
    currentDate.setMonth(currentDate.getMonth() + 1);
    renderCalendar(currentDate);
  });

  // Инициализация календаря
  renderCalendar(currentDate);
});
