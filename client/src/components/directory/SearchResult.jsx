import PropTypes from "prop-types";

export const SearchResult = ({ browseResults }, { tvResults }) => {
  console.log("browseResults", browseResults);
  return (
    <div>
      <div
        className="search-result"
        onClick={(e) => alert(`You selected ${browseResults}!`)}
      >
        {browseResults}
      </div>
      <div
        className="search-result"
        onClick={(e) => alert(`You selected ${tvResults}!`)}
      >
        {tvResults}
      </div>
    </div>
  );
};

SearchResult.propTypes = {
  browseResults: PropTypes.string.isRequired,
  tvResults: PropTypes.string.isRequired,
};
