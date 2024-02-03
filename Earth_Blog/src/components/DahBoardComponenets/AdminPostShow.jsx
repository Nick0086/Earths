import React, { useEffect, useState } from 'react'
import { useSelector } from 'react-redux';
import AdminPostCard from './AdminPostCard';
import Spinner from '../Spinner';
import { useParams } from 'react-router-dom';
import Selector from '../Selector';
import axios from 'axios';
import Pegination from '../Pegination/Pegination';

function AdminPostShow() {

  const [userPosts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [filterValue, setFilterValue] = useState("-view");
  const [filterOption, setFilterOption] = useState("Most view");
  const [status, setStatus] = useState("All");
  const [page, setPage] = useState(1);
  const [totalPage, setTotalPage] = useState(1);
  const userData = useSelector((state) => state.auth.userData);
  const { category } = useParams();

  // function for pagination
  const pageHandler = (no) => {
    setPage(no);
  }

  // function handles the change in the filter option
  const handleFilterChange = (value) => {
    setPage(1);
    switch (value.target.value) {
      case "Most view":
        setFilterValue("-view")
        setFilterOption("Most view")
        break;
      case "Less View":
        setFilterValue("view")
        setFilterOption("Less View")
        break;
      case "New Post":
        setFilterValue("-createdAt")
        setFilterOption("New Post")
        break;
      case "Old Posts":
        setFilterValue("createdAt")
        setFilterOption("Old Posts")
        break;
      default: return null;
    }
  };

  // function handles the change in the status
  const handleStatusChange = (value) => {
    setPage(1);
    setStatus(value.target.value);
  };

  // function constructs the base URL for fetching user posts based on category, status, and filter options
  const UserPostHandler = () => {

    setLoading(false);

    let baseURL = `${import.meta.env.VITE_URL}/posts/post`
    const queryParams = [];

    if (category && category !== "Posts") {
      queryParams.push(`category=${category}`);
    }

    if (category && status && status !== "All") {
      queryParams.push(`status=${status}`);
    }

    if (category && filterValue) {
      queryParams.push(`sort=${filterValue}`);
    }

    if (!category) {
      queryParams.push("sort=-view", "limit=6");
    } else {
      queryParams.push(`page=${page}`)
    }

    const queryString = queryParams.length > 0 ? `?${queryParams.join("&")}` : "";
    const finalUrl = baseURL + queryString;

    axios.get(finalUrl, userData._id)
      .then((res) => {
        setPosts(res.data.data);
        setPage(res.data.page_no);
        setTotalPage(res.data.total_page);
      })
      .finally(() => setLoading(true))
  }

  useEffect(() => {
    setPage(1);
    if(page === 1){
      UserPostHandler();
    }
  }, [ category])

  useEffect(() => {
    UserPostHandler();
  },[page,status, filterValue])



  return (
    <>
      <div className='md:me-4 md:mx-0 mx-4 mb-4 rounded-2xl ' >
        <div className='bg-[#D4D8F0] rounded-2xl p-4 min-h-[86vh]' >
          <div className='mx-auto flex md:flex-row flex-col gap-y-4 justify-between items-center mb-2' >
            <h2 className='md:text-3xl text-2xl font-bold lg:ms-10 ' >{category ? category : "Top Posts"}</h2>
            <div className='flex items-center md:w-auto w-full justify-between'>
              {
                category &&
                <Selector
                  mainDivClass="filter-width flex items-center "
                  selecte={status}
                  options={["All", "Active", "Inactive"]}
                  onChange={handleStatusChange}
                  className="md:mx-2"

                />
              }
              {
                category &&
                <Selector
                  selecte={filterOption}
                  mainDivClass="filter-width flex items-center "
                  options={["Most view", "Less View", "New Post", "Old Posts"]}
                  onChange={handleFilterChange}
                  className="md:mx-2"
                />
              }
            </div>
          </div>
          {
            loading ? userPosts.length !== 0 ? userPosts.map((data) => (<AdminPostCard key={data._id} data={data} />)) :
              <h2 className='text-4xl font-bold flex justify-center items-center h-[70vh] ' >No post available</h2> :
              <Spinner />
          }
          {
            category && totalPage > 1 && <Pegination page={page} total={totalPage} pageHandler={pageHandler}/>
          }
        </div>
      </div>
    </>
  )
}

export default AdminPostShow;