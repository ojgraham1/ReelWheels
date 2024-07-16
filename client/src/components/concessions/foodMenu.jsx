import React from "react";
import { Button, Container, Typography, Box, Link } from "@mui/material";
import { makeStyles } from "@mui/styles";

const useStyles = makeStyles({
  root: {
    padding: "20px",
    textAlign: "center",
  },
  button: {
    margin: "20px 0",
  },
  mediaContainer: {
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    margin: "20px 0",
  },
  mediaItem: {
    marginLeft: "-115px",
    width: "100%",
    textAlign: "center",
  },
  mediaItemMain: {
    marginLeft: "-115px",
    width: "100%",
    textAlign: "center",
  },
  img: {
    width: "120%",
    height: "auto",
  },
  video: {
    width: "120%",
    height: "auto",
  },
});

export default function Concessions() {
  const classes = useStyles();

  return (
    <Container className={classes.root}>
      <Box className={classes.mediaContainer}>
        <Box className={classes.mediaItemMain}>
          <video
            src="https://amc-theatres-res.cloudinary.com/video/upload/q_auto/v1576597980/FreshlyPrepared_QualityIngredients_2000x600_no-loop_qufnuk.mp4"
            controls
            className={classes.video}
          />
        </Box>
          <Typography className="fmHead" variant="h4" component="h1" gutterBottom>
            Hello Food!
          </Typography>
        <Button
          variant="contained"
          color="primary"
          className={classes.button}
          href="../public/ReelWheelsMenu.pdf"
          target="_blank"
          rel="noopener noreferrer"
        >
          Click Here For Menu
        </Button>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Snacks.jpg"
            alt="Wings"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/v1713555211/amc-cdn/general/food-and-drink/dine-in/MenuPage-Bowls-Apr19.jpg"
            alt="Salad"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Entrees.jpg"
            alt="Chicken"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/v1713453533/amc-cdn/general/food-and-drink/dine-in/AMC_DINE-IN-LandingPage-Pizza-2000x800.jpg"
            alt="Pizza"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Burgers.jpg"
            alt="Burger"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
        <Box className={classes.mediaItem}>
          <img
            src="https://amc-theatres-res.cloudinary.com/image/upload/q_auto/v1575602954/amc-cdn/general/fb/delivery-to-seat-refresh/Menu%20Page%20-%20Sweets%20Image.jpg"
            alt="Sweets"
            className={classes.img}
          />
          <Typography variant="subtitle1"></Typography>
        </Box>
      </Box>
    </Container>
  );
}