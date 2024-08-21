
export default function  BlogPostPage({params}) {
    return(
        <main>
            <h1>
                블로그임
            </h1>
            <p>
                {params.slug}
            </p>


        </main>

    )


}