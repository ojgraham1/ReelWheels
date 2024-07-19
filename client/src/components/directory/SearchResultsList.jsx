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

export const SearchResultsList = ({ browseResults }) => {
  console.log("browseResults2", browseResults);
  return (
    <div className="results-list">
      {browseResults.map((browseResults, id) => {
        return <SearchResult browseResults={browseResults.title} key={id} />;
      })}
    </div>
  );
};

SearchResultsList.propTypes = {
  browseResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
