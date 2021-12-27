import { RandomRecipe, LastRecipes } from "components";
import { useActions } from "hooks/useActions";
import { useEffect } from "react";
import { useAppSelector } from "store";
import styles from './pages.module.scss'

const Home = () => {
  const {fetchAllRecipes} = useActions();
  
  useEffect(()=> {
    fetchAllRecipes();
  }, []);

  const recipes = useAppSelector((state) => state.recipes.data);
  
  return (
    <div className={styles.pages__center}>
      <RandomRecipe recipes={recipes}/>
      <LastRecipes recipes={recipes} />
    </div>
  );
};

export default Home;