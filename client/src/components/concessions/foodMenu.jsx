import React from "react";
import { Button, Container, Typography, Box } from "@mui/material";
import { makeStyles } from "@mui/styles";


const useStyles = makeStyles({
  root: {
    paddingTop: "2px",
    textAlign: "center",
  },
  // Added !important to force React to override the default MUI styles
  button: {
    margin: "20px 0 !important",
    backgroundColor: "red !important",
    color: "white !important",
    width: "200px !important",
    padding: "15px !important",
    borderRadius: "50px !important",
    transition: "background-color 0.3s ease-in-out",
    "&:hover": {
      backgroundColor: "#cc0000 !important",
    },
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "30px 0",
    marginBottom: "50px",
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
    marginTop: "20px !important",
    padding: "10px !important",
    paddingLeft: "20px",
    width: "max-content",
    height: "200px !important",
    backgroundColor: "black",
    fontSize: "80px !important",
    fontFamily: "inherit !important",
    fontWeight: "bold !important",
    textAlign: "left",
  },
  headP: {
    fontFamily: "inherit !important",
    fontSize: "20px !important ",
    fontWeight: "none !important",
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

  // Media Queries
  "@media (min-width: 320px) and (max-width: 480px)": {
    mediaItem: {
      marginLeft: "0",
      width: "100%",
    },
    videoContainer: {
      marginLeft: "0",
      width: "100%",
    },
    head: {
      fontFamily: "inherit",
      fontWeight: "bold",
      fontSize: "20px !important",
      textAlign: "left",
      height: "80px !important",
      width: "fit-content",
    },
    headP: {
      fontFamily: "inherit",
      fontSize: "10px !important",
      fontWeight: "none",
    },
    button: {
      width: "86px !important",
      height: "20px",
      padding: "12px !important",
      fontSize: "0.39rem !important",
      margin: "10px 0",
    },
    text: {
      fontSize: "20px !important",
    },
    p: {
      width: "250px !important",
      fontSize: "10px !important",
    },
  },
  "@media (min-width: 481px) and (max-width: 768px)": {
    mediaItem: {
      marginLeft: "0",
      width: "100%",
    },
    videoContainer: {
      marginLeft: "0",
      width: "100%",
    },
    head: {
      fontSize: "30px !important",
      height: "100px !important",
      width: "fit-content",
    },
    headP: {
      fontFamily: "inherit",
      fontSize: "15px !important",
      fontWeight: "none",
    },
    button: {
      width: "100px",
      height: "45px !important",
      padding: "10px",
      fontSize: "0.5rem",
      margin: "10px 0",
    },
    text: {
      fontSize: "30px !important",
    },
    p: {
      width: "350px !important",
      fontSize: "11px !important",
    },
  },
  "@media (min-width: 769px) and (max-width: 1024px)": {
    mediaItem: {
      marginLeft: "0",
      width: "100%",
    },
    videoContainer: {
      marginLeft: "0",
      width: "100%",
    },
    head: {
      fontSize: "50px !important",
      height: "200px !important",
      width: "fit-content !important",
    },
    headP: {
      fontFamily: "inherit",
      fontSize: "20px !important",
      fontWeight: "none",
    },
    button: {
      width: "100px",
      height: "50px !important",
      padding: "10px",
      fontSize: "9px",
      margin: "10px 0",
    },
    text: {
      fontSize: "50px !important",
    },
    p: {
      width: "500px !important",
      fontSize: "15px !important",
    },
  },
  "@media (min-width: 1025px) and (max-width: 1200px)": {
    mediaItem: {
      marginLeft: "0",
      width: "100%",
    },
    videoContainer: {
      marginLeft: "0",
      width: "100%",
    },
    head: {
      fontSize: "60px",
      height: "200px",
      width: "fit-content",
    },
    headP: {
      fontFamily: "inherit",
      fontSize: "20px",
      fontWeight: "none",
    },
    button: {
      width: "140px",
      height: "50px",
      padding: "10px",
      fontSize: "13px",
      margin: "10px 0",
    },
    text: {
      fontSize: "60px",
    },
    p: {
      width: "500px",
      fontSize: "20px",
    },
  },
  "@media (min-width: 1201px) and (max-width: 1380px)": {
    mediaContainer: {
      width: "fit-content",
    },
    mediaItem: {
      marginLeft: "0",
      width: "100%",
    },
    videoContainer: {
      marginLeft: "0",
      width: "100%",
    },
    head: {
      fontSize: "60px",
      height: "200px",
      width: "fit-content",
    },
    headP: {
      fontFamily: "inherit",
      fontSize: "20px",
      fontWeight: "none",
    },
    button: {
      width: "140px",
      height: "50px",
      padding: "10px",
      fontSize: "13px",
      margin: "10px 0",
    },
    text: {
      fontSize: "60px",
    },
    p: {
      width: "500px",
      fontSize: "20px",
    },
  },
});

export default function Concessions() {
  const classes = useStyles();
  const buttonLink =  process.env.NODE_ENV === "production"? "./ReelWheelsMenu.pdf": "../public/ReelWheelsMenu.pdf"
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
              href = {buttonLink}
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
