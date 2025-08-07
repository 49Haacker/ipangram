export function getPaginationParams(query, defaultLimit = 10, defaultPage = 1) {
  const get = (key) =>
    typeof query.get === "function" ? query.get(key) : query[key];
  const rawPage = get("page");
  const rawLimit = get("limit");
  const rawAll = get("All");
  const rawSearch = get("search");

  const All = rawAll?.toLowerCase?.() === "all";
  const page = parseInt(rawPage, 10) || defaultPage;
  const limit = All ? undefined : parseInt(rawLimit, 10) || defaultLimit;
  const offset = All ? 0 : (page - 1) * limit;
  const search = rawSearch?.toString().trim() || "";

  return { page, limit, offset, All, search };
}

export function getPaginationMetadata(totalRecords, limit, page, totalItems) {
  const totalPages = Math.ceil(totalRecords / limit);

  return {
    totalRecords,
    totalPages,
    currentPage: page,
    pageSize: limit,
    totalItems,
  };
}
