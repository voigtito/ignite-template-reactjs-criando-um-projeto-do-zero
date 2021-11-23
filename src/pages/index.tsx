import { GetStaticProps } from 'next';

import { getPrismicClient } from '../services/prismic';
import Prismic from '@prismicio/client';

import commonStyles from '../styles/common.module.scss';
import styles from './home.module.scss';

interface Post {
  uid?: string;
  first_publication_date: string | null;
  data: {
    title: string;
    subtitle: string;
    author: string;
  };
}

interface PostPagination {
  next_page: string;
  results: Post[];
}

interface HomeProps {
  postsPagination: PostPagination;
}

export default function Home() {

  return <div></div>

}

export const getStaticProps = async (props) => {
  const prismic = getPrismicClient();
  const postsResponse = await prismic.query([
    // Search all documents where the type is posts.
    Prismic.predicates.at('document.type', 'posts')
  ],
    {
      fetch: ['post.title', 'post.content'],
      pageSize: 20,
    }
  );

  return {
    props: {
      posts: postsResponse
    }
  }

};
