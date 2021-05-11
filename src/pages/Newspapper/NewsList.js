import React, { useEffect, useState } from "react";
import { API_KEY } from "../../constants.json";
import { useParams } from "react-router-dom";

function NewsList() {
  let { newspaper } = useParams();
  const [news, setNews] = useState([]);

  const getNewsWithDomain = (domain) => {
    const requestOptions = {
      method: "GET",
      headers: { "x-api-key": API_KEY },
    };
    fetch(
      "https://newsapi.org/v2/everything?domains=" + newspaper,
      requestOptions
    )
      .then((response) => response.json())
      .then((data) => {
        setNews(data?.articles);
      });
  };

  useEffect(() => {
    getNewsWithDomain(newspaper);
  }, []);

  return (
    <main>
      <div class="trending-area fix mt-5">
        <div class="container">
          <div class="trending-main">
            <div class="col-lg-12">
              {news.map((item, key) => (
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
    </main>
  );
}

export default NewsList;
