import React, { useMemo } from "react";
import Slider from "react-slick";
import Container from "@material-ui/core/Container";
import { makeStyles } from "@material-ui/core/styles";
import Car from "./Car";
import AddCar from "./AddCar";
import { useEvent } from "../../contexts/Event";
import { useStrapi } from "strapi-react-context";

const settings = {
  dots: false,
  infinite: false,
  speed: 500,
  slidesToShow: 5,
  slidesToScroll: 1,
  arrows: false,
  lazyLoad: true,
  swipeToSlide: true,
  swipe: true,
  responsive: [
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 1,
      },
    },
  ],
};

const CarColumns = ({ ...props }) => {
  const classes = useStyles();
  const strapi = useStrapi();
  const { event } = useEvent();

  const cars = useMemo(
    () => strapi.stores.cars?.filter((car) => car?.event?.id === event?.id),
    [strapi.stores.cars, event]
  );

  return (
    <div>
      <Slider {...settings}>
        {cars &&
          cars.map((car) => (
            <Container key={car.id} maxWidth="sm" className={classes.slide}>
              <Car car={car} {...props} />
            </Container>
          ))}
        <Container maxWidth="sm" className={classes.slide}>
          <AddCar {...props} />
        </Container>
      </Slider>
    </div>
  );
};

const useStyles = makeStyles((theme) => ({
  slide: {
    height: `calc(100vh - ${theme.mixins.toolbar.minHeight}px)`,
    outline: "none",
    padding: theme.spacing(2),
  },
}));

export default CarColumns;
