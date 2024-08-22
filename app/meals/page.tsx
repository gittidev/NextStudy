import { Suspense } from 'react';
import classes from './page.module.css'
import Link from 'next/link';
import MealsGrid from '@/components/meals/meals-grid';
import { getMeals } from '@/lib/meals';
import MealsLoadingPage from './loading-out';


// 데이터를 가져오는 부분을 별도로 분리해줌
async function Meals() {
  const meals= await getMeals();
  return <MealsGrid meals={[...meals]}/>
}

export default function MealsPage() {

    return (
      <>
        <header className={classes.header}>
          <h1>
            Delicious meals, created <span className={classes.highlight}>by you</span>
          </h1>
          <p>
            Choose your favorite recipe and cook it yourself.
          </p>
          <p className={classes.cta}>
            <Link href='/meals/share'>Share your Favorite Recipe</Link>
          </p>
        </header>
        <main className={classes.main}>
            <Suspense fallback={<MealsLoadingPage/>}>
            <Meals/>
            </Suspense>
        </main>
      </>
    );
  }
  