import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner';
import PostCard from '../PostCard/PostCard';
import Selector from '../Selector';
import Button from '../Button';
import axios from 'axios';

import { ToastContainer, toast } from 'react-toastify';
import Pegination from '../Pegination/Pegination';
import { redirect, useNavigate, useParams } from 'react-router-dom';


function AllPosts() {

  const [userPosts, setUserPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  // const [category, setCategory] = useState();
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState();
  const {category} = useParams();
  const navigate = useNavigate();

  // function for pagination
  const pageHandler = (no) => {
    setPage(no);
  }


  const AsideBarMenu = ["Category", "Personal", "News", "Sport", "Travel", "Food", "Fashion", "Finance", "Music", "Business", "Lifesyle"]

  const handleFilterChange = (value) => {
    setPage(1);
    if (value.target.value !== "Category") {
      navigate(`${value.target.value}`)
    }else{
      navigate("/AllPosts");
    }
  };

  // Fetch posts when the component mounts and update state with data
  useEffect(() => {

    setLoading(false)
    let baseURL = `${import.meta.env.VITE_URL}/posts/post`

    const queryParams = ['status=Active', `page=${page}`, 'limit=30'];

    if (category && category !== "Category") {
      queryParams.push(`category=${category}`);
    }
    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";

    const finalUrl = baseURL + queryString;

    axios.get(finalUrl)
      .then((res) => {
        setUserPosts(res.data.data);
        setPage(res.data.page_no);
        setTotalPage(res.data.total_page);
      })
      .finally(() => setLoading(true))
  },[page,category]);

  return (
    <>
      <div className='' >
        <div className='lg:w-[95%] mx-auto flex justify-between items-center mb-6' >
          <h2 className='md:text-3xl text-center text-2xl font-bold ' >{category ? category : "All Posts"}</h2>
          <Selector
            mainDivClass="filter-width flex items-center "
            options={AsideBarMenu}
            onChange={handleFilterChange}
          />
        </div>
        {
          loading ?
            <>
              <div className='grid grid-cols-12 md:gap-8 md:gap-y-10 gap-y-6' >
                {userPosts.length !== 0 ? userPosts.map((data) => (
                  <div className='lg:col-span-4 md:col-span-6 col-span-12' key={data._id}>
                    <PostCard post={data} />
                  </div>
                )) :
                  <h2 className='col-span-12 text-4xl font-bold flex justify-center items-center h-[50vh] ' >No post available</h2>
                }
              </div>

              {
                totalPage > 1 && <Pegination page={page} total={totalPage} pageHandler={pageHandler} />
              }
            </>
            :
            <div className='col-span-full' >
              <Spinner />
            </div>

        }
      </div>
    </>
  )
}
export default AllPosts;