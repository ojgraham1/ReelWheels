import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";

// styling for food menu page
const useStyles = makeStyles({
  root: {
    paddingTop: "2px",
    textAlign: "center",
  },
  button: {
    margin: "20px 0 !important",
    backgroundColor: "red !important",
    width: "200px !important",
    padding: "15px !important",
    borderRadius: "50px !important",
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "30px 0",
    width: "100%",
  },
  videoContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "-115px",
    paddingTop: "50px",
    width: "120%",
    backgroundColor: "black",
  },
  mediaItem: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginLeft: "-115px",
    width: "120%",
    textAlign: "center",
    position: "relative",
    overflow: "hidden",
    "&:hover $overlay": {
      opacity: 1,
    },
  },
  head: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    marginTop: "20px",
    padding: "10px",
    paddingLeft: "20px",
    width: "max-content",
    height: "200px",
    backgroundColor: "black",
    fontSize: "80px",
    fontFamily: "inherit",
    fontWeight: "bold",
    textAlign: "left",
  },
  headP: {
    fontFamily: "inherit",
    fontSize: "20px",
    fontWeight: "none",
  },
  img: {
    width: "100%",
    height: "auto",
    backgroundAttachment: "fixed",
    transition: "0.5s ease",
  },
  video: {
    width: "100%",
    height: "auto",
  },
  overlay: {
    position: "absolute",
    top: "0",
    left: "0",
    width: "100%",
    height: "100%",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    color: "white",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    opacity: "0",
    transition: "0.5s ease",
    textAlign: "center",
    flexDirection: "column",
  },
  text: {
    fontWeight: "medium",
  },
  p: {
    width: "500px",
    fontWeight: "medium",
  },
});

export default function Concessions() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.mediaContainer}>
        <Box className={classes.videoContainer}>
          <video
            src="https://amc-theatres-res.cloudinary.com/video/upload/q_auto/v1576597980/FreshlyPrepared_QualityIngredients_2000x600_no-loop_qufnuk.mp4"
            autoPlay
            loop
            playsInline
            preload="metadata"
            className={classes.video}
          />
          <Typography
            className={classes.head}
            variant="h5"
            component="h1"
            gutterBottom
          >
            Movies with a menu.
            <Typography className={classes.headP}>
              Featuring high quality and locally sourced ingredients.
            </Typography>
            <Button
              variant="contained"
              className={classes.button}
              href="../public/ReelWheelsMenu.pdf"
              target="_blank"
              rel="noopener noreferrer"
              sx={{ color: "black" }}
            >
              View Full Menu
            </Button>
          </Typography>
        </Box>
        {[
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Snacks.jpg",
            alt: "Wings",
            text: "Snacks",
            p: "Crunchy, cheesy, salty and saucy. Dig in to the perfect starters to any meal. We’ve got plenty to share or enjoy on your own.",
          },
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/v1713555211/amc-cdn/general/food-and-drink/dine-in/MenuPage-Bowls-Apr19.jpg",
            alt: "Salad",
            text: "Bowls & Salads",
            p: "Loaded with fresh ingredients and interesting flavor profiles. You’ll find that no two are the same.",
          },
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Entrees.jpg",
            alt: "Chicken",
            text: "Entrées",
            p: "These dishes take movie fare to a whole new level. Everything is prepared in house from the freshest ingredients. Featuring indulgent portions and tasty touches like house-made sauces and sides. Kids options are available, too.",
          },
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/v1713453533/amc-cdn/general/food-and-drink/dine-in/AMC_DINE-IN-LandingPage-Pizza-2000x800.jpg",
            alt: "Pizza",
            text: "Artisan Flatbreads",
            p: "With a variety of flavors, we have a flatbread for every appetite. Each one is prepared in-house and baked to order.",
          },
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Burgers.jpg",
            alt: "Burger",
            text: "Burgers & Sandwiches",
            p: "Our burgers and sandwiches are piled high and packed with flavor. We offer a variety of sides so you can put together the perfect pairing.",
          },
          {
            src: "https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Sweets%20Image.jpg",
            alt: "Sweets",
            text: "Sweets",
            p: "Indulge in the most decadent milkshakes and desserts. Or stick to the classics like popcorn and candy.",
          },
        ].map((item, index) => (
          <Box className={classes.mediaItem} key={index}>
            <img src={item.src} alt={item.alt} className={classes.img} />
            <Box className={classes.overlay}>
              <Typography variant="h3" className={classes.text}>
                {item.text}
              </Typography>
              <Typography variant="subtitle1" className={classes.p}>
                {item.p}
              </Typography>
            </Box>
          </Box>
        ))}
      </Box>
    </Container>
  );
}
