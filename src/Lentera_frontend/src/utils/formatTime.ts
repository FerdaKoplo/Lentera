export function formatDate(dateNum: bigint) {
  const date = new Date(Number(dateNum) / 1_000_000);
  return date.toLocaleDateString("en-US", {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

export function formatTime(timeNum: bigint) {
  const date = new Date(Number(timeNum) / 1_000_000);
  return date.toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
  });
}
