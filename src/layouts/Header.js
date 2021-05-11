import React, { useContext, useEffect, useState } from "react";
import headerIcon1 from "../assets/img/icon/header_icon1.png";
import headerIcon2 from "../assets/img/icon/header_icon2.png";
import logo from "../assets/img/logo/logo.png";
import headerCard from "../assets/img/hero/header_card.jpg";
import { Context } from "../store/store";
import { useHistory } from "react-router-dom";
import { API_KEY } from "../constants.json";

function Header() {
  const [state, dispatch] = useContext(Context);
  const history = useHistory();
  const currentDate = new Date().toDateString();
  const [searchText, setSearchText] = useState("");

  const initPaperList = (newspapers) => {
    let sources = [];
    (newspapers || []).forEach(({ source }) => {
      sources.push(source.name);
    });

    //distinct sources uppercased
    dispatch({
      type: "SET_NEWSPAPERS",
      payload: [...new Set(sources.map((title) => title.toUpperCase()))],
    });
  };

  const getPaperList = () => {
    const requestOptions = {
      method: "GET",
      headers: { "x-api-key": API_KEY },
    };
    fetch("https://newsapi.org/v2/top-headlines?country=tr", requestOptions)
      .then((response) => response.json())
      .then((data) => {
        initPaperList(data?.articles);
      });
  };

  const handleFavoriteStarClick = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    if (state?.favoriteNewspapers?.includes(item)) {
      dispatch({
        type: "REMOVE_FAVORITE_NEWSPAPER",
        payload: item,
      });
    } else {
      dispatch({
        type: "ADD_FAVORITE_NEWSPAPER",
        payload: item,
      });
    }
  };

  const handleSearchChange = (e) => {
    setSearchText(e.target.value);
  };

  const handleSearch = () => {
    history.push("/search/" + searchText);
    history.go(0);
  };

  const handleGotoNews = (e, item) => {
    e.preventDefault();
    e.stopPropagation();

    history.push("/news/" + item.toLowerCase());
    history.go(0);
  };

  useEffect(() => {
    getPaperList();
    dispatch({
      type: "SET_FAVORITE_NEWSPAPER",
    });
  }, []);

  return (
    <header>
      <div class="header-area">
        <div class="main-header ">
          <div class="header-top black-bg d-none d-md-block">
            <div class="container">
              <div class="col-xl-12">
                <div class="row d-flex justify-content-between align-items-center">
                  <div class="header-info-left">
                    <ul>
                      <li>
                        <img src={headerIcon1} alt="" />
                        ANKARA 34ºc, Sunny
                      </li>
                      <li>
                        <img src={headerIcon2} alt="" />
                        {currentDate}
                      </li>
                    </ul>
                  </div>
                  <div class="header-info-right">
                    <ul class="header-social">
                      <li>
                        <a href="#">
                          <i class="fab fa-twitter"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-instagram"></i>
                        </a>
                      </li>
                      <li>
                        <a href="#">
                          <i class="fab fa-pinterest-p"></i>
                        </a>
                      </li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="header-mid d-none d-md-block">
            <div class="container">
              <div class="row d-flex align-items-center">
                <div class="col-xl-3 col-lg-3 col-md-3">
                  <div class="logo">
                    <a href="index.html">
                      <img src={logo} alt="" />
                    </a>
                  </div>
                </div>
                <div class="col-xl-9 col-lg-9 col-md-9">
                  <div class="header-banner f-right ">
                    <img src={headerCard} alt="" />
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div class="header-bottom header-sticky">
            <div class="container">
              <div class="row align-items-center">
                <div class="col-xl-10 col-lg-10 col-md-12 header-flex">
                  <div class="sticky-logo">
                    <a href="index.html">
                      <img src={logo} alt="" />
                    </a>
                  </div>
                  <div class="main-menu d-none d-md-block">
                    <nav>
                      <ul id="navigation">
                        <li>
                          <a href="/">Home</a>
                        </li>
                        <li>
                          <a href="#">Newspapers</a>
                          <ul class="submenu">
                            {state.newspapers.map((item, key) => (
                              <li key={key}>
                                <a
                                  href="#"
                                  onClick={(e) => handleGotoNews(e, item)}
                                >
                                  {item}
                                  <span
                                    onClick={(e) =>
                                      handleFavoriteStarClick(e, item)
                                    }
                                  >
                                    <i
                                      class={
                                        "newspaper-star fa fa-star " +
                                        (state?.favoriteNewspapers?.includes(
                                          item
                                        )
                                          ? "favorite-newspaper"
                                          : null)
                                      }
                                    ></i>
                                  </span>
                                </a>
                              </li>
                            ))}
                          </ul>
                        </li>
                      </ul>
                    </nav>
                  </div>
                </div>
                <div class="col-xl-2 col-lg-2 col-md-4">
                  <div class="header-right-btn f-right d-none d-lg-block">
                    <i class="fas fa-search special-tag"></i>
                    <div class="search-box">
                      <form action="#" onSubmit={handleSearch}>
                        <input
                          type="text"
                          placeholder="Search"
                          onChange={handleSearchChange}
                        />
                      </form>
                    </div>
                  </div>
                </div>
                <div class="col-12">
                  <div class="mobile_menu d-block d-md-none"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
