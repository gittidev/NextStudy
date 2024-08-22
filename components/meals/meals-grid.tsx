import classses from './meals-grid.module.css'
import MealItem from './meal-item';


export interface MealType {
  id : number;
  title : string;
  slug : string;
  image : string | File ;
  summary : string;
  creator : string;
  creator_email : string;
  instructions : string;
}

export interface MealsGridProps {
  meals :  MealType[]
}

export default function MealsGrid({meals}:MealsGridProps) {
  return <ul className={classses.meals }>
    {meals.map((meal) => <li key={meal.id}>
        <MealItem {...meal}/>
    </li>)}

  </ul>
}