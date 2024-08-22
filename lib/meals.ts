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
    // slugify를 사용하여 slug로 변환하고 소문자로 전환
    meal.slug = slugify(meal.title, { lower: true });

    // xss 라이브러리를 사용하여 instructions 필드를 검증
    meal.instructions = xss(meal.instructions);

    // 이미지 처리
    let fileName = '';
    if (typeof meal.image === 'string') {
        // 문자열일 경우 (Base64 또는 URL)
        if (meal.image.startsWith('data:image')) {
            // Base64 데이터 URL로 시작하는 경우 (data:image/jpeg;base64,...)
            const base64Data = meal.image.split(',')[1]; // Base64 데이터 추출
            const extension = meal.image.split(';')[0].split('/')[1]; // 확장자 추출
            fileName = `${meal.slug}.${extension}`;

            const buffer = Buffer.from(base64Data, 'base64');
            fs.writeFileSync(`public/images/${fileName}`, buffer);
        } else {
            // URL로 처리 (저장하지 않고 URL을 그대로 사용)
            fileName = meal.image;
        }
    } else if (meal.image instanceof ArrayBuffer) {
        // ArrayBuffer일 경우 파일로 저장
        const extension = 'jpeg'; // 기본 확장자 설정 (필요시 조정)
        fileName = `${meal.slug}.${extension}`;

        const stream = fs.createWriteStream(`public/images/${fileName}`);
        stream.write(Buffer.from(meal.image));
        stream.end();
    }

    console.log(`Image saved as or referenced by ${fileName}`);
}