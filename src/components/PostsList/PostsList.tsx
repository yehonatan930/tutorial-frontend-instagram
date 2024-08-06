import "./PostsList.css";
import PostDTO from "../../models/PostDTO";
import PostCard from "../PostCard/PostCard";
import PostCardPlaceholder from "../PostCard/PostCardPlaceholder";
import FadeIn from "react-fade-in";

interface PostsListProps {
  posts: PostDTO[] | null;
}
const PostsList = ({ posts }: PostsListProps) => {
  return (
    <FadeIn
      className="posts-list--container"
      childClassName="posts-list--child"
    >
      {posts ? (
        posts.map((post) => <PostCard key={post.id} {...post}></PostCard>)
      ) : (
        <>
          <PostCardPlaceholder />
          <PostCardPlaceholder />
          <PostCardPlaceholder />
          <PostCardPlaceholder />
          <PostCardPlaceholder />
        </>
      )}
    </FadeIn>
  );
};

export default PostsList;
