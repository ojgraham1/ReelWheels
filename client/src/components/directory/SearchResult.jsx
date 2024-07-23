import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";

export const SearchResult = ({ id, result, category }) => {
  const navigate = useNavigate();
  return (
    <div className="search-result" onClick={(e) => navigate(`/browse/${id}`)}>
      <div>{result}</div>
      <div className="category-result">{category}</div>
    </div>
  );
};
SearchResult.propTypes = {
  id: PropTypes.number.isRequired,
  result: PropTypes.string.isRequired,
  category: PropTypes.string.isRequired,
};
