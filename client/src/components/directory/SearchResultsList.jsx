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

export const SearchResultsList = ({ browseResults }, { tvResults }) => {
  return (
    <div>
      <div className="results-list">
        {browseResults.map((browseResults, id) => {
          return <SearchResult browseResults={browseResults.title} key={id} />;
        })}
      </div>
      <div className="tvResults-list">
        {tvResults.map((tvResults, id) => {
          return <SearchResult tvResults={tvResults.title} key={id} />;
        })}
      </div>
    </div>
  );
};

SearchResultsList.propTypes = {
  browseResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  tvResults: PropTypes.arrayOf(PropTypes.object).isRequired,
};
