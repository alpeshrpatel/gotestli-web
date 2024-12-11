import React from "react";
import {
  TableRow,
  TableCell,
  Typography,
  Tooltip,
  IconButton,
  TableBody,
} from "@mui/material";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faHeart } from "@fortawesome/free-solid-svg-icons";
import { red } from "@mui/material/colors";
import { Rating } from "react-simple-star-rating";

const TableBodyContent = ({ data, rating, role, handleWishlistToggle }) => {
  const {
    image,
    title,
    short_desc,
    author,
    formattedDate,
    no_of_question,
    time_duration,
    isWishlisted,
  } = data;

  return (
    
    // <TableRow key={data.id}>
    <React.Fragment>
      {/* <TableRow key={data.id}> */}
      {/* Image */}
      <TableCell align="center" sx={{padding:''}}>
        <img
          src={image}
          alt="Course"
          style={{
            width: "130px",
            height: "100px",
            borderRadius: "10px",
            objectFit: "cover",
          }}
        />
      </TableCell>

      {/* Title */}
      <TableCell align="center" sx={{display: "table-cell"}}>
        <Tooltip title={title}>
          <Typography
            className="text-truncate"
            style={{
              maxWidth: "200px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {title}
          </Typography>
        </Tooltip>
      </TableCell>

      {/* Description */}
      <TableCell align="center" sx={{display: "table-cell"}}>
        <Tooltip title={short_desc}>
          <Typography
            className="text-truncate"
            style={{
              maxWidth: "300px",
              overflow: "hidden",
              textOverflow: "ellipsis",
              whiteSpace: "nowrap",
            }}
          >
            {short_desc}
          </Typography>
        </Tooltip>
      </TableCell>

      {/* Author */}
      <TableCell align="center" sx={{display: "table-cell"}}>{author}</TableCell>

      {/* Date */}
      <TableCell align="center">{formattedDate}</TableCell>

      {/* Questions */}
      <TableCell align="center">{no_of_question}</TableCell>

      {/* Duration */}
      <TableCell align="center">{time_duration} mins</TableCell>

      {/* Rating */}
      <TableCell align="center">
        <Rating
          readonly
          initialValue={parseFloat(rating)}
          allowFraction
          size={20}
          activeColor="#ffd700"
          emptyColor="#d3d3d3"
        />
      </TableCell>

      {/* Actions */}
      {/* {role === "student" && (
        <TableCell >
          <IconButton
            onClick={() => handleWishlistToggle(data)}
            sx={{ color: isWishlisted ? red[500] : "gray" }}
          >
            <FontAwesomeIcon icon={faHeart} />
          </IconButton>
        </TableCell>
      )} */}
     {/* </TableRow> */}
      </React.Fragment>
  );
};

export default TableBodyContent;
