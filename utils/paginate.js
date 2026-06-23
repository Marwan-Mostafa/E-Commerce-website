export function paginate(items, page, perPage) {
  const start = (page - 1) * perPage;
  const end = start + perPage;

  return items.slice(start, end);
}

export function getTotalPages(items, perPage) {
  return Math.ceil(items.length / perPage);
}