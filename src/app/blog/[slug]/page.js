
import Image from "next/image";
import styles from "./singlePage.module.css";
import { Suspense } from "react";
import PostUser from "@/components/postUser/PostUser";
import { getPost } from "@/lib/data";

// FETCH DATA WITH AN API
const getData = async (slug) => {
  try {
    const res = await fetch(`http://127.0.0.1:3000/api/blog/${slug}`);

    if (!res.ok) {
      const errorData = await res.json();
      throw new Error(`Failed to fetch data: ${errorData.message}`);
    }

    return res.json();
  } catch (error) {
    console.error("Error fetching data:", error);
    throw new Error("Failed to fetch data");
  }
};

export const generateMetadata = async ({ params }) => {
  try {
    const { slug } = params;
    const post = await getPost(slug);
    console.log("Post data:", post);

    return {
      title: post.title,
      description: post.desc,
    };
  } catch (error) {
    console.error("Error generating metadata:", error);
    throw new Error("Failed to generate metadata");
  }
};


const SinglePostPage = async ({ params }) => {
  const { slug } = params;

  // FETCH DATA WITH AN API

  const post = await getData(slug);
  if (!post) {
    return <div>Loading...</div>; // Or handle loading state appropriately
  }

  return (
    <div className={styles.container}>
    {post.img && (
      <div className={styles.imgContainer}>
        <Image src={post.img} alt="" fill className={styles.img} />
      </div>
    )}
    <div className={styles.textContainer}>
      <h1 className={styles.title}>{post.title}</h1>
      <div className={styles.detail}>
        {post && (
          <Suspense fallback={<div>Loading...</div>}>
            <PostUser userId={post.userId} />
          </Suspense>
        )}
        <div className={styles.detailText}>
          <span className={styles.detailTitle}>Published</span>
          <span className={styles.detailValue}>
            {post.createdAt.toString().slice(4, 16)}
          </span>
        </div>
      </div>
      <div className={styles.content}>{post.desc}</div>
    </div>
  </div>

  );
};
export default SinglePostPage;
