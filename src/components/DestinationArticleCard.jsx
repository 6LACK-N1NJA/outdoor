import Link from "next/link";

const DestinationArticleCard = ({ article }) => {
    const { attributes } = article;
    const { title, topicSlug, slug, image } = attributes;
  
    return (
      <Link href={`/trekking/${slug}`}>
        <div className="relative rounded-lg overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
          {/* Background image */}
          <div
            className="bg-cover bg-center h-64 sm:h-80 md:h-96"
            style={{ backgroundImage: `url(${image?.data?.attributes?.url})` }}
          >
            {/* Overlay with text */}
            <div className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center">
              <h3 className="text-white text-lg sm:text-xl md:text-2xl font-bold text-center px-4">
                {title}
              </h3>
            </div>
          </div>
        </div>
      </Link>
    );
  };
  
  export default DestinationArticleCard;
  