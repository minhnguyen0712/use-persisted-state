const createStorage = (provider) => ({
  get(key, defaultValue) {
    const jsonRes = provider.getItem(key);
    // check for async storage in react native
    if (jsonRes instanceof Promise) {
      // eslint-disable-next-line no-confusing-arrow, implicit-arrow-linebreak
      return provider.getItem(key).then((json) =>
        // eslint-disable-next-line no-nested-ternary, implicit-arrow-linebreak
        json === null || typeof json === 'undefined'
          ? typeof defaultValue === 'function'
            ? defaultValue()
            : defaultValue
          : JSON.parse(json)
      );
    }

    // eslint-disable-next-line no-nested-ternary
    return jsonRes === null || typeof jsonRes === 'undefined'
      ? typeof defaultValue === 'function'
        ? defaultValue()
        : defaultValue
      : JSON.parse(jsonRes);
  },
  set(key, value) {
    return provider.setItem(key, JSON.stringify(value));
  },
});

export default createStorage;
