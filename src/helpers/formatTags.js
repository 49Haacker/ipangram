export function formatTags(name) {
  if (!name || typeof name !== "string") return "";

  const words = name.trim().split(/\s+/);
  const initials = words
    .slice(0, 2)
    .map((word) => word[0]?.toUpperCase() || "");

  return (initials[0] || "") + (initials[1] || initials[0] || "");
}
