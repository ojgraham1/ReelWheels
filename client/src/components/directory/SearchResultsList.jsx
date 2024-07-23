import { SearchResult } from "./SearchResult";
import { TvSearchResult } from "./SearchResult";

export const SearchResultsList = ({ browseResults, nowPlayingResults }) => {
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
                <div className="resLi">
                  {/* <hr></hr> */}
                  <SearchResult
                    result={nowPlayingResult.title}
                    category="Now Playing"
                    key={nowPlayingResult.id}
                    id={nowPlayingResult.id}
                  />
                </div>
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
                <div className="resLi">
                  <SearchResult
                    result={browseResult.title}
                    category="All Movies"
                    key={browseResult.id}
                    id={browseResult.id}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};

export const TvSearchResultsList = ({ tvResults }) => {
  return (
    <div>
      <div className="Results-Lists">
        {tvResults && tvResults.length > 0 && (
          <div className="tv-Result-List">
            <div className="subcategory">
              <h3>TV Shows</h3>
            </div>
            {tvResults.map((tvResult) => {
              return (
                <div className="resLi">
                  <TvSearchResult
                    tvResult={tvResult.original_name}
                    tvCategory="TV Shows"
                    key={tvResult.id}
                    id={tvResult.id}
                  />
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
};
