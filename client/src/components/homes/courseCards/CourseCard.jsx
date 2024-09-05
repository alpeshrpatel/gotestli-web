import React from "react";
import { Link } from "react-router-dom";
import { useState, useEffect } from "react";
// import axios from "axios";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import ExamInstructions from "@/components/quiz/examInstructions/ExamInstructions";
import { API } from "@/utils/AxiosInstance";
import { styled } from "@mui/material/styles";
import Card from "@mui/material/Card";
import CardHeader from "@mui/material/CardHeader";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import CardActions from "@mui/material/CardActions";
import Collapse from "@mui/material/Collapse";
import Avatar from "@mui/material/Avatar";
import IconButton from "@mui/material/IconButton";
import Typography from "@mui/material/Typography";
import { red } from "@mui/material/colors";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import MoreVertIcon from "@mui/icons-material/MoreVert";



export default function CourceCard({ data, index }) {
  // const [rating, setRating] = useState([]);
  const [questionSet, setQuestionsSet] = useState([]);
  const [open, setOpen] = useState(false);
 

  const onOpenModal = () => {
    async function getQuestions() {
      try {
        const response = await API.get(`/api/questionset/questions/${data.id}`);

        setQuestionsSet(response.data);
      } catch (error) {
        console.log(error);
      }
    }
    getQuestions();
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const date = new Date(data.modified_date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  console.log(data);
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <ExamInstructions
          id={data.id}
          time={data.time_duration}
          questionSet={questionSet}
        />
      </Modal>
      <div className="col-lg-3 col-md-6 pointer " onClick={onOpenModal}>
        <div className="coursesCard -type-1">
          <Card sx={{ maxWidth: 345, height: "100%" }} className="coursesCard -type-1">
            <CardHeader
              avatar={
                <Avatar sx={{ bgcolor: red[500] }} aria-label="recipe">
                  {data.author.slice(0, 1).toUpperCase()}
                </Avatar>
              }
              action={
                <IconButton aria-label="settings">
                  <MoreVertIcon />
                </IconButton>
              }
              title={data.author}
              subheader={formattedDate}
            />
            <div className="relative">
            <div className="coursesCard__image cardImage overflow-hidden rounded-8  ">
              <CardMedia
                component="img"
                // height="194"
                sx={{height: "170px", width: "400px"}}
                image={data.image}
                alt="Paella dish"
              />

              <div className="coursesCard__image_overlay rounded-8"></div>
            </div>

            </div>

            <CardContent>
              <div className="text-17 lh-15 fw-500 text-dark-1">
                {data.title}
              </div>
              <Typography variant="body2" sx={{ color: "text.secondary" }}>
                {data.short_desc}
              </Typography>
            </CardContent>
            <CardActions disableSpacing>
              <div className="d-flex items-center gap-2 mr-20">
                <div className="">
                  <img src="assets/img/coursesCards/icons/1.svg" alt="icon" />
                </div>
                <div className="text-14 lh-1">
                  {data.no_of_question} Questions
                </div>
              </div>
              <div className="d-flex items-center gap-2">
                <div className="">
                  <img src="assets/img/coursesCards/icons/2.svg" alt="icon" />
                </div>
                <div className="text-14 lh-1">{`${data.time_duration}m`}</div>
              </div>

              {/* <ExpandMore
                expand={expanded}
                onClick={handleExpandClick}
                aria-expanded={expanded}
                aria-label="show more"
              >
                <ExpandMoreIcon />
              </ExpandMore> */}
            </CardActions>
            {/* <Collapse in={expanded} timeout="auto" unmountOnExit>
              <CardContent>
                <Typography sx={{ marginBottom: 2 }}>Method:</Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  Heat 1/2 cup of the broth in a pot until simmering, add
                  saffron and set aside for 10 minutes.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  Heat oil in a (14- to 16-inch) paella pan or a large, deep
                  skillet over medium-high heat. Add chicken, shrimp and
                  chorizo, and cook, stirring occasionally until lightly
                  browned, 6 to 8 minutes. Transfer shrimp to a large plate and
                  set aside, leaving chicken and chorizo in the pan. Add
                  pimentón, bay leaves, garlic, tomatoes, onion, salt and
                  pepper, and cook, stirring often until thickened and fragrant,
                  about 10 minutes. Add saffron broth and remaining 4 1/2 cups
                  chicken broth; bring to a boil.
                </Typography>
                <Typography sx={{ marginBottom: 2 }}>
                  Add rice and stir very gently to distribute. Top with
                  artichokes and peppers, and cook without stirring, until most
                  of the liquid is absorbed, 15 to 18 minutes. Reduce heat to
                  medium-low, add reserved shrimp and mussels, tucking them down
                  into the rice, and cook again without stirring, until mussels
                  have opened and rice is just tender, 5 to 7 minutes more.
                  (Discard any mussels that don&apos;t open.)
                </Typography>
                <Typography>
                  Set aside off of the heat to let rest for 10 minutes, and then
                  serve.
                </Typography>
              </CardContent>
            </Collapse> */}
          </Card>
        </div>
        {/* <div>
          <div className="coursesCard -type-1">
            <div className="relative">
              <div className="coursesCard__image cardImage overflow-hidden rounded-8  ">
                <img
                  className="w-1/1"
                  style={{ height: "200px", width: "400px" }}
                  src={data.image}
                  alt="image"
                />

                <div className="coursesCard__image_overlay rounded-8"></div>
              </div>
              {data.popular && (
                <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3">
                  <div>
                    <div className="px-15 rounded-200 bg-purple-1">
                      <span className="text-11 lh-1 uppercase fw-500 text-white">
                        Popular
                      </span>
                    </div>
                  </div>

                  <div>
                    <div className="px-15 rounded-200 bg-green-1">
                      <span className="text-11 lh-1 uppercase fw-500 text-dark-1">
                        Best sellers
                      </span>
                    </div>
                  </div>
                </div>
              )}
              <div className="d-flex justify-between py-10 px-10 absolute-full-center z-3"></div>
            </div>

            <div className="h-100 pt-15">
              

              <div className="text-17 lh-15 fw-500 text-dark-1 mt-10">
                <button onClick={onOpenModal}>{data.title}</button>
              </div>

              <div className="d-flex x-gap-10 items-center pt-10">
                <div className="d-flex items-center">
                  <div className="mr-8">
                    <img src="assets/img/coursesCards/icons/1.svg" alt="icon" />
                  </div>
                  <div className="text-14 lh-1">
                    {data.no_of_question} Questions
                  </div>
                </div>

                <div className="d-flex items-center">
                  <div className="mr-8">
                    <img src="assets/img/coursesCards/icons/2.svg" alt="icon" />
                  </div>
                  <div className="text-14 lh-1">{`${data.time_duration}m`}</div>
                </div>

                <div className="d-flex items-center">
                  <div className="mr-8">
                    <img src="assets/img/coursesCards/icons/3.svg" alt="icon" />
                  </div>
                  <div className="text-14 lh-1">{data.level}</div>
                </div>
              </div>

              <div className="coursesCard-footer">
                <div className="coursesCard-footer__author">
                  <span className="text-sm text-black-50">Created by</span>
                  <div>{data.author}</div>
                </div>

                <div className="coursesCard-footer__price">
                  {data.paid ? (
                    <>
                      <div>${data.originalPrice}</div>
                      <div>${data.discountedPrice}</div>
                    </>
                  ) : (
                    <>
                      <div></div>
                      <div>Free</div>
                    </>
                  )}
                </div>
              </div>
              <div>
                <p className="text-muted mt-4 d-flex align-items-center  text-justify">
                  {data.short_desc}
                </p>
              </div>
            </div>
          </div>
        </div> */}
      </div>
    </>
  );
}
