// next.js에서 제공하는 기능중에 error와 관련하여 기본적으로 props로 전달해주는 값이 있음
// 따라서 props를 통해 error를 전달 받을것

'use client'

export default function Error() {
    return <main className = 'error'>
        <h1>An error occurred! </h1>
        <p>Failed to fetch meal data, Please try again later</p>
    </main>


}