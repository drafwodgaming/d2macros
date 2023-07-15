$(function () {
  const saveButton = $("#save");
  saveButton.on("click", saveSettings);
});

function saveSettings() {
  const ultButtonValue = $("#ultButton").text();
  const interactButtonValue = $("#interactButton").text();
  const jumpButtonValue = $("#jumpButton").text();

  const settings = {
    ultButton: ultButtonValue,
    interactButton: interactButtonValue,
    jumpButton: jumpButtonValue,
  };

  const entries = [
    ["Ultimate Button", settings.ultButton],
    ["Interact Button", settings.interactButton],
    ["Jump Button", settings.jumpButton],
  ];

  // Отправка сообщения с настройками и массивом entries в главный процесс Electron
  window.api.send("save-settings", { settings, entries });
}
