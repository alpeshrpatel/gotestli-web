import React, { useEffect, useState } from "react";
import { TextField, Box, Typography, Paper, Avatar } from "@mui/material";
import { deepPurple } from "@mui/material/colors";
import { auth } from "@/firebase/Firebase";
import { API } from "@/utils/AxiosInstance";
import { toast } from "react-toastify";

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

  let uid = "";
  if (auth.currentUser) {
    uid = auth.currentUser.uid;
  }

  useEffect(() => {
    async function getUserProfile() {
      const { data } = await API.get(`/api/users/${uid}`);
      console.log(data);
      setUsersData(data);
      setUpdatedData({
        first_name: data.first_name || "",
        last_name: data.last_name || "",
        email: data.email || "",
        company: data.company || "",
        phone: data.phone || "",
      });
    }
    if (uid) {
      getUserProfile();
    }
  }, [uid]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUpdatedData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleUpdateData = async () => {
    try {
      const res = await API.put(`/api/users/${uid}`, updatedData);
      if (res.status == 200) {
        toast.success("User updated Successfully!");
      }
    } catch (error) {
      throw error;
    }
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center", p: 3 }}>
      <Box sx={{ width: 300, mr: 5 }}>
        <Paper elevation={3} sx={{ p: 2, mb: 2 }}>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            {usersData?.last_name ? (
              <Avatar
                sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
              >{`${usersData?.first_name?.[0]?.toUpperCase()}${usersData?.last_name?.[0]?.toUpperCase()}`}</Avatar>
            ) : (
              <Avatar
                sx={{ bgcolor: deepPurple[500], width: 56, height: 56 }}
              >{`${usersData?.first_name?.[0]?.toUpperCase()}`}</Avatar>
            )}
            <Typography
              variant="h6"
              sx={{ mt: 2 }}
            >{`${usersData?.first_name?.toUpperCase()} ${usersData?.last_name?.toUpperCase()}`}</Typography>
            <Typography variant="subtitle1">{usersData.role}</Typography>
          </Box>
        </Paper>
        <Paper sx={{ p: 2 }}>
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
        </Paper>
      </Box>

      <Box sx={{ flex: 1 }}>
        <Typography variant="h5" sx={{ mb: 2 }}>
          Public profile
        </Typography>
        <Typography variant="subtitle1" sx={{ mb: 2 }}>
          Add information about yourself
        </Typography>
        <Box
          component="form"
          sx={{ display: "flex", flexDirection: "column", gap: 2 }}
        >
          {/* Basics Section */}
          <Typography variant="subtitle2" sx={{ mb: 1 }}>
            Basics:
          </Typography>
          <TextField
            label="First Name"
            variant="outlined"
            name="first_name"
            fullWidth
            required
            className="custom-height-questionsetform bg-white rounded w-100"
            value={updatedData.first_name}
            onChange={handleInputChange}
          />
          <TextField
            label="Last Name"
            variant="outlined"
            fullWidth
            name="last_name"
            required
            className="custom-height-questionsetform bg-white rounded w-100"
            value={updatedData.last_name}
            onChange={handleInputChange}
          />

          <TextField
            label="Role"
            variant="outlined"
            fullWidth
            name="role"
            InputProps={{ readOnly: true }}
            InputLabelProps={{ shrink: true }}
            className="custom-height-questionsetform bg-white rounded w-100"
            value={usersData.role}
          />

          <TextField
            label="Email"
            variant="outlined"
            fullWidth
            name="email"
            required
            InputLabelProps={{ shrink: true }}
            className="custom-height-questionsetform bg-white rounded w-100"
            value={updatedData.email}
            onChange={handleInputChange}
          />
          <TextField
            label="Company Name"
            variant="outlined"
            name="company"
            fullWidth
            className="custom-height-questionsetform bg-white rounded w-100"
            value={updatedData.company}
            onChange={handleInputChange}
          />
          <TextField
            label="Phone Number"
            variant="outlined"
            fullWidth
            type="tel"
            name="phone"
            className=" bg-white rounded w-100"
            value={updatedData.phone}
            onChange={handleInputChange}
          />
        </Box>
        <button
          className="button -sm px-20 py-20 -outline-blue-3 text-blue-3 text-16 fw-bolder lh-sm mt-4 mx-auto "
          onClick={handleUpdateData}
        >
          Save
        </button>
      </Box>
    </Box>
  );
};

export default ProfilePage;
