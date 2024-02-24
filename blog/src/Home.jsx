import { useState, useEffect } from "react";
import BlogList from "./BlogList";

const Home = () => {
  const [blogs, setBlogs] = useState(null);
  const [isPending, setIsPending] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetch("http://localhost:8000/blogss")
      .then((resp) => {
        console.log(resp);
        if (!resp.ok) {
          throw Error("Could not fetch the data for that resource");
        }
        return resp.json();
      })
      .then((data) => {
        setBlogs(data);
        setIsPending(false);
      })
      .catch((err) => {
        setError(err.message);
      });
  }, []);

  return (
    <div className="home">
      {error && <div>{error}</div>}
      {isPending && <div>Loading</div>}
      {blogs && <BlogList blogs={blogs} title="All Blogs !" />}
    </div>
  );
};

export default Home;
