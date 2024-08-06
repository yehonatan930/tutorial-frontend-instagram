import { useEffect, useState } from "react";
import PostsAPI from "../../api/PostsAPI";
import PostsList from "../../components/PostsList/PostsList";
import PostDTO from "../../models/PostDTO";

const MainPage = () => {
  const [allPosts, setAllPosts] = useState<PostDTO[] | null>(null);

  useEffect(() => {
    const getAllPostCards = async () => {
      const { data } = await PostsAPI.getInstance().getAllPostCards();
      setAllPosts(data);
    };
    getAllPostCards();
  }, []);

  return (
    <>
      <PostsList posts={allPosts}></PostsList>
    </>
  );
};

export default MainPage;
