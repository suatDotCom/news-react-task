import React, { useState, useEffect, useContext } from "react";
import { API_KEY } from "../../constants.json";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import { Context } from "../../store/store";

function Home() {
  const [topHeadlines, setTopHeadlines] = useState([]);
  const [state, dispatch] = useContext(Context);

  const getTopHeadlines = () => {
    const requestOptions = {
      method: "GET",
      headers: { "x-api-key": API_KEY },
    };
    fetch("https://newsapi.org/v2/top-headlines?country=tr", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        setTopHeadlines(data?.articles);
      });
  };

 

  useEffect(() => {
    getTopHeadlines();
  }, []);

  return (
    <main>
      <div class="trending-area fix">
        <div class="container">
          <div class="trending-main">
            <div class="row">
              <div class="col-lg-12">
                <div class="trending-tittle">
                  <strong>Trending now</strong>
                  <div class="trending-animated">
                    <ul id="js-news" class="">
                      {topHeadlines.slice(0, 3).map((item, key) => (
                        <li
                          key={key}
                          className={"news-item trending-item-" + (key + 1)}
                        >
                          {item.description}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              </div>
            </div>
            <div class="row">
              <div class="col-lg-8">
                <div class="trending-top mb-30">
                  <Carousel>
                    {topHeadlines.slice(0, 5).map((item, key) => (
                      <div class="trend-top-img" key={key}>
                        <img src={item.urlToImage} alt="" />
                        <div class="trend-top-cap">
                          <h2>
                            <a href={item.url}>{item.description}</a>
                          </h2>
                        </div>
                      </div>
                    ))}
                  </Carousel>
                </div>
                <div class="trending-bottom">
                  <div class="row">
                    {topHeadlines.slice(6, 9).map((item, key) => (
                      <div class="col-lg-4" key={key}>
                        <div class="single-bottom mb-35">
                          <div class="trend-bottom-img mb-30">
                            <img src={item.urlToImage} width="100" alt="" />
                          </div>
                          <div class="trend-bottom-cap">
                            <span class="color1">{item.source.name}</span>
                            <h4>
                              <a href={item.url}>{item.title}</a>
                            </h4>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
              <div class="col-lg-4">
                {topHeadlines
                  .slice(Math.max(topHeadlines.length - 5, 1))
                  .map((item, key) => (
                    <div class="trand-right-single d-flex" key={key}>
                      <div class="trand-right-img">
                        <img src={item.urlToImage} width="100" alt="" />
                      </div>
                      <div class="trand-right-cap">
                        <span class="color1">{item.source.name} </span>
                        <h4>
                          <a href={item.url}>{item.title}</a>
                        </h4>
                      </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}

export default Home;
