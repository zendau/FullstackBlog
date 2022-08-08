import "./postList.scss"
import React, { useEffect, useMemo, useState, Suspense, useRef } from 'react';
import { IPost } from "@/interfaces/IPost";
import { useTypedSelector } from "@/hooks/useTypedSelector";
import Filter from "./filter";
import FetchLoader from "@/components/UI/fetchLoader/fetchLoader";
import PostCard from './postCard'

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp } from "@fortawesome/free-solid-svg-icons";


interface IPostList {
  author?: string
}

const PostList: React.FC<IPostList> = ({ author }) => {

  const { posts } = useTypedSelector(state => state.postState)

  const [filterType, setFilterType] = useState<string>("")
  const [filterName, setFilterName] = useState<string>("")

  const [postList, setPostList] = useState<IPost[]>([])

  const upBtnRef = useRef(null)
  const [isShowUpBtn, setIsShowUpBtn] = useState(false)

  useEffect(() => {
    if (filterType === "date") {
      const tempPosts = structuredClone(posts)
      const sortedPosts = tempPosts.sort((a: IPost, b: IPost) => a.date.localeCompare(b.date))
      setPostList(sortedPosts)
    } else if (filterType === "titleName") {
      const tempPosts = structuredClone(posts)
      const sortedPosts = tempPosts.sort((a: IPost, b: IPost) => a.title.localeCompare(b.title))
      setPostList(sortedPosts)
    } else if (filterType === "authorName") {
      const tempPosts = structuredClone(posts)
      const sortedPosts = tempPosts.sort((a: IPost, b: IPost) => a.author.email.localeCompare(b.author.email))
      setPostList(sortedPosts)
    } else {
      setPostList(posts)
    }

  }, [posts, filterType])


  const filterPostsByName = useMemo(
    () => postList.filter(post => post.title.includes(filterName)),
    [filterName, postList]
  )


  function onUpButton() {
    window.scrollTo(0, 0)

  }

  const onScroll = () => {
    if (window.pageYOffset === 0) {
      setIsShowUpBtn(false)
    } else {
      setIsShowUpBtn(true)
    }
  }; 

  useEffect(() => {
    window.addEventListener("scroll", onScroll)

    return () => {
      window.removeEventListener('scroll', onScroll)
    }

  }, []);

  return (
    <Suspense fallback={<FetchLoader />}>
      <Filter
        filterType={filterType}
        setFilterType={setFilterType}
        filterName={filterName}
        setFilterName={setFilterName}
      />
      {filterPostsByName.length !== 0
        ? <section className="posts-container">
          {author ? <h1 className="posts__title">{author}'s posts</h1> : ""}
          {filterPostsByName.map((post, index) =>
            filterPostsByName.length === index + 1
              ? <PostCard key={post.id} isLast={true} postData={post} />
              : <PostCard key={post.id} isLast={false} postData={post} />
          )}
        </section>
        : <h1 className="message-info">No have posts</h1>
      }

      {
        isShowUpBtn
          ? <button ref={upBtnRef} onClick={onUpButton} className='posts__up'>
            <FontAwesomeIcon icon={faAngleUp}/>
            </button>
          : ""
      }



    </Suspense>
  )
}

export default PostList