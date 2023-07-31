import { useParams } from "react-router-dom";

const Post = () => {
  const { id } = useParams();
  console.log(id);
  return <div></div>;
};
export default Post;
