import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import "./AdminPostShow.css"
import AdminPostCard from '../AdminPostCard/AdminPostCard';
import postService from '../../Appwrite/PostData';
import Spinner from '../Spinner/Spinner';
import { useParams } from 'react-router-dom';
import Selector from '../Selector';

function AdminPostShow() {

  const [userPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("Most view")
  const [status, setStatus] = useState("All");
  const userData = useSelector((state) => state.auth.userData);
  const { category } = useParams();
  const filterpost = {
    userId: userData.$id,
    Category: category ? category : null,
    Status:status,
  }

  const handleFilterChange = (value) => {
    setFilterValue(value.target.value);
  };
  const handleStatusChange = (value) => {
    setStatus(value.target.value);
  };

  const getpost = async () => {
    setLoading(false)
    try {
      await postService.getFiterPost({ ...filterpost })
        .then((res) => {
          let sortedPosts;
          switch (filterValue) {
            case "Most view":
              sortedPosts = res.documents.sort((a, b) => b.View - a.View);
              break;
            case "Less View":
              sortedPosts = res.documents.sort((a, b) => a.View - b.View);
              break;
            case "New Post":
              sortedPosts = res.documents.sort((a, b) => new Date(b.$createdAt) - new Date(a.$createdAt));
              break;
            case "Old Posts":
              sortedPosts = res.documents.sort((a, b) => new Date(a.$createdAt) - new Date(b.$createdAt));
              break;
            default:
              sortedPosts = res.documents;
          }

          if (category === undefined) {
            const topPost = sortedPosts.slice(0, 6);
            setPosts(topPost)
          } else {
            setPosts(sortedPosts)
          }
        })
    } catch (error) {
      console.error(error)
    }
    setLoading(true);
  }

  useEffect(() => {
    getpost();
  }, [category, filterValue,status])


  return (
    <>
      <div className='md:me-4 md:mx-0 mx-4 mb-4 rounded-2xl ' >
        <div className='bg-[#D4D8F0] rounded-2xl p-4 min-h-[86vh]' >
          <div className='lg:w-[85%] mx-auto flex justify-between items-center mb-2' >
            <h2 className='md:text-3xl text-2xl font-bold ' >{category ? category : "Top Posts"}</h2>
            <div className='flex items-center'>
              {
                category && 
                <Selector
                mainDivClass="filter-width flex items-center "
                options={["All", "Active", "Inactive"]}
                onChange={handleStatusChange}
                className="mx-2"
              />
              }
              <Selector
                mainDivClass="filter-width flex items-center "
                options={["Most view", "Less View", "New Post", "Old Posts"]}
                onChange={handleFilterChange}
                className="mx-2"
              />
            </div>
          </div>
          {
            loading ? userPosts.length !== 0 ? userPosts.map((data) => (<AdminPostCard key={data.$id} data={data} getpost={getpost} />)) :
              <h2 className='text-4xl font-bold flex justify-center items-center h-[70vh] ' >No post available</h2> :
              <Spinner />
          }
        </div>
      </div>
    </>
  )
}

export default AdminPostShow;