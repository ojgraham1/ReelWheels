import PropTypes from "prop-types";

export const SearchResult = ({ result }) => {
  return (
    <div>
      <div
        className="search-result"
        onClick={(e) => alert(`You selected ${result}!`)}
      >
        {result}
      </div>
    </div>
  );
};
SearchResult.propTypes = {
  result: PropTypes.string.isRequired,
};
