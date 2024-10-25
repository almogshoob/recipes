import { Fragment, useMemo, useState } from "react";
import { recipes } from "../../assets/data";
import { FilterIcon, SearchIcon } from "../../assets/icons";
import { RecipeCard } from "../../components";
import { getTodaySeed, shuffle } from "../../utils/utils";

const MainPage = () => {
  const [searchText, setSearchText] = useState("");
  const [isFiltersOpen, setIsFiltersOpen] = useState(false);
  const [filters, setFilters] = useState(
    Object.fromEntries(
      [
        ...new Set(
          Object.values(recipes).reduce(
            (tags, currentRecipe) => tags.concat(currentRecipe.tags),
            []
          )
        ),
      ].map((tag) => [tag, false])
    )
  );

  const recipesList = useMemo(() => {
    const list = Object.entries(recipes).map(([id, value]) => ({
      id,
      ...value,
    }));
    shuffle(list, getTodaySeed());
    return list;
  }, [recipes]);

  const activeFilters = useMemo(() => {
    return Object.keys(filters).filter((filter) => filters[filter]);
  }, [filters]);

  const filteredRecipes = useMemo(() => {
    if (!activeFilters.length) return recipesList;
    return recipesList.filter((recipe) =>
      recipe.tags.some((tag) => activeFilters.includes(tag))
    );
  }, [recipesList, filters]);

  const filteredSearchedRecipes = useMemo(() => {
    if (!searchText.length) return filteredRecipes;
    return filteredRecipes.filter((recipe) =>
      recipe.title.includes(searchText)
    );
  }, [filteredRecipes, searchText]);

  const toggleShowFilters = () => setIsFiltersOpen((prev) => !prev);

  const toggleFilter = (filter) =>
    setFilters((prev) => ({ ...prev, [filter]: !prev[filter] }));

  const handleSearchChange = (event) => {
    setSearchText(event.target.value);
  };

  return (
    <>
      <div className="search">
        <div className="searchbar-wrapper">
          <SearchIcon />
          <input
            type="text"
            className="searchbar"
            placeholder="חיפוש"
            value={searchText}
            onChange={handleSearchChange}
          />
          <FilterIcon
            className="filter-toggle"
            onClick={toggleShowFilters}
            fill={
              Object.values(filters).filter((f) => f).length
                ? "currentColor"
                : "none"
            }
          />
        </div>
        <div className="height-transition-wrapper" open={isFiltersOpen}>
          <div className="tags">
            {Object.keys(filters).map((tag) => (
              <Fragment key={tag}>
                <input
                  type="checkbox"
                  id={tag}
                  onChange={() => toggleFilter(tag)}
                />
                <label htmlFor={tag}>{tag}</label>
              </Fragment>
            ))}
          </div>
        </div>
      </div>
      <div className="recipes-grid">
        {filteredSearchedRecipes.map((recipe) => (
          <RecipeCard key={recipe.id} recipe={recipe} />
        ))}
      </div>
    </>
  );
};

export { MainPage };
