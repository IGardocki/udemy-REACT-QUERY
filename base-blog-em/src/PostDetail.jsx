import { fetchComments } from "./api";
import { useQuery } from "@tanstack/react-query";
import "./PostDetail.css";

export function PostDetail({ post }) {
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
      <button>Delete</button> <button>Update title</button>
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
