"use client";

import React from "react";
import Container from "@/shared/components/Container/Container";
import styles from "./News.module.css";

const News = () => {
  return (
    <div className={styles.container}>
      <Container>
        <div className={styles.newsWrapper}>
          <div className={styles.contentWrapper}>
            <h2 className={styles.title}>Новини</h2>
            <div className={styles.content}>
              Військовослужбовці сухопутних військ України кожен день стоять на
              захисті рідної землі і виконують найскладніші задачі найближче до
              ворога.
              <br />
              <br /> Ви — наша опора та надія, а ваше віддане служіння
              Українському народу невпинно наближає мир і спокій в нашій з вами
              країні. Дякуємо вам за ваш величезний внесок у захист
              територіальної цілісності України!
            </div>
          </div>
          <div className={styles.post}>
            <div className={styles.respContainer}>
              <div className={styles.iframeWrapper}>
                <iframe
                  className={styles.respIframe}
                  src="https://www.facebook.com/plugins/post.php?href=https%3A%2F%2Fwww.facebook.com%2Fsofua.army%2Fposts%2Fpfbid0TmiKSZcgLLpfyg5HDJDkaiATVkWviMGTPzBU5FPWTFWgRsZuMxSnV3oEwSJHzfgjl&width=&show_text=true&appId=491557047053986&height="
                  allowFullScreen={true}
                  allow="autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share"
                />
              </div>
            </div>
          </div>
        </div>
      </Container>
    </div>
  );
};

export default News;
