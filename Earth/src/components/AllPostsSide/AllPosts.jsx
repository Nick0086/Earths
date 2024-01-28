import React, { useEffect, useState } from 'react'
import Spinner from '../Spinner/Spinner';
import PostCard from '../PostCard/PostCard';
import postService from '../../Appwrite/PostData';
import Selector from '../Selector';
import Button from '../Button';


function AllPosts() {

    const [userPosts, setPosts] = useState([]);
    const [loading, setLoading] = useState(false);
    const [category, setCategory] = useState();
    const [offset,setOffset] = useState(0);
    const [totalPage,setTotalPage] = useState();

    const AsideBarMenu = ["Category", "Personal", "News", "Sport", "Travel", "Food", "Fashion", "Finance", "Music", "Business", "Lifesyle"]

    const handleFilterChange = (value) => {
        if (value.target.value === "Category") {
            setCategory(null);
        } else {
            setCategory(value.target.value);
        }
    };

    const filterpost = {
        Category: category ? category : null,
        offset,
    }

    const getpost = async () => {
        setLoading(false)
        try {
            await postService.getFiterPost({ ...filterpost })
                .then((res) => {
                    let sortedPosts = res.documents.sort(() => 0.5 - Math.random());
                    setPosts(sortedPosts);
                    setTotalPage(res.total);
                })
        } catch (error) {
            console.error(error)
        }
        setLoading(true);
    }
    useEffect(() => {
        getpost();
    }, [category,offset])

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
                                    <div className='lg:col-span-4 md:col-span-6 col-span-12' key={data.$id}>
                                        <PostCard post={data} />
                                    </div>
                                )) :
                                    <h2 className='col-span-12 text-4xl font-bold flex justify-center items-center h-[50vh] ' >No post available</h2>
                                }
                            </div>

                            <div className='text-center mt-8' >
                                <Button classname='md:w-[70px] md:py-[8px] rounded-lg mx-2' onClick={() => setOffset(offset - 15)} disable={offset <= 0}  >Prev</Button>
                                <Button classname='md:w-[70px] md:py-[8px] rounded-lg mx-2' onClick={() => setOffset(offset + 15)} disable={offset + 15 >= totalPage} >Next</Button>
                            </div>
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