import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutation, updateTitleMutation }) {
  // replace with useQuery
  const {data, error, isError, isLoading} = useQuery({
    queryKey: ["comments", post.id], // this is a dependency array. Anytime these changes, itll trigger a refetch
    queryFn: ()=>fetchComments(post.id),
    staleTime: 2000
  });

  if(isLoading){
    return <h3>Loading</h3>
  }
  if(isError){
    return <><h3>ERROR</h3><p>{error.toString()}</p></>
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      {/* mutate is the actual mutation function within a useMutate */}
      <div>
        <button onClick={()=>deleteMutation.mutate(post.id)}>Delete</button>
        {deleteMutation.isPending && (
          <p className="loading">Deleting the post...</p>
        )}
        {deleteMutation.isError &&(
          <p className="error">Error deleting post: {deleteMutation.error.toString()}</p>
        )}
        {deleteMutation.isSuccess && (
          <p className="success">Post Deleted!</p>
        )}

      </div> 
      <div>
        <button onClick={()=>{
          updateTitleMutation.mutate(post.id)
        }}>Update title</button>
        {updateTitleMutation.isPending &&(
          <p className="loading">Updating the title</p>
        )}
        {updateTitleMutation.isError && (
          <p className="error">Error updating title: {updateTitleMutation.error.toString()}</p>
        )}
        {updateTitleMutation.isSuccess &&(
          <p className="success">Post title updated!</p>
        )}

      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
