import LeftSide from '../LeftSideBar/LeftSide'
import NavBar from '../NavBar/NavBar'
import RightSide from '../RightSideBar/RightSide'

import { useState, useEffect } from 'react';
import axios from 'axios';


const News = () => {

    const [posts, setPosts] = useState([]);

  useEffect(() => {
    const subreddit = 'learnprogramming';
    const timeFilter = 'week';
    const endpoint = `https://www.reddit.com/r/${subreddit}/top.json?t=${timeFilter}&limit=9`;

    axios.get(endpoint).then((response) => {
      setPosts(response.data.data.children.map((post) => post.data));
    });
  }, []);




  return (


    // <div className='w-full'>
    //   <div className="fixed top-0 z-10 w-full bg-white">
    //     <NavBar />
    //   </div>
    //   <div className='flex bg-gray-100'>
    //     <div className="flex-auto w-[20%] fixed top-12">
    //       <LeftSide />
    //     </div>
    //     <div className='flex-auto w-[60%] absolute left-[20%] top-14 bg-gray-100 rounded-xl'>
    //       <div className="w-[80%] mx-auto">
    //         <div className='text-2xl mb-6 mt-6'>Best of REDDIT this week</div>
    //         <div>
    //           {/* <h2>Top Posts of the Week on /r/learnprogramming</h2> */}
    //           <ul className="grid grid-cols-1 gap-4" style={{ gridTemplateColumns: '1fr' }}>
    //             {posts.map((post) => (
    //               <li key={post.id} className="bg-white rounded-lg shadow-md overflow-hidden mb-4">
    //                 <a href={`https://www.reddit.com${post.permalink}`} className="block px-4 py-2 text-lg text-left font-semibold text-gray-900 hover:text-gray-700">
    //                   {post.title}
    //                 </a>
    //               </li>
    //             ))}
    //           </ul>
    //         </div>
    //       </div>
    //     </div>
    //     <div className="flex-auto w-[20%] fixed right-0 top-12">
    //       <RightSide />
    //     </div>
    //   </div>
    // </div>

    <div className="w-full">
    <div className="fixed top-0 z-10 w-full bg-white">
      <NavBar />
    </div>
    <div className="flex bg-gray-100">
      <div className="flex-auto w-[20%] fixed top-12 hidden sm:block">
        <LeftSide />
      </div>
      <div className="flex-auto w-full md:w-[60%] absolute left-0 md:left-[20%] top-14 bg-gray-100 rounded-xl">
        <div className="w-[80%] mx-auto">
          <div className="text-2xl mb-6 mt-6 font-bold text-gray-800">
            Best of REDDIT this week
          </div>
          <div>
            <ul
              className="grid grid-cols-1 gap-4"
              style={{ gridTemplateColumns: '1fr' }}
            >
              {posts.map((post) => (
                <li
                  key={post.id}
                  className="border border-gray-200 hover:bg-gray-100 py-2 px-4 flex items-center justify-between bg-white rounded-md mb-4"
                >
                  <div className="flex items-center">
                    {/* <div className="w-8 h-8 rounded-full overflow-hidden">
        <img src={post.thumbnail} alt="" className="w-full h-full object-cover" />
      </div> */}
                    <div className="ml-3">
                      <a href={`https://www.reddit.com${post.permalink}`}>
                      <div className="font-semibold text-gray-800">
                        {post.title}
                      </div>
                      <div className="text-gray-600">
                        posted by {post.author} to {post.subreddit} •{' '}
                        {post.num_comments} comments
                      </div>
                      </a>
                    </div>
                  </div>
                  <div className="text-gray-500">{post.score} points</div>
                  
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
      <div className="flex-auto w-[20%] fixed right-0 top-12 hidden sm:block">
        <RightSide />
      </div>
    </div>
  </div>



  );
  }

export default News