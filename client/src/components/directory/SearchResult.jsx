import PropTypes from "prop-types";

export const SearchResult = ({ result }) => {
  // console.log("browseResult", browseResult);
  // console.log("tvResult", tvResult);
  return (
    <div>
      <div
        className="search-result"
        onClick={(e) => alert(`You selected ${result}!`)}
      >
        {result}
      </div>
      {/* <div
        className="search-result"
        onClick={(e) => alert(`You selected ${tvResult}!`)}
      >
        {tvResult}
      </div> */}
    </div>
  );
};

// SearchResult.propTypes = {
//   browseResult: PropTypes.string.isRequired,
//   tvResult: PropTypes.string.isRequired,
// };
