import { useParams } from "react-router-dom";
import { recipes } from "../../assets/data";
import { ClockIcon, FileIcon, QuantityIcon } from "../../assets/icons";

const listProps = {
  ingredients: {
    displayName: "מצרכים",
  },
  steps: {
    displayName: "אופן הכנה",
  },
  comments: {
    displayName: "הערות",
  },
};

const RecipePage = () => {
  const { recipeId } = useParams();
  const recipe = recipes[recipeId];

  return (
    <>
      <div className="recipe-page-image">
        <img src={recipe.image} />
      </div>
      <div className="recipe-page">
        <h2>{recipe.title}</h2>
        <div className="quick-look">
          <div className="quick-look-item">
            <ClockIcon />
            <p>{recipe.duration}</p>
          </div>
          <div className="quick-look-item">
            <QuantityIcon />
            <p>{recipe.quantity}</p>
          </div>
          {recipe.link && (
            <div className="quick-look-item">
              <FileIcon />
              <a target="_blank" rel="noreferrer" href={recipe.link}>
                למתכון המקורי
              </a>
            </div>
          )}
        </div>
        {Object.keys(listProps)
          .filter((list) => recipe[list].length)
          .map((list) => (
            <div key={list} className="recipe-list">
              <h3>{listProps[list].displayName}</h3>
              <ul>
                {recipe[list].map((listItem, i) => (
                  <li key={i}>{listItem}</li>
                ))}
              </ul>
            </div>
          ))}
      </div>
    </>
  );
};

export { RecipePage };
