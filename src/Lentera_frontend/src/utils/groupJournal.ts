import type { Journal } from "../../../declarations/Lentera_backend/Lentera_backend.did";

export function groupJournalsByDate(journals: Journal[]) {
  const groups: Record<string, Journal[]> = {};

  journals.forEach((journal) => {
    const dateKey = new Date(
      Number(journal.dateCreated) / 1_000_000
    ).toDateString();
    if (!groups[dateKey]) {
      groups[dateKey] = [];
    }
    groups[dateKey].push(journal);
  });

  return groups;
}
