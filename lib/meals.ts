import { arrayBuffer } from 'stream/consumers';
import fs from 'node:fs'
import sql from 'better-sqlite3';
import { MealType } from '@/components/meals/meals-grid';
import slugify from 'slugify';
import xss from 'xss';


const db = sql('meals.db')


export async function getMeals() {
    // all 전체 데이터를 가져올때 사용함
    //단순히 반환만 시키면됨 
    // 추가적으로 async 기능을 사용하여  promise를 반환시킨다. 
    // 이를 활용하여 servercomponent 에서 return 받은 값을 await 시켜 사용할수 있다.

    await new Promise((resolve) =>  setTimeout(resolve, 5000));
    // throw new Error('밥 없음실패')



    return db.prepare('SELECT * FROM meals').all() as MealType[]
}


export function getMeal(slug: string) {
    return db.prepare("SELECT * FROM meals WHERE slug = ?").get(slug) as MealType;

}


export async function saveMeal(meal: MealType) {
    //slugify를 사용하여 해당 값을 slug로 변환해주고, 모두 소문자로 전환해준다,
    meal.slug = slugify(meal.title, {lower:true});
    // meal의 instructions는 dangerouslyHTML을 사용하여 직접적으로 조작되었으므로, 해당 부분의 데이터가 xss에 노출되었는지 검증이 필요함
    //이를 위하여 xss 라이브러리 활용, 검증된 값을 meal에 배정
    meal.instructions = xss(meal.instructions);


    const extention = meal.image.split('.').pop();
    //public 디렉토리에 들어갈 fileName을 지정
    const fileName = `${meal.slug}.${extention}`

    const stream = fs.createWriteStream(`public/images/${fileName}`)
    const buffredImage = await meal.image.arrayBuffer()

    stream.write(Buffer.from(buffredImage))

}