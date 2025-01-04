import { FC, useMemo } from 'react';
import { Preloader } from '../ui/preloader';
import { IngredientDetailsUI } from '../ui/ingredient-details';
import { useParams } from 'react-router-dom';
import { useSelector } from '../../services/store';
import { getIngredientsSelector } from '../../services/slices/burgerIngredientsSlice';

export const IngredientDetails: FC = () => {
  const params = useParams();
  const { ingredients } = useSelector(getIngredientsSelector);

  const ingredientData = useMemo(
    () => ingredients.find((ingredient) => ingredient._id === params.id),
    [params, ingredients]
  );

  if (!ingredientData) {
    return <Preloader />;
  }

  return <IngredientDetailsUI ingredientData={ingredientData} />;
};
