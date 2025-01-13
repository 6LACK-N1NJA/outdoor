import { getArticle } from '@/api/strapiCalls';

import Link from "next/link";
import Image from "next/image";

export default async function DestinationArticleCard({ article, topicSlug }) {
  const { title, slug } = article;
  const fullArticle = await getArticle(slug);
  const { cover } = fullArticle.blogData;

  
  
    return (
      <Link href={`/trekking/${slug}`}>
      <div className="relative h-64 w-80 rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
        <div
          className="bg-cover bg-center h-full w-full bg-green-400"
          
        >
          <Image
            src={cover.data?.attributes.formats.small.url}
            alt={title}
            layout="fill"
            objectFit="cover"
          />
          
          <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
            <h3 className="text-white text-lg sm:text-base md:text-base font-bold text-center px-4">
              {title}
            </h3>
          </div>
        </div>
      </div>
    </Link>
    
    );
  };
  


