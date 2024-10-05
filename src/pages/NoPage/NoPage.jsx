import { Link } from "react-router-dom";
import NotFoundImage from "../../assets/images/not-found.png";

const NoPage = () => {
  return (
    <div className="not-found-page">
      <img src={NotFoundImage} />
      <p>לא מצאנו את העמוד שחיפשת</p>
      <Link to="/recipes/">לעמוד הבית</Link>
    </div>
  );
};

export { NoPage };
