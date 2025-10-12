export const generateSlug = (name, area) => {
  return `${name.toLowerCase().replace(/\s+/g, "-")}-${area
    ?.toLowerCase()
    .replace(/\s+/g, "-")}`;
};
