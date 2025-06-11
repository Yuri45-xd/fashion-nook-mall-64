
import Header from "../components/Header";
import Footer from "../components/Footer";
import { CalendarDays, User, Clock } from "lucide-react";
import { Card, CardContent, CardFooter } from "@/components/ui/card";

const Stories = () => {
  // Sample stories data with reliable images
  const stories = [
    {
      id: 1,
      title: "From Startup to Industry Leader: The Fashion Zone Story",
      excerpt: "How a small team with big dreams transformed online fashion retail.",
      image: "https://images.unsplash.com/photo-1556761175-b413da4baf72?auto=format&fit=crop&w=800&q=80",
      author: "Alex Johnson",
      date: "June 12, 2024",
      readTime: "6 min read"
    },
    {
      id: 2,
      title: "Sustainability in Fashion: Our Commitment",
      excerpt: "Discover how Fashion Zone is working towards a more sustainable fashion future.",
      image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?auto=format&fit=crop&w=800&q=80",
      author: "Maya Patel",
      date: "May 28, 2024",
      readTime: "4 min read"
    },
    {
      id: 3,
      title: "Behind the Scenes: Our Design Process",
      excerpt: "A look into how our design team creates the latest collections.",
      image: "https://images.unsplash.com/photo-1441986300917-64674bd600d8?auto=format&fit=crop&w=800&q=80",
      author: "Sam Carter",
      date: "April 15, 2024",
      readTime: "8 min read"
    },
    {
      id: 4,
      title: "Customer Stories: Fashion That Changed Lives",
      excerpt: "Real stories from customers about how finding the right style boosted their confidence.",
      image: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=800&q=80",
      author: "Jessica Kim",
      date: "March 22, 2024",
      readTime: "5 min read"
    }
  ];

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <main className="flex-grow bg-gray-50">
        <div className="bg-flipkart-blue text-white py-16">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl font-bold mb-4">Fashion Zone Stories</h1>
            <p className="text-xl max-w-3xl mx-auto">
              Insights, updates, and stories from our team and community
            </p>
          </div>
        </div>
        
        <section className="container mx-auto py-12 px-4">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 gap-8">
            {stories.map(story => (
              <Card key={story.id} className="overflow-hidden hover:shadow-lg transition-shadow">
                <div className="h-64 overflow-hidden">
                  <img 
                    src={story.image} 
                    alt={story.title}
                    className="w-full h-full object-cover transition-transform duration-500 hover:scale-105"
                  />
                </div>
                <CardContent className="pt-6">
                  <h2 className="text-2xl font-bold mb-2 hover:text-flipkart-blue transition-colors">
                    {story.title}
                  </h2>
                  <p className="text-gray-600 mb-4">{story.excerpt}</p>
                </CardContent>
                <CardFooter className="border-t pt-4 text-sm text-gray-500 flex justify-between">
                  <div className="flex items-center">
                    <User className="h-4 w-4 mr-1" />
                    <span>{story.author}</span>
                  </div>
                  <div className="flex items-center">
                    <CalendarDays className="h-4 w-4 mr-1" />
                    <span>{story.date}</span>
                  </div>
                  <div className="flex items-center">
                    <Clock className="h-4 w-4 mr-1" />
                    <span>{story.readTime}</span>
                  </div>
                </CardFooter>
              </Card>
            ))}
          </div>
          
          <div className="mt-12 text-center">
            <button className="bg-flipkart-blue text-white px-6 py-3 rounded inline-block hover:bg-blue-700 transition-colors">
              Load More Stories
            </button>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
};

export default Stories;
