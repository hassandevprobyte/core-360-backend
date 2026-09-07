exports.normalizeToArray = (value) => {
  if (value == null) {
    return { normalized: [], isArray: true };
  }

  const isArray = Array.isArray(value);

  return { normalized: isArray ? value : [value], isArray };
};

exports.restoreOriginalShape = (value, isArray) => {
  return isArray ? value : value[0];
};

exports.createEntityMap = (items, key = "_id") => {
  return new Map(items.map((item) => [String(item[key]), item]));
};
