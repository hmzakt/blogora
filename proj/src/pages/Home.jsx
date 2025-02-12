import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import appwriteService from "../appwrite/config";
import { useSelector } from 'react-redux';
import { Container, Postcard } from "../components";


function AltHome() {
  const authStatus = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  const navItems = [
    {
      name: 'Create',
      slug: '/add-post',
      active: authStatus,
      image : "/svgs/create.svg"
    },
    {
      name: 'All posts',
      slug: '/all-posts',
      active: authStatus, 
      image : "/svgs/allposts.svg"// Only show when authenticated
    }
  ];

  const [posts, setPosts] = useState([]);
  const [visiblePosts, setVisiblePosts] = useState(5);

  useEffect(() => {
    appwriteService.getPosts()
      .then((posts) => {
        if (posts) {
          setPosts(posts.documents);
        }
      })
      .catch((error) => {
        console.error("Error fetching posts:", error);
      });
  }, []);

  const loadMorePosts = () => {
    setVisiblePosts((prev) => prev + 5);
  };

  if (posts.length === 0) {
    return (
      <div className='flex flex-row flex-wrap'>
      <div className="w-full lg:w-[80%] py-8 min-h-80">
        <Container>
          <div className="text-2xl mb-6 pl-8">
            Loading...
          </div>
        </Container>
      </div>
      
      <div className='w-[20%] py-8 pt-20 justify-center items-start hidden lg:block p'>
        <ul className>
          {navItems.map((item) =>
            item.active ? (
              <li key={item.name}>
                <button
                  bgColor="bg-transparent"
                  onClick={() => navigate(item.slug)}
                  className="px-4 ml-20 mb-10 py-2 h-40 w-40 text-black"
                >
                  <div>
                    <img src={item.image} alt={item.name} />
                  </div>
                  <div>
                    {item.name}
                  </div>
                </button>
              </li>
            ) : (
              alert("You need to login to begin")
            )
          )}
        </ul>
      </div>
    </div>
      );
  }

  return (
    <div className='flex flex-row flex-wrap'>
  <div className="w-full lg:w-[80%] py-8 min-h-80">
    <Container>
      <div className="text-2xl mb-6 pl-8">
        Recent Posts...
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-4">
        {posts.slice(0, visiblePosts).map((post) => (
          <div key={post.$id} className="p-2">
            <Postcard {...post} />
          </div>
        ))}
      </div>
      {visiblePosts < posts.length && (
        <div className="flex justify-center mt-8">
          <button
            onClick={loadMorePosts}
            className="bg-black text-white px-4 py-2 rounded-3xl  hover:bg-grey transition-colors"
          >
            Load More
          </button>
        </div>
      )}
    </Container>
  </div>
  
  {/* Navigation buttons - only visible on large screens */}
  <div className='w-[20%] py-8 pt-20 justify-center items-start hidden lg:block p'>
    <ul className>
      {navItems.map((item) =>
        item.active ? (
          <li key={item.name}>
            <button
              bgColor="bg-transparent"
              onClick={() => navigate(item.slug)}
              className="px-4 ml-20 mb-10 py-2 h-40 w-40 text-black"
            >
              <div>
                <img src={item.image} alt={item.name} />
              </div>
              <div>
                {item.name}
              </div>
            </button>
          </li>
        ) : (
          alert("You need to login to begin")
        )
      )}
    </ul>
  </div>
</div>
  );
}

export default AltHome;