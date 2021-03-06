"use strict";

let reminders = getSavedreminders();

const filters = {
  searchText: "",
  sortBy: "byEdited",
};

renderreminders(reminders, filters);

document.querySelector("#create-reminder").addEventListener("click", (e) => {
  const id = uuidv4();
  const timestamp = moment().valueOf();

  reminders.push({
    id: id,
    title: "",
    body: "",
    createdAt: timestamp,
    updatedAt: timestamp,
  });
  savereminders(reminders);
  location.assign(`edit.html#${id}`);
});

document.querySelector("#search-text").addEventListener("input", (e) => {
  filters.searchText = e.target.value;
  renderreminders(reminders, filters);
});

document.querySelector("#filter-by").addEventListener("change", (e) => {
  filters.sortBy = e.target.value;
  renderreminders(reminders, filters);
});

window.addEventListener("storage", (e) => {
  if (e.key === "reminders") {
    reminders = JSON.parse(e.newValue);
    renderreminders(reminders, filters);
  }
});