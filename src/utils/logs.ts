type LogEntry = {
  text: string;
  timestamp: number;
};

type LogsByDate = {
  [date: string]: LogEntry[];
};

export function addLogEntry(text: string) {
  const logs: LogsByDate = JSON.parse(localStorage.getItem("logs") || "{}");
  const today = new Date().toISOString().slice(0, 10);
  if (!logs[today]) logs[today] = [];
  logs[today].push({ text, timestamp: Date.now() });
  localStorage.setItem("logs", JSON.stringify(logs));
}

export function getLogs(filter: "daily" | "weekly" | "monthly"): LogsByDate {
  const logs: LogsByDate = JSON.parse(localStorage.getItem("logs") || "{}");
  const now = new Date();
  const filtered: LogsByDate = {};

  Object.keys(logs).forEach(dateStr => {
    const date = new Date(dateStr);
    if (
      (filter === "daily" && dateStr === now.toISOString().slice(0, 10)) ||
      (filter === "weekly" && isSameWeek(date, now)) ||
      (filter === "monthly" && date.getMonth() === now.getMonth() && date.getFullYear() === now.getFullYear())
    ) {
      filtered[dateStr] = logs[dateStr];
    }
  });

  return filtered;
}

// Yardımcı fonksiyon
function isSameWeek(d1: Date, d2: Date) {
  const onejan = new Date(d1.getFullYear(),0,1);
  const week1 = Math.ceil((((d1.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()+1)/7);
  const week2 = Math.ceil((((d2.getTime() - onejan.getTime()) / 86400000) + onejan.getDay()+1)/7);
  return week1 === week2 && d1.getFullYear() === d2.getFullYear();
}