import Link from 'next/link'

export default  function BlogPage() {
    return (
        <main>
            <h1>The Blog</h1>
            <p><Link href='/blog/post-1'>POST 1 </Link></p>
            <p><Link href='/blog/post-2'>POST 2 </Link></p>

        </main>


    )
}