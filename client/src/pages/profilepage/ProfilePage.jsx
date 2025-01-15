import React, { useEffect, useState } from "react";
// import { TextField, Box, Typography, Paper, Avatar } from "@mui/material";
import {
  TextField,
  Box,
  Typography,
  Paper,
  Avatar,
  Button,
  IconButton,
  MenuItem,
  Select,
  FormControl,
  InputLabel,
  Autocomplete,
  useTheme,
} from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";
import { Delete, Edit } from "@mui/icons-material";
import Header from "@/components/layout/headers/Header";
import { useNavigate } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUserPlus } from "@fortawesome/free-solid-svg-icons";
import "react-responsive-modal/styles.css";
import { Modal } from "react-responsive-modal";
import AvatarModal from "./AvatarModal";
import { BootstrapTooltip } from "@/components/common/Tooltip";
import { showToast } from "@/utils/toastService";

const ProfilePage = () => {
  const [usersData, setUsersData] = useState({});
  const [updatedData, setUpdatedData] = useState({
    first_name: "",
    last_name: "",
    role: "",
    email: "",
    company: "",
    phone: "",
  });
  const [categories, setCategories] = useState([]);
  const [tagsId, setTagsId] = useState("");
  const [defaultTags, setDefaultTags] = useState([]);
  const [isSaveVisible, setIsSaveVisible] = useState(false);
  const [badgesData, setBadgesData] = useState([]);
  const [open, setOpen] = useState(false);
  const [selectedAvatar, setSelectedAvatar] = useState(null);

  // let uid = "";
  // if (auth.currentUser) {
  //   uid = auth.currentUser.uid;
  // }
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const user = JSON.parse(localStorage.getItem("user")) || "";
  const userRole = user.role;
  let userid = user.id;

  useEffect(() => {
    async function getUserProfile() {
      const { data } = await API.get(`/api/users/${userid}`);
      // console.log(data);
      setUsersData(data);
      setUpdatedData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        company: data.company || "",
        phone: data.phone || "",
      });
      setSelectedAvatar(data.profile_pic || "");

      const userTags = data.tags
        ? data.tags.split(",").map((tag) => {
            const [id, title] = tag.split(":");
            return { id, title };
          })
        : [];
      setDefaultTags(userTags);
    }

    if (userid) {
      getUserProfile();
    }

    try {
      if (token) {
        async function getCategory() {
          const { data } = await API.get("/api/category", {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          setCategories(data);
        }
        getCategory();

        async function getBadgesData() {
          const { data } = await API.get(`api/badge/${userid}`, {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          });
          // console.log(data);
          setBadgesData(data);
        }
        getBadgesData();
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error fetching data:", error);
    }
  }, []);

  useEffect(() => {
    try {
      if (token) {
        async function updateUserPreference() {
          if (tagsId) {
            const data = await API.post(
              "/api/users/preference",
              {
                user_id: usersData.id,
                tagsId,
              },
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );
            // console.log(data);
          } else {
            // const data = await API.delete(`/api/users/preference/${userid}`, {
            //   headers: {
            //     Authorization: `Bearer ${token}`,
            //   },
            // });
          }
        }
        updateUserPreference();
      }
    } catch (error) {
      if (error.status == 403) {
        localStorage.removeItem("user");
        localStorage.removeItem("token");
        // showToast("error","Invaild token!");
        navigate("/login");
        return;
      }
      console.error("Error fetching data:", error);
    }
  }, [tagsId]);

  const onCloseAvatarModal = () => setOpen(false);
  const onOpenAvatarModal = (attemptId) => {
    setOpen(true);
  };
  const handleAvatarSelect = async (avatar) => {
    setSelectedAvatar(avatar);
    setOpen(false);
    try {
      const res = await API.put(`/api/users/${userid}`, {
        ...updatedData,
        profile_pic: avatar,
      });
      if (res.status == 200) {
        showToast("success","Avatar updated Successfully!");
      }
    } catch (error) {
      showToast("error",`Error: ${error} !`);
    }
  };

  const handleDeleteAvatar = async () => {
    setSelectedAvatar("");
    try {
      const res = await API.put(`/api/users/${userid}`, {
        ...updatedData,
        profile_pic: "",
      });
      if (res.status == 200) {
        showToast("success","Avatar deleted Successfully!");
      }
    } catch (error) {
      showToast("error",`Error: ${error} !`);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
    setIsSaveVisible(true);
  };

  const handleUpdateData = async () => {
    try {
      const res = await API.put(`/api/users/${userid}`, {
        ...updatedData,
        profile_pic: selectedAvatar,
      });
      // if(tagsId){
      //   const data = await API.post("/api/users/preference", {
      //     user_id: usersData.id,
      //     tagsId,
      //   });
      //    // console.log(data);
      // }

      if (res.status == 200) {
        showToast("success","User updated Successfully!");
      }
    } catch (error) {
      throw error;
    }
  };

  let level1 = badgesData
    .map((badge) => {
      if (badge.badge_name == "Apprentice") {
        return {
          category: badge.title,
        };
      }
    })
    .filter(Boolean);
  let level2 = badgesData
    .map((badge) => {
      if (badge.badge_name == "Trailblazer") {
        return {
          category: badge.title,
        };
      }
    })
    .filter(Boolean);
  let level3 = badgesData
    .map((badge) => {
      if (badge.badge_name == "Virtuoso") {
        return {
          category: badge.title,
        };
      }
    })
    .filter(Boolean);
  let level4 = badgesData
    .map((badge) => {
      if (badge.badge_name == "Legend") {
        return {
          category: badge.title,
        };
      }
    })
    .filter(Boolean);

  // console.log(level1);
  // console.log(level2);
  // console.log(level3);
  // console.log(level4);
  // console.log(badgesData);
  const theme = useTheme();
  return (
    <>
      <Header userRole={userRole} />
      <Box
        sx={{
          display: "flex",
          flexWrap: "wrap",
          justifyContent: "center",
          p: 3,
          marginTop: "13vh",
          gap: "20px",
        }}
        // style={{ backgroundColor: theme.palette.background.default }}
      >
        <Modal open={open} onClose={onCloseAvatarModal} center>
          <AvatarModal onAvatarSelect={handleAvatarSelect} />
        </Modal>
        <Box sx={{ width: 300, mr: 5 }}>
          <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
              }}
            >
              {/* {usersData?.last_name ? (
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
                >{`${usersData?.first_name?.[0]?.toUpperCase()}${usersData?.last_name?.[0]?.toUpperCase()}`}</Avatar>
              ) : (
                <Avatar
                  sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
                >{`${usersData?.first_name?.[0]?.toUpperCase()}`}</Avatar>
              )} */}
              {selectedAvatar ? (
                <Avatar
                  sx={{
                    width: 70,
                    height: 70,
                    display: "flex",
                    justifyContent: "center",
                    cursor: "pointer",
                  }}
                >
                  <img src={selectedAvatar} alt="" />
                </Avatar>
              ) : (
                <BootstrapTooltip title={"Add Your Avatar"}>
                  <Avatar
                    sx={{
                      bgcolor: deepPurple[500],
                      width: 56,
                      height: 56,
                      display: "flex",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={onOpenAvatarModal}
                  >
                    <FontAwesomeIcon icon={faUserPlus} />
                  </Avatar>
                </BootstrapTooltip>
              )}

              <div className="d-flex mt-1 justify-content-center">
                <IconButton onClick={onOpenAvatarModal}>
                  <Edit sx={{ color: "#3f51b5" }} />
                </IconButton>
                <IconButton>
                  <Delete
                    sx={{ color: "#f50057" }}
                    onClick={handleDeleteAvatar}
                  />
                </IconButton>
              </div>
              <Typography
                variant="h6"
                sx={{ mt: 2 }}
              >{`${usersData?.first_name?.toUpperCase()} ${usersData?.last_name?.toUpperCase()}`}</Typography>
              <Typography variant="subtitle1">{usersData.role}</Typography>
            </Box>
          </Paper>
          {/* <Paper sx={{ p: 2 }}>
            <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
              <Typography variant="subtitle1" gutterBottom>
                Profile
              </Typography>
              <Typography variant="body2">View public profile</Typography>
              <Typography variant="body2">Photo</Typography>
              <Typography variant="body2">Account Security</Typography>
              <Typography variant="body2">Subscriptions</Typography>
              <Typography variant="body2">Payment methods</Typography>
              <Typography variant="body2">Privacy</Typography>
              <Typography variant="body2">Notifications</Typography>
              <Typography variant="body2">API clients</Typography>
            </Box>
          </Paper> */}
        </Box>

        <Box className="" sx={{ flex: 1, minWidth: "350px" }}>
          <Typography variant="h5" sx={{ mb: 2, textAlign: "center" }}>
            Public Profile
          </Typography>
          <Typography variant="subtitle1" sx={{ mb: 2, textAlign: "center" }}>
            Add information about yourself
          </Typography>
          <Box
            component="form"
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
              marginTop: "40px",
            }}
          >
            {/* Basics Section */}

            {/* <div className="row gap-2 col-12 px-4 flex justify-content-center">
              <TextField
                label="First Name"
                variant="outlined"
                name="first_name"
                required
                className="custom-height-questionsetform bg-white rounded col-5"
                value={updatedData.first_name}
                onChange={handleInputChange}
              />
              <TextField
                label="Last Name"
                variant="outlined"
                name="last_name"
                required
                className="custom-height-questionsetform bg-white rounded col-5"
                value={updatedData.last_name}
                onChange={handleInputChange}
              />
            </div>
            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              <TextField
                label="Email"
                variant="outlined"
                name="email"
                required
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                className="custom-height-questionsetform bg-white rounded col-5"
                value={updatedData.email}
                onChange={handleInputChange}
              />
              <TextField
                label="Phone Number"
                variant="outlined"
                type="number"
                name="phone"
                className="custom-height-questionsetform bg-white rounded col-5"
                value={updatedData.phone}
                onChange={handleInputChange}
              />
            </div>
            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              <TextField
                label="Role"
                variant="outlined"
                name="role"
                InputProps={{ readOnly: true }}
                InputLabelProps={{ shrink: true }}
                className="custom-height-questionsetform bg-white rounded col-5"
                value={usersData.role}
              />
              <TextField
                label="Company Name"
                variant="outlined"
                name="company"
                className="custom-height-questionsetform bg-white rounded col-5"
                value={updatedData.company}
                onChange={handleInputChange}
              />
            </div> */}
            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              {/* First Name */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="first_name"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  First Name
                </label>
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={updatedData.first_name}
                  onChange={handleInputChange}
                  required
                />
              </div>

              {/* Last Name */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="last_name"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Last Name
                </label>
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={updatedData.last_name}
                  onChange={handleInputChange}
                  required
                />
              </div>
            </div>

            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              {/* Email */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="email"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Email
                </label>
                <input
                  type="email"
                  name="email"
                  id="email"
                  readOnly
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#e9ecef",
                    color: "#495057",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={updatedData.email}
                />
              </div>

              {/* Phone Number */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="phone"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Phone Number
                </label>
                <input
                  type="number"
                  name="phone"
                  id="phone"
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={updatedData.phone}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              {/* Role */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="role"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Role
                </label>
                <input
                  type="text"
                  name="role"
                  id="role"
                  readOnly
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#e9ecef",
                    color: "#495057",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={usersData.role}
                />
              </div>

              {/* Company Name */}
              <div
                className="col-5"
                style={{ display: "flex", flexDirection: "column" }}
              >
                <label
                  htmlFor="company"
                  style={{
                    marginBottom: "5px",
                    fontWeight: "600",
                    color: "#333",
                    fontSize: "14px",
                  }}
                >
                  Company Name
                </label>
                <input
                  type="text"
                  name="company"
                  id="company"
                  style={{
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  }}
                  value={updatedData.company}
                  onChange={handleInputChange}
                />
              </div>
            </div>

            <div className="row gap-2 col-12 px-4 flex justify-content-center">
              <Autocomplete
                multiple
                id="tags-outlined"
                options={categories?.filter(
                  (category) =>
                    !defaultTags?.some((tag) => tag.id == category.id)
                )}
                getOptionLabel={(option) => option.title || ""}
                filterSelectedOptions
                value={defaultTags}
                isOptionEqualToValue={(option, value) => option.id == value.id}
                sx={{
                  "& .MuiInputBase-input": {
                    height: "35px",
                    border: "none",
                    padding: "12px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#f8f9fa",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                  },
                  "& .MuiOutlinedInput-root": {
                    padding: "10px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    boxShadow: "inset 0 2px 4px rgba(0, 0, 0, 0.1)",
                    backgroundColor: "#f8f9fa",
                  }
                }}
                renderInput={(params) => (
                  <TextField
                    {...params}
                    label="Add Your Preferences"
                    placeholder="Select categories"
                  />
                )}
                className="custom-height-questionsetform bg-white rounded col-6"
                onChange={(event, newValue) => {
                  let tags = "";
                  let tagsId = "";
                  // console.log(newValue);
                  newValue.forEach((tag) => {
                    tags = tags + "," + tag.title;
                    tagsId = tagsId + "," + tag.id;
                  });
                  setTagsId(tagsId.slice(1));
                  setDefaultTags(newValue);
                  setIsSaveVisible(true);
                }}
              />
            </div>
          </Box>
          <button
            className={`button -sm px-20 py-20 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm mt-4 mx-auto ${
              isSaveVisible ? "" : "disabled opacity-50"
            }`}
            onClick={isSaveVisible ? handleUpdateData : null}
            style={{
              cursor: isSaveVisible ? "pointer" : "not-allowed",
            }}
            disabled={!isSaveVisible}
          >
            Save
          </button>
        </Box>
        <div
          className="container-fluid  card  bg-light rounded place-content-center"
          style={{ padding: "25px 4vw", width: "40vw", minWidth: "350px" }}
        >
          <Typography variant="h4" sx={{ mb: 2, fontWeight: "500" }}>
            Achievements
          </Typography>
          <div className="my-3">
            <Typography variant="h5" sx={{ mb: 2, fontWeight: "400" }}>
              Badges
            </Typography>

            <div>
              <div className="mb-4">
                {level4?.length > 0 && (
                  <>
                    <h6>{level4.length} Legend</h6>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "40px",
                      }}
                    >
                      <img
                        src="/assets/img/badges/legend-vs.jpg"
                        alt=""
                        style={{ height: "90px", width: "90px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ccc",
                            borderRadius: "10px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {level4.map((category) => (
                          <div
                            className="d-flex flex-wrap align-items-center"
                            key={category.id}
                          >
                            {" "}
                            <span className="bg-light-12 me-2 mb-2 rounded px-2 py-1">
                              {category?.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {level3?.length > 0 && (
                  <>
                    <h6>{level3.length} Virtuoso</h6>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "40px",
                      }}
                    >
                      <img
                        src="/assets/img/badges/virtuoso-vs.jpg"
                        alt=""
                        style={{ height: "80px", width: "80px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ccc",
                            borderRadius: "10px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {level3.map((category) => (
                          <div
                            className="d-flex flex-wrap align-items-center"
                            key={category.id}
                          >
                            {" "}
                            <span className="bg-light-12 me-2 mb-2 rounded px-2 py-1">
                              {category?.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}

                {level2?.length > 0 && (
                  <>
                    <h6>{level2.length} Trailblazer</h6>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "40px",
                      }}
                    >
                      <img
                        src="/assets/img/badges/Trailblazer-vs.jpg"
                        alt=""
                        style={{ height: "75px", width: "75px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ccc",
                            borderRadius: "10px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {level2.map((category) => (
                          <div
                            className="d-flex flex-wrap align-items-center"
                            key={category.id}
                          >
                            {" "}
                            <span className="bg-light-12 me-2 mb-2 rounded px-2 py-1">
                              {category?.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
                {level1?.length > 0 && (
                  <>
                    <h6>{level1.length} Apprentice</h6>
                    <div
                      style={{
                        display: "flex",
                        gap: "20px",
                        flexWrap: "wrap",
                        marginBottom: "40px",
                      }}
                    >
                      <img
                        src="/assets/img/badges/apprentice-vs.jpg"
                        alt=""
                        style={{ height: "70px", width: "70px" }}
                      />
                      <div
                        style={{
                          display: "flex",
                          overflowX: "auto",
                          "&::-webkit-scrollbar": {
                            width: "6px",
                          },
                          "&::-webkit-scrollbar-thumb": {
                            backgroundColor: "#ccc",
                            borderRadius: "10px",
                          },
                          "&::-webkit-scrollbar-track": {
                            backgroundColor: "#f5f5f5",
                          },
                        }}
                      >
                        {level1.map((category) => (
                          <div
                            className="d-flex flex-wrap align-items-center"
                            key={category.id}
                          >
                            {" "}
                            <span className="bg-light-12 me-2 mb-2 rounded px-2 py-1">
                              {category?.category}
                            </span>
                          </div>
                        ))}
                      </div>
                    </div>
                  </>
                )}
              </div>
            </div>
          </div>
        </div>
      </Box>
    </>
  );
};

export default ProfilePage;
