import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import { connect } from "react-redux";
import { booksActions } from "../store/books";

const imgurl = 'https://api.cndbook.com/';

const slickSet = (infinite = true, autoplay = true, slidesToShow = 1) => {
  return {
    arrows: false,
    infinite: infinite,
    centerMode: true,
    centerPadding: "0",
    slidesToShow: slidesToShow,
    slidesToScroll: 1,
    variableWidth: true,
    focusOnSelect: true,
    autoplay: autoplay,
    autoplaySpeed: 3000,
    speed: 400,
    pauseOnHover: false,
    draggable: false,
    row: 1,
  }
}

const Home = ({ getBook, books}) => {
  const [bookList, setBookList] = useState([]);

  useEffect(() => {
    if (!books?.payload){
      getBook();
    } else {
      let dataArr = books?.payload?.filter((val, key) => key < 5 && val)
      if (dataArr.length === 1) {
        let center = parseInt(window.outerWidth / 400);
        setSettings(slickSet(false, false, 3))
      }
      setBookList(dataArr);
    }
  }, [books.payload])

  const [settings, setSettings] = useState(slickSet())

  return (
    <Container>
      {<Slider {...settings}>
        {bookList.map(item => {
          return (
            <ImgageBox key={item.id}>
              <Image src={item.frontimg && imgurl + "uploads/" + item.frontimg} />
            </ImgageBox>
          );
        })}
      </Slider>}
    </Container>
  );
}

const Container = styled.div`
  width: auto;
  height: 70%;
  max-height: 900px;
  margin-top: 8vh;
  z-index: 1;
  overflow: hidden;
  @media all and (max-width: 767px) {
    max-height: 550px;
  }    
`;
const Image = styled.img`
  width: auto;
  height: 450px;
`;
const ImgageBox = styled.div`
  display: inline-flex;
  margin-left: 80px;
  margin-right: 80px;
  // width: 50%;   
`

const mapStateToProps = (state, ownProps) => {
  return { books: state.books };
}

const mapDispatchToProps = (dispatch, ownProps) => {
  return { 
    getBook: () => dispatch(booksActions.getBook()),   
  };
}

export default connect(mapStateToProps, mapDispatchToProps) (Home);