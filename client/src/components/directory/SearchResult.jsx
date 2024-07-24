import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({ id, result, category }) => {
  const navigate = useNavigate();
  return (
    <div className="search-result" onClick={(e) => navigate(`/browse/${id}`)}>
      <div className="srTitle">{result}</div>
      <div className="category-result">{category}</div>
    </div>
  );
};
export const TvSearchResult = ({ id, tvResult, tvCategory }) => {
  const navigate = useNavigate();
  return (
    <div
      className="search-result"
      onClick={(e) => navigate(`/browse/tv/${id}`)}
    >
      <div className="srTitle">{tvResult}</div>
      <div className="category-result">{tvCategory}</div>
    </div>
  );
};
SearchResult.propTypes = {
  id: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
TvSearchResult.propTypes = {
  id: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
  tvCategory: PropTypes.string.isRequired,
};
