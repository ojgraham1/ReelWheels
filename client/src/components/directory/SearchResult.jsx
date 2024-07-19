import PropTypes from "prop-types";

export const SearchResult = ({ browseResults }) => {
  console.log("browseResults", browseResults);
  return (
    <div
      className="search-result"
      onClick={(e) => alert(`You selected ${browseResults}!`)}
    >
      {browseResults}
    </div>
  );
};

SearchResult.propTypes = {
  browseResults: PropTypes.string.isRequired,
};
