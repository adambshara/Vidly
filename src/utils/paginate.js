import _ from "lodash";

export function paginate(items, pageNumber, pageSize) {
  const startIndex = (pageNumber - 1) * pageSize;
  //where he wants to start from which index
  return _(items).slice(startIndex).take(pageSize).value();
  //items means array so he can start from an index
}
