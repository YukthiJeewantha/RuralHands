const Article = ({ date, image, title, description, category, onReadMore, index }) => {
    return (
        <div 
            className={`group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-500 overflow-hidden transform hover:-translate-y-2 ${
                index % 2 === 0 ? 'md:flex-row' : 'md:flex-row-reverse'
            } flex flex-col md:flex h-96`}
        >
            <div className="md:w-1/4 flex items-center justify-center p-6 bg-gradient-to-br from-amber-50 to-orange-50">
                <div className="text-center">
                    <div className="text-4xl font-bold text-amber-700 mb-2">{date}</div>
                    <div className="text-sm text-amber-600 font-medium uppercase tracking-wider">{category}</div>
                </div>
            </div>
            
            <div className="md:w-3/4 flex flex-col md:flex-row">
                <div className="md:w-2/5 relative overflow-hidden">
                    <img 
                        src={image} 
                        alt={title}
                        className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="md:w-3/5 p-8 flex flex-col justify-center">
                    <h2 className="text-2xl md:text-3xl font-bold text-gray-800 mb-4 group-hover:text-amber-700 transition-colors duration-300">
                        {title}
                    </h2>
                    <p className="text-gray-600 leading-relaxed mb-6 text-lg line-clamp-4">
                        {description}
                    </p>
                    <button 
                        className="self-start bg-gradient-to-r from-amber-600 to-orange-600 text-white px-8 py-3 rounded-full font-semibold uppercase tracking-wide hover:from-amber-700 hover:to-orange-700 transform hover:scale-105 transition-all duration-300 shadow-lg hover:shadow-xl"
                        onClick={onReadMore}
                    >
                        Explore More
                        <span className="ml-2 inline-block transition-transform group-hover:translate-x-1">→</span>
                    </button>
                </div>
            </div>
        </div>
    );
};

const ContentSection = () => {
    const articles = [
        {
            date: "JAN",
            category: "Textiles",
            image: "https://images.unsplash.com/photo-1665394786439-6e69125428a0?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Handwoven Textiles",
            description: "Discover the intricate art of traditional handwoven textiles, where each thread tells a story of generations-old craftsmanship. Our collection features vibrant patterns and natural dyes that reflect the rich cultural heritage of rural communities. From silk sarees to cotton fabrics, each piece is woven with precision and passion.",
            link: ""
        },
        {
            date: "FEB",
            category: "Woodwork",
            image: "https://images.unsplash.com/photo-1688240817677-d28b8e232dd4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Wooden Masterpieces",
            description: "Our wooden handicrafts showcase the natural beauty of sustainably sourced timber, transformed into functional art pieces. From intricate carvings to elegant furniture, each piece celebrates the harmony between nature and craftsmanship. Traditional techniques meet modern design in these timeless creations.",
            link: ""
        },
        {
            date: "MAR",
            category: "Jewelry",
            image: "https://plus.unsplash.com/premium_photo-1691411181428-88e656b14134?w=600&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8OXx8c3JpJTIwbGFua2FuJTIwaGFuZHljcmFmdCUyMGpld2VsbGVyeXxlbnwwfHwwfHx8MA%3D%3D",
            title: "Handcrafted Jewelry",
            description: "Adorn yourself with our exquisite collection of handmade jewelry, featuring traditional designs and natural materials. Each piece is carefully crafted to celebrate the unique beauty and cultural significance of rural artistry. From silver ornaments to beaded necklaces, discover accessories that tell a story.",
            link: ""
        },
        {
            date: "APR",
            category: "Statues",
            image: "https://images.unsplash.com/photo-1726931536196-a5cfebff5860?q=80&w=765&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Sculptural Statues",
            description: "Witness the mastery of traditional sculpture through our collection of handcrafted statues. Each piece is meticulously carved from stone, wood, or clay, bringing ancient stories and cultural symbols to life. These sculptures represent the spiritual and artistic heritage of rural craftsmen, perfect for adding cultural depth to your space.",
            link: ""
        },
        {
            date: "MAY",
            category: "Baskets",
            image: "https://images.unsplash.com/photo-1695391353234-ee14eba4ee2c?q=80&w=687&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Woven Baskets",
            description: "Our handwoven baskets combine functionality with artistic beauty, made from natural fibers and traditional weaving techniques. Perfect for storage, decoration, or as thoughtful gifts that connect you to rural traditions. Each basket is woven with care, using sustainable materials like bamboo, palm leaves, and natural grasses.",
            link: ""
        },
        {
            date: "JUN",
            category: "Kitchen Items",
            image: "https://images.unsplash.com/photo-1730597363352-0a8fe6eb5d12?q=80&w=769&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Traditional Kitchen Crafts",
            description: "Transform your culinary experience with our handcrafted kitchen items, made by skilled artisans using time-honored techniques. From clay pots and wooden spoons to copper vessels and bamboo utensils, each piece brings authentic rural charm to your kitchen while maintaining exceptional functionality and durability.",
            link: ""
        },
        {
            date: "JUL",
            category: "Pottery",
            image: "https://images.unsplash.com/photo-1662845114342-256fdc45981d?q=80&w=688&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
            title: "Ceramic Artistry",
            description: "Explore our stunning collection of handcrafted ceramics, from functional kitchenware to decorative pieces. Each item is lovingly shaped by skilled artisans using traditional techniques passed down through generations. The pottery reflects the earth's natural beauty, glazed with colors inspired by rural landscapes.",
            link: ""
        },
    ];

    const handleReadMore = (article) => {
        // Navigate to the specific article page
        window.open(article.link, '_blank');
    };

    return (
        <section className="py-16 bg-gradient-to-br from-gray-50 to-amber-50/30">
            <div className="max-w-7xl mx-auto px-4">
                <div className="text-center mb-16">
                    <h2 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
                        Artisan Collections
                    </h2>
                    <div className="mt-6 w-32 h-1 bg-gradient-to-r from-amber-500 to-orange-500 mx-auto rounded-full"></div>
                    <p className="text-xl text-gray-600 max-w-3xl mx-auto mt-6">
                        Each piece in our collection represents hours of dedicated craftsmanship, 
                        preserving traditional techniques while creating timeless beauty
                    </p>
                </div>
                
                <div className="space-y-12">
                    {articles.map((article, index) => (
                        <Article 
                            key={index} 
                            date={article.date}
                            category={article.category}
                            image={article.image} 
                            title={article.title} 
                            description={article.description} 
                            onReadMore={() => handleReadMore(article)}
                            index={index}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

const Blog = () => {
    return (
        <div className="min-h-screen bg-gray-50">
            <ContentSection />
        </div>
    );
};

export default Blog;