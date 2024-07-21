import PropTypes from "prop-types";
import { SearchResult } from "./SearchResult";

export const SearchResultsList = ({
  browseResults,
  tvResults,
  nowPlayingResults,
}) => {
  return (
    <div>
      <div className="Results-Lists">
        {nowPlayingResults && nowPlayingResults.length > 0 && (
          <div className="nowPlaying-Result-List">
            {nowPlayingResults.map((nowPlayingResult, id) => {
              return <SearchResult result={nowPlayingResult.title} key={id} />;
            })}
          </div>
        )}
        {browseResults && browseResults.length > 0 && (
          <div className="browse-Result-List">
            {browseResults.map((browseResult, id) => {
              return <SearchResult result={browseResult.title} key={id} />;
            })}
          </div>
        )}
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
  nowPlayingResults: PropTypes.arrayOf(PropTypes.object).isRequired,
  nowPlayingResult: PropTypes.arrayOf(PropTypes.object).isRequired,
};
