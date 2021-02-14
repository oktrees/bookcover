import React, { useState, useEffect } from "react";
import Slider from "react-slick";
import styled from 'styled-components';
import axios from "axios";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const apiurl = 'https://api.cndbook.com/';

const Home = () => {
    const [bookList, setBookList] = useState([]);

    useEffect(() => {
        axios.get(apiurl + 'book/limit/5')
        .then(({ data }) => {
            let dataArr = [];
            dataArr.push(Object.entries(data).map(val => val[1]))
            if(dataArr[0].length !== 1){
                dataArr[0].push({ id: 't15', url: "" })
                dataArr[0].push({ id: 't16', url: "" })
            }
            setBookList(dataArr[0]);
        })
        .catch(e => {  
            console.error(e);  
        });
    }, [])

    const settings = {
        arrows: false,
        centerMode: true,
        infinite: false,
        centerPadding: "0",
        slidesToShow: 3,
        slidesToScroll: 1,
        variableWidth: true,
        focusOnSelect:true,
        speed: 200,
        row: 1        
    };
    

    const onWheel = (e) => {        
        const slickCenter = document.getElementsByClassName('slick-active');
        for(var [key,val] of Object.entries(slickCenter)) {
            if(val.classList.contains('slick-center')){
                if (e.deltaY < 0) {
                    if(slickCenter[Number(key)-1] !== undefined){
                        slickCenter[Number(key)-1].click();
                    }
                }
                else {
                    if(slickCenter[Number(key)+1] !== undefined && slickCenter[Number(key)+1].offsetTop === 0){
                        slickCenter[Number(key)+1].click()
                    }
                }
            }
        }
    }

    return (
        <Container onWheel={onWheel} >
            {<Slider {...settings}>
                {bookList.map(item => {
                    return (
                        <ImgageBox key={item.id}>
                            <Image src={item.frontimg && apiurl + "uploads/" + item.frontimg}  />
                        </ImgageBox>
                    );
                })}              
            </Slider> }
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
`;
const Image = styled.img`
    width: auto;
    max-width: 80vw;
    height: 100%;
`;
const ImgageBox = styled.div`
    display: inline-block;
    margin-right: 15px;
    // width: 50%;
`
const StyledSlider = styled(Slider)`  
`;

export default Home;