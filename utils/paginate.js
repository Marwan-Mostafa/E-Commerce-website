export function paginate(items, page, perPage) {

  if (perPage === Infinity) {
    return [...items];
  }

  const start =
    (page - 1) * perPage;

  return items.slice(
    start,
    start + perPage
  );

}

export function getTotalPages(items, perPage) {

  if (perPage === Infinity) {
    return 1;
  }

  return Math.ceil(
    items.length / perPage
  );

}