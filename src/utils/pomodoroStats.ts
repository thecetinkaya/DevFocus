export function incrementPomodoroCount() {
  const stats = JSON.parse(localStorage.getItem("pomodoroStats") || "{}");
  const today = new Date().toISOString().slice(0, 10);
  stats[today] = (stats[today] || 0) + 1;
  localStorage.setItem("pomodoroStats", JSON.stringify(stats));
}

export function getPomodoroStats() {
  return JSON.parse(localStorage.getItem("pomodoroStats") || "{}");
}