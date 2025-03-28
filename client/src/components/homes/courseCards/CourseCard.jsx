import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";
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
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faClock,
  faFileLines,
  faHeart,
} from "@fortawesome/free-solid-svg-icons";
import { Rating } from "react-simple-star-rating";
import { BootstrapTooltip } from "@/components/common/Tooltip";
import CourseList from "./ListView";
import { Box, List, ListItem, ListItemText } from "@mui/material";
import ListTable from "./TableBodyContent";
import TableBodyContent from "./TableBodyContent";
import ListView from "./ListView";
import RatingMeter from "@/components/common/RatingMeter";

export default function CourceCard({ view, search = null, role, data, index }) {
  const [rating, setRating] = useState(0);
  const [questionSet, setQuestionsSet] = useState([]);
  const [open, setOpen] = useState(false);
  const [openRating, setOpenRating] = useState(false);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [wishlistedSet, setWishlistedSet] = useState();
  const [ratingsData, setRatingsData] = useState([]);
  const [totalRatings, setTotalRatings] = useState(0);

  const navigate = useNavigate();

  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user"));
  const userId = user?.id;
  const userRole = user?.role;
  const org = JSON.parse(localStorage.getItem("org")) || "";
  let orgid = org?.id || 0;

  useEffect(() => {
    async function getRating() {
      try {
        if (data) {
          // console.log("rating hello");
          const response = await API.get(
            `/api/reviews/rating/qset/${data.id}`
            // {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // }
          );
          const avgRatingResponse = await API.get(
            `/api/reviews/get/rating/ratingmeter/${data.id}`
          );
          console.log(avgRatingResponse?.data);
          const ratingCounts = { 5: 0, 4: 0, 3: 0, 2: 0, 1: 0 };

          avgRatingResponse?.data?.forEach((obj) => {
            const roundedRating = Math.floor(parseFloat(obj.avgRating));
            if (ratingCounts[roundedRating] !== undefined) {
              ratingCounts[roundedRating] += 1;
            }
          });

          // Step 2: Calculate percentages
          const totalRatings = avgRatingResponse?.data?.length;
          setTotalRatings(totalRatings);
          const ratingsDataArr = Object.keys(ratingCounts).map((stars) => {
            return {
              stars: parseInt(stars),
              percentage: Math.round(
                (ratingCounts[stars] / totalRatings) * 100
              ),
            };
          });
          setRatingsData(ratingsDataArr);
          console.log(ratingsDataArr);
          setRating(response.data?.rating);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
      }
    }
    getRating();
    async function getWishlist() {
      try {
        if (token) {
          const res = await API.get(`/api/wishlist/getqsetid/${userId}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(res.data);
          const wishlistedSet = res.data || [];

          localStorage.setItem("wishlist", wishlistedSet?.length || 0);
          const isInWishlist = wishlistedSet?.some(
            (set) => set.questionset_id === data.id
          );
          // console.log("isinwishlist: ", isInWishlist);
          setIsWishlisted(isInWishlist);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        // console.log(error);
      }
    }
    getWishlist();
  }, [isWishlisted]);

  const onOpenModal = () => {
    async function getQuestions() {
      try {
        if (token) {
          const response = await API.get(
            `/api/questionset/questions/${data.id}?orgid=${orgid}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          setQuestionsSet(response.data);
        }
      } catch (error) {
        if (error.status == 403) {
          localStorage.removeItem("user");
          localStorage.removeItem("token");
          // showToast("error","Invaild token!");
          navigate("/login");
          return;
        }
        // console.log(error);
      }
    }
    getQuestions();
    setOpen(true);
  };

  const onCloseModal = () => setOpen(false);

  const onOpenRatingModal = () => {
    setOpenRating(true);
  };
  const onCloseRatingModal = () => setOpenRating(false);

  const handleExpandClick = () => {
    setExpanded(!expanded);
  };
  const handleWishlistToggle = async (e) => {
    e.stopPropagation();
    setIsWishlisted(!isWishlisted);
    try {
      if (token) {
        if (isWishlisted) {
          const res = await API.delete(
            `/api/wishlist/qset/${data.id}/user/${userId}`,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          //  localStorage.setItem('wishlist',wishlistedSet?.length - 1)
        } else {
          const res = await API.post(
            `/api/wishlist`,
            { questionSetId: data.id, userId: userId },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          // localStorage.setItem('wishlist',wishlistedSet?.length + 1)
        }
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      // console.log(error);
    }
  };
  const date = new Date(data.modified_date);
  const formattedDate = new Intl.DateTimeFormat("en-US", {
    month: "long",
    day: "numeric",
    year: "numeric",
  }).format(date);
  // console.log(data);
  // console.log(rating);
  // const ratingsData = [
  //   { stars: 5, percentage: 7 },
  //   { stars: 4, percentage: 17 },
  //   { stars: 3, percentage: 5 },
  //   { stars: 2, percentage: 0 },
  //   { stars: 1, percentage: 0 },
  // ];
  return (
    <>
      <Modal open={open} onClose={onCloseModal} center>
        <ExamInstructions
          id={data.id}
          time={data.time_duration}
          questionSet={questionSet}
          data={data}
          onCloseModal={onCloseModal}
        />
      </Modal>

      <div
        className={`col-lg-3 col-md-6 pointer ${
          search ? `col-lg-4 col-md-6 ` : `col-lg-3 col-md-6`
        } ${view == `list` && `col-lg-12`}`}
        onClick={onOpenModal}
      >
        {view == "card" ? (
          <div className="coursesCard -type-1">
            <Card
              sx={{ maxWidth: 345, height: "100%" }}
              className="coursesCard -type-1"
            >
              <CardHeader
                subheader={
                  <div className="d-flex justify-content-between">
                    <div
                      className="text-17 lh-15 fw-500 text-dark-1 text-truncate"
                      style={{ maxWidth: "200px" }}
                      // data-toggle="tooltip" data-placement="top" title={data.title}
                    >
                      <BootstrapTooltip title={data.title}>
                        {data.title}
                      </BootstrapTooltip>
                    </div>
                    {userRole == "student" ? (
                      <IconButton
                        onClick={handleWishlistToggle}
                        sx={{ color: isWishlisted ? red[500] : "gray" }}
                      >
                        <FontAwesomeIcon icon={faHeart} />
                      </IconButton>
                    ) : null}
                  </div>
                }
              />
              <div className="relative">
                <div className="coursesCard__image cardImage overflow-hidden rounded-8  ">
                  <CardMedia
                    component="img"
                    // height="194"
                    sx={{ height: "170px", width: "400px" }}
                    image={data.image}
                    alt="Paella dish"
                  />

                  <div className="coursesCard__image_overlay rounded-8"></div>
                </div>
              </div>
              <div
                className="mt-2 ms-2"
                style={{
                  display: "flex",
                  justifyContent: "between",
                  alignItems: "center",
                  gap: "20px",
                }}
              >
                <BootstrapTooltip
                  title={
                    <RatingMeter
                      ratings={ratingsData}
                      totalRatings={totalRatings}
                      ratingNumber={rating}
                    />
                  }
                >
                  <div >
                    <Rating
                      className="pointer-none"
                      readonly={true}
                      initialValue={parseFloat(rating)}
                      allowFraction={true}
                      size={20}
                      activeColor="#ffd700"
                      emptyColor="#d3d3d3"
                    />
                  </div>
                </BootstrapTooltip>
                <BootstrapTooltip
                  title={
                    <RatingMeter
                      ratings={ratingsData}
                      totalRatings={totalRatings}
                      ratingNumber={rating}
                    />
                  }
                >
                  <div className="icon icon-chevron-down"></div>
                </BootstrapTooltip>
                {/* <Rating
                  readonly={true}
                  initialValue={parseFloat(rating)}
                  allowFraction={true}
                  size={20}
                  activeColor="#ffd700"
                  emptyColor="#d3d3d3"
                /> */}
                {!data.is_demo ? (
                  <BootstrapTooltip
                    title={"Purchase This Amazing QuestionSet to Attend it!"}
                  >
                    <div className="fs-2">🔒</div>
                  </BootstrapTooltip>
                ) : (
                  ""
                )}
              </div>
              <CardContent>
                <BootstrapTooltip title={data.short_desc}>
                  <Typography
                    variant="body2"
                    className="text-truncate"
                    sx={{ color: "text.secondary", maxWidth: "400px" }}
                  >
                    {data.short_desc}
                  </Typography>
                </BootstrapTooltip>
                {!(role == "instructor") && (
                  <div className="d-flex items-center gap-2 mt-2 ">
                    <Typography
                      variant="caption"
                      gutterBottom
                      sx={{ display: "flex" }}
                    >
                      Creator:
                    </Typography>
                    <Typography variant="body1" gutterBottom>
                      {data.author}
                    </Typography>
                  </div>
                )}

                <div
                  className={`d-flex items-center gap-2 ${
                    role == "instructor" ? `mt-2` : `mt-0`
                  } `}
                >
                  <Typography
                    variant="caption"
                    gutterBottom
                    sx={{ display: "flex" }}
                  >
                    Published on:
                  </Typography>
                  <Typography variant="body1" gutterBottom>
                    {formattedDate}
                  </Typography>
                </div>
              </CardContent>
              <CardActions
                disableSpacing
                className="d-flex justify-content-between"
              >
                <div className="d-flex items-center gap-2 mr-20">
                  <div className="">
                    <FontAwesomeIcon icon={faFileLines} />
                  </div>
                  <div className="text-14 lh-1">
                    {data.no_of_question} Questions
                  </div>
                </div>
                <div className="d-flex items-center gap-2">
                  <div className="">
                    <FontAwesomeIcon icon={faClock} />
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
              {/* <button onMouseOver={onOpenRatingModal}
                style={{
                  textDecoration: "underline",
                  color: "blue",
                  textAlign: "center",
                }}
              >
                View Ratings
              </button>
              <Modal open={openRating} onClose={onCloseRatingModal} center>
                <RatingMeter ratings={ratingsData}/>
              </Modal> */}
            </Card>
          </div>
        ) : (
          // <ListView body={ <TableBodyContent data={data} rating={rating} role={role} handleWishlistToggle={handleWishlistToggle}/>} />

          <TableBodyContent
            data={data}
            rating={rating}
            role={role}
            handleWishlistToggle={handleWishlistToggle}
          />
          /* <Box className="shadow-2">
              <List>
                <ListItem>
                  <img
                    src={data.image}
                    alt="Course Image"
                    style={{
                      width: "130px",
                      height: "100px",
                      marginRight: "10px",
                      borderRadius: "10px",
                    }}
                  />
                  <div className="d-flex flex-column w-100">
                    <ListItemText
                      primary={
                        <BootstrapTooltip title={data.title}>
                          <Typography
                            className="text-truncate"
                            style={{ maxWidth: "250px" }}
                          >
                            {data.title}
                          </Typography>
                        </BootstrapTooltip>
                      }
                      secondary={
                        <>
                          <div className="d-flex gap-lg-5">
                            <BootstrapTooltip title={data.short_desc}>
                              <Typography
                                className="text-truncate"
                                style={{ maxWidth: "700px" }}
                                // component="span"
                                variant="body2"
                                color="text.primary"
                              >
                                {data.short_desc}
                              </Typography>
                            </BootstrapTooltip>

                            <div className="d-flex gap-lg-5">
                              <Typography variant="body2">
                                Author: {data.author}
                              </Typography>
                              <Typography variant="body2" color="#212121">
                                {formattedDate}
                              </Typography>
                            </div>
                          </div>
                          {" — "} {data.no_of_question} questions,{" "}
                          {data.time_duration} mins
                        </>
                      }
                    />

                    <div className=" ms-2">
                      <Rating
                        readonly={true}
                        initialValue={parseFloat(rating)}
                        allowFraction={true}
                        size={20}
                        activeColor="#ffd700"
                        emptyColor="#d3d3d3"
                      />
                    </div>
                  </div>
                  {role === "student" && (
                    <IconButton
                      onClick={handleWishlistToggle}
                      sx={{ color: isWishlisted ? red[500] : "gray" }}
                    >
                      <FontAwesomeIcon icon={faHeart} />
                    </IconButton>
                  )}
                </ListItem>
              </List>
            </Box> */
        )}

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
