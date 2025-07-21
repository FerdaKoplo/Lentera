export function getMoodIcon(mood: string): string {
  switch (mood.toLowerCase()) {
    case "yippe":
      return "/assets/moods/yippe.svg";
    case "happy":
      return "/assets/moods/happy.svg";
    case "meh":
      return "/assets/moods/meh.svg";
    case "bad":
      return "/assets/moods/bad.svg";
    case "awful":
      return "/assets/moods/awful.svg";
    default:
      return "/assets/moods/yippe.svg";
  }
}

export function getMoodColor(mood: string): string {
  switch (mood.toLowerCase()) {
    case "yippe":
      return "text-[#62C6A4]";
    case "happy":
      return "text-[#3B94B5]";
    case "meh":
      return "text-[#B5A33B]";
    case "bad":
      return "text-[#B53B3B]";
    case "awful":
      return "text-[#383838]";
    default:
      return "text-black";
  }
}
