export const filterData = (data, searchTerm) => {
  const lowercasedSearchTerm = searchTerm ? searchTerm.toLowerCase() : "";
  // const lowercasedSearchTerm = searchTerm.toLowerCase();
  if (!Array.isArray(data)) {
    console.error("Invalid data provided for filtering");
    return [];
  }
  return data.filter((item) => {
    if (typeof item !== "object" || item === null) {
      return false;
    }
    return Object.values(item).some((value) => {
      const stringValue = value ? value.toString().toLowerCase() : "";
      return stringValue.includes(lowercasedSearchTerm);
    });
  });
};
