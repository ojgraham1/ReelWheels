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
            <div className="subcategory">
              <h3>Now Playing</h3>
            </div>
            {nowPlayingResults.map((nowPlayingResult) => {
              return (
                <SearchResult
                  result={nowPlayingResult.title}
                  category="Now Playing"
                  key={nowPlayingResult.id}
                  id={nowPlayingResult.id}
                />
              );
            })}
          </div>
        )}
        {browseResults && browseResults.length > 0 && (
          <div className="browse-Result-List">
            <div className="subcategory">
              <h3>All Movies</h3>
            </div>
            {browseResults.map((browseResult) => {
              return (
                <SearchResult
                  result={browseResult.title}
                  category="All Movies"
                  key={browseResult.id}
                  id={browseResult.id}
                />
              );
            })}
          </div>
        )}
        {tvResults && tvResults.length > 0 && (
          <div className="tv-Result-List">
            <div className="subcategory">
              <h3>TV Shows</h3>
            </div>
            {tvResults.map((tvResult) => {
              return (
                <SearchResult
                  result={tvResult.original_name}
                  category="TV Shows"
                  key={tvResult.id}
                  id={tvResult.id}
                />
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
