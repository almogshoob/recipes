import { Link } from "react-router-dom";

const RecipeCard = ({ recipe }) => {
  return (
    <Link to={recipe.id}>
      <div className="recipe-card">
        <img src={recipe.image} loading="lazy" />
        <div className="text">
          <p role="title">{recipe.title}</p>
          <p role="description">{recipe.duration}</p>
        </div>
      </div>
    </Link>
  );
};

export { RecipeCard };
