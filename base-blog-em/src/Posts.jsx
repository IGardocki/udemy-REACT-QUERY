import { useState, useEffect } from "react";
import { fetchPosts, deletePost, updatePost } from "./api";
import { useQuery, useQueryClient, useMutation } from "@tanstack/react-query";
import { PostDetail } from "./PostDetail";
const maxPostPage = 10;

export function Posts() {
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedPost, setSelectedPost] = useState(null);

  const queryClient = useQueryClient();

  // a mutation is just a call that alters the db. Delete, post, etc.
  const deleteMutation = useMutation({
    mutationFn: (postId) => deletePost(postId)
  })

  const updateTitleMutation = useMutation({
    mutationFn: (postId) => updatePost(postId)
  })

  useEffect(()=>{
    if(currentPage < maxPostPage){
      const nextPage = currentPage + 1;
      queryClient.prefetchQuery({
        queryKey: ["posts", nextPage],
        queryFn: () => fetchPosts(nextPage)
      })
    }

  }, [currentPage, queryClient])

  // isFetching means query hasn't resolved yet, while isLoading means there is no cached data 
  // and the query is still fetching
  // data is the data from the query. 
  // error is the error that occurred
  const {data, error, isError, isLoading} = useQuery({
    queryKey: ['posts', currentPage],
    queryFn: () => fetchPosts(currentPage), //function that query runs
    staleTime: 2000, // 2 sec - time until data is labelled stale (default is 0)
    // gcTime: // how long to keep data around to use later before cache data expires. default is 5 min
  });
  if(isLoading) {
    return <h3>Loading</h3>;
  }

  if(isError) {
    return <><h3>ERROR</h3><p>{error.toString()}</p></>;
  }
  return (
    <>
      <ul>
        {data.map((post) => (
          <li
            key={post.id}
            className="post-title"
            onClick={() => {
              deleteMutation.reset();
              updateTitleMutation.reset();
              setSelectedPost(post);
            }
          }
          >
            {post.title}
          </li>
        ))}
      </ul>
      <div className="pages">
        <button disabled={currentPage <= 1} onClick={() => {setCurrentPage(previousValue => previousValue - 1)}}>
          Previous page
        </button>
        <span>Page {currentPage}</span>
        <button disabled = {currentPage >= maxPostPage} onClick={() => {setCurrentPage(previousValue => previousValue + 1)}}>
          Next page
        </button>
      </div>
      <hr />
      {selectedPost && <PostDetail post={selectedPost} deleteMutation={deleteMutation} updateTitleMutation={updateTitleMutation}/>}
    </>
  );
}
