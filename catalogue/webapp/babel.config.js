module.exports = function (api) {
  api.cache(true);

  const presets = ['@weco/common/babel'];

  // We use this to ensure that rich types (in particular `Date`) get
  // (de)serialised properly in getServerSideProps.
  //
  // Vanilla Next can't pass `Date` values through the Props, because it
  // doesn't know how to serialise them as JSON.  If you serialise them as
  // a string, then it can't deserialise them at the other end.
  //
  // This plugin will ensure `Date` values come out as the right type in
  // the client-side components.
  const plugins = ['superjson-next'];

  return {
    plugins,
    presets,
  };
};
