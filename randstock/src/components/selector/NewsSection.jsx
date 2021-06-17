import React, { useEffect, useState } from 'react';
import { Card } from 'react-bootstrap';
import Carousel from 'react-multi-carousel';
import 'react-multi-carousel/lib/styles.css';
const { REACT_APP_API_BASE_URL } = process.env;

export default function NewsSection(props) {

    const [newsCards, setNewsCards] = useState([]);


    useEffect(() => {
        fetchAndCreateNewsCards();
    }, []);

    const fetchAndCreateNewsCards = () => {
        fetch(`${REACT_APP_API_BASE_URL}/stock-news?ticker=%27AAPL%27`)
            .then(res => res.json())
            .then(news => {
                setNewsCards(
                    news.articles.slice(1, 15).map(article => {
                        return <div><NewsCard title={article.title} subtitle={article.source.title} text="" href={article.links[0].href} /></div>
                    })
                );
            });
    }

    const responsive = {
        desktop: {
            breakpoint: { max: 3000, min: 1024 },
            items: 5,
            slidesToSlide: 4 // optional, default to 1.
        },
        tablet: {
            breakpoint: { max: 1024, min: 464 },
            items: 2,
            slidesToSlide: 2 // optional, default to 1.
        },
        mobile: {
            breakpoint: { max: 464, min: 0 },
            items: 1,
            slidesToSlide: 1 // optional, default to 1.
        }
    };

    return (
        <div style={{ width: "100%" }}>
            <Carousel
                swipeable={true}
                draggable={false}
                showDots={true}
                responsive={responsive}
                ssr={true} // means to render carousel on server-side.
                infinite={true}
                autoPlay={false}
                autoPlaySpeed={0}
                keyBoardControl={true}
                customTransition="all .5"
                transitionDuration={1000}
                containerClass="carousel-container"
                removeArrowOnDeviceType={["tablet", "mobile"]}
                deviceType={props.deviceType}
                dotListClass="custom-dot-list-style"
                itemClass="carousel-item-padding-40-px"
            >
                {newsCards}
            </Carousel>
        </div>
    )
}

const NewsCard = (props) => {
    return (
        <Card style={{ width: "95%", minHeight: '220px', maxHeight: '220px' }}>
            <Card.Body style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                <Card.Title style={{ maxHeight: "100px", overflow: 'scroll' }}>{props.title}</Card.Title>
                <Card.Subtitle className="mb-2 text-muted" style={{ maxHeight: "10px" }}>{props.subtitle}</Card.Subtitle>
                <Card.Text>
                    {props.text}
                </Card.Text>
                <Card.Link href={props.href}>View Article</Card.Link>
            </Card.Body>
        </Card>
    );
}
