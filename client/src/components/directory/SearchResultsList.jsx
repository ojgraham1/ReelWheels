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
