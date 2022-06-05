import Link from 'next/link'
import { client } from '../libs/client'
import { Pagination } from '../components/Pagination';

export default function Home({ blog, category, totalCount }) {
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
      <Pagination totalCount={totalCount} />
    </div>
  )
}

export const getStaticProps = async () => {
  const blog = await client.get({ endpoint: 'blog', queries: { offset: 0, limit: 5, } })
  const category = await client.get({ endpoint: 'categories' })

  return {
    props: {
      blog: blog.contents,
      category: category.contents,
      totalCount: blog.totalCount,
    },
  };
}
