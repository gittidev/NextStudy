import classses from './meals-grid.module.css'

interface Meal {
  id : string;
}

interface MealsGridProps {
  meals :  Meal[]
}

export default function MealsGrid({meals}:MealsGridProps) {
  return <ul className={classses.meals }>
    {meals.map((meal) => <li key={meal.id}>

    </li>)}

  </ul>
}