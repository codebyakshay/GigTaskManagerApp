export function formatDueDate(d?: Date | string): string {
  if (!d) return " ";
  const date = typeof d === "string" ? new Date(d) : d;
  if (Number.isNaN(date.getTime?.() ?? NaN)) return String(d ?? " ");
  return date.toLocaleDateString("en-IN", {
    month: "short",
    day: "numeric",
    year: "numeric",
  });
}
