import Link from 'next/link'
import { client } from '../libs/client'

export default function Home({ blog, category }) {
  return (
    <div>
      <ul>
        {category.map((category) => (
          <li key={category.id}>
            <Link href={`/category/${category.id}`}>
              <a>{category.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      <ul>
        {blog.map((blog) => (
          <li key={blog.id} className="text-3xl font-bold underline">
            <Link href={`/blog/${blog.id}`}>
              <a>{blog.title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog' })
  const category = await client.get({ endpoint: 'categories' })

  return {
    props: {
      blog: blog.contents,
      category: category.contents,
    },
  };
}
