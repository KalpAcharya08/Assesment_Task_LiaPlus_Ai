import AddPostBlog from "../components/AddPostBlog";
import BlogPostDetail from "../components/BlogPostDetail";
import BlogPostList from "../components/BlogPostList";

export default function Blog() {
  return (
    <div className="p-6">
      <AddPostBlog />
      
      <BlogPostList />
    </div>
  );
}
