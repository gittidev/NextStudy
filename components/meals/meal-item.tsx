import Link from 'next/link';
import Image from 'next/image';
import classes from './meal-item.module.css';
import { MealType } from './meals-grid';

export default function MealItem({
  id,
  title,
  slug,
  image,
  summary,
  creator,
  creator_email,
  instructions,
}: MealType) {

  // 이미지 URL 처리
  const imageSrc = typeof image === 'string' ? image : URL.createObjectURL(image);

  return (
    <article className={classes.meal}>
      <header>
        <div className={classes.image}>
          {/* 이미지 사이즈를 알지 못할때 대안 fill */}
          <Image src={imageSrc} alt={title} fill />
        </div>
        <div className={classes.headerText}>
          <h2>{title}</h2>
          <p>by {creator}</p>
        </div>
      </header>
      <div className={classes.content}>
        <p className={classes.summary}>{summary}</p>
        <div className={classes.actions}>
          <Link href={`/meals/${slug}`}>View Details</Link>
        </div>
      </div>
    </article>
  );
}
