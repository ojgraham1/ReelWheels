// import { SearchResult } from "./SearchResult";

// export const SearchResultsList = ({ browseResults }) => {
//   return (
//     <div className="results-list">
//       {browseResults.map((browseResults, id) => {
//         return <SearchResult browseResults={browseResults.name} key={id} />;
//       })}
//     </div>
//   );
// };

import PropTypes from "prop-types";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({ browseResults, tvResults }) => {
  return (
    <div>
      <div className="Results-Lists">
        {browseResults && browseResults.length > 0 && (
          <div className="browse-Result-List">
            {browseResults.map((browseResult, id) => {
              return <SearchResult result={browseResult.title} key={id} />;
            })}
          </div>
        )}{" "}
        {tvResults && tvResults.length > 0 && (
          <div className="tv-Result-List">
            {tvResults.map((tvResult, id) => {
              return <SearchResult result={tvResult.original_name} key={id} />;
            })}
          </div>
        )}
        ;
      </div>
    </div>
  );
};

SearchResultsList.propTypes = {
  browseResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  browseResult: PropTypes.arrayOf(PropTypes.object).isRequired,
  tvResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  tvResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};
