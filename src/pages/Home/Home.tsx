import { useState, useEffect } from "react";

import { Card } from "../../components/Card/Card";
// import { Navbar } from "../../components/Navbar/Navbar.tsx";
import { getAllPosts, getTopPost } from "../../Services/postsServices.tsx";
import { HomeBody, HomeHeader } from "./HomeStyled";
// import Cookies from "js-cookie";

export const Home = () => {
  const [posts, setPosts] = useState([]);
  const [topPost, setTopPost] = useState({});

  async function findPost() {
    const postsResponse = await getAllPosts();
    setPosts(postsResponse.data.results);

    const topPostResponse = await getTopPost();
    setTopPost(topPostResponse.data.post);
  }

  useEffect(() => {
    findPost();
  }, []);

  return (
    <>
      <HomeHeader>
        <Card
          top={true}
          title={topPost.title}
          text={topPost.text}
          banner={topPost.banner}
          likes={topPost.likes}
          comments={topPost.comments}
        />
      </HomeHeader>
      <HomeBody>
        {posts.map((item) => (
          <Card
            key={item.id}
            title={item.title}
            text={item.text}
            banner={item.banner}
            likes={item.likes}
            comments={item.comments}
          />
        ))}
      </HomeBody>
    </>
  );
}