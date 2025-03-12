import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { API } from "@/utils/AxiosInstance";
import {
  TextField,
  Button,
  Paper,
  Typography,
  CircularProgress,
  Alert,
  Box,
  Container,
  Grid
} from "@mui/material";

export default function AcceptInvitation() {
  const [loading, setLoading] = useState(true);
  const [validToken, setValidToken] = useState(false);
  const [error, setError] = useState("");
  const [invitation, setInvitation] = useState(null);
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    confirmPassword: ""
  });
  const [formErrors, setFormErrors] = useState({});
  
  const { token } = useParams();
  const navigate = useNavigate();
  
  useEffect(() => {
    validateToken();
  }, [token]);
  
  const validateToken = async () => {
    try {
      setLoading(true);
      const { data } = await API.get(`/api/invitations/validate/${token}`);
      setValidToken(true);
      setInvitation(data);
      setFormData({
        ...formData,
        email: data.email || ""
      });
    } catch (error) {
      console.error("Invalid or expired invitation token:", error);
      setError("This invitation link is invalid or has expired.");
      setValidToken(false);
    } finally {
      setLoading(false);
    }
  };
  
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value
    });
    
    // Clear error when field is updated
    if (formErrors[name]) {
      setFormErrors({
        ...formErrors,
        [name]: ""
      });
    }
  };
  
  const validateForm = () => {
    const errors = {};
    
    if (!formData.firstName.trim()) errors.firstName = "First name is required";
    if (!formData.lastName.trim()) errors.lastName = "Last name is required";
    if (!formData.email.trim()) errors.email = "Email is required";
    if (!formData.password) errors.password = "Password is required";
    if (formData.password.length < 8) {
      errors.password = "Password must be at least 8 characters";
    }
    if (formData.password !== formData.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
    
    setFormErrors(errors);
    return Object.keys(errors).length === 0;
  };
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) return;
    
    try {
      setLoading(true);
      await API.post(`/api/invitations/accept/${token}`, {
        firstName: formData.firstName,
        lastName: formData.lastName,
        email: formData.email,
        password: formData.password
      });
      
      // Redirect to login
      navigate("/login", { 
        state: { message: "Account created successfully! You can now log in." } 
      });
    } catch (error) {
      console.error("Failed to create account:", error);
      setError("Failed to create account. Please try again.");
      setLoading(false);
    }
  };
  
  if (loading) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "120px", marginBottom: "50px" }}>
        <Box display="flex" justifyContent="center" alignItems="center" minHeight="300px">
          <CircularProgress />
        </Box>
      </Container>
    );
  }
  
  if (false) {
    return (
      <Container maxWidth="sm" style={{ marginTop: "120px", marginBottom: "50px" }}>
        <Paper className="p-30 rounded-16 shadow-4">
          <Alert severity="error" className="mb-20">
            {error}
          </Alert>
          <Typography variant="body1" className="mb-20 text-center">
            The invitation link you tried to access is invalid or has expired.
          </Typography>
          <Box display="flex" justifyContent="center">
            <Button 
              variant="contained" 
              color="primary" 
              onClick={() => navigate("/login")}
              style={{ backgroundColor: "#6440FB" }}
            >
              Go to Login
            </Button>
          </Box>
        </Paper>
      </Container>
    );
  }
  
  return (
    <Container maxWidth="md" style={{ marginTop: "120px", marginBottom: "50px" }}>
      <Paper className="p-30 rounded-16 shadow-4">
        <Typography variant="h4" gutterBottom className="text-center fw-700">
          Accept Invitation
        </Typography>
        
        <Box className="text-center mb-30">
          <Typography variant="subtitle1">
            You've been invited to join {invitation?.organizationName || "an organization"} as a {invitation?.role || "member"}!
          </Typography>
        </Box>
        
        {error && (
          <Alert severity="error" className="mb-20">
            {error}
          </Alert>
        )}
        
        <form onSubmit={handleSubmit}>
          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <TextField
                label="First Name"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!formErrors.firstName}
                helperText={formErrors.firstName}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Last Name"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!formErrors.lastName}
                helperText={formErrors.lastName}
                required
              />
            </Grid>
            
            <Grid item xs={12}>
              <TextField
                label="Email"
                name="email"
                value={formData.email}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                disabled
                helperText="Your email address from the invitation"
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Password"
                name="password"
                type="password"
                value={formData.password}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!formErrors.password}
                helperText={formErrors.password || "At least 8 characters"}
                required
              />
            </Grid>
            
            <Grid item xs={12} md={6}>
              <TextField
                label="Confirm Password"
                name="confirmPassword"
                type="password"
                value={formData.confirmPassword}
                onChange={handleInputChange}
                fullWidth
                variant="outlined"
                error={!!formErrors.confirmPassword}
                helperText={formErrors.confirmPassword}
                required
              />
            </Grid>
          </Grid>
          
          <Box mt={4} display="flex" justifyContent="center">
            <Button
              type="submit"
              variant="contained"
              color="primary"
              size="large"
              disabled={loading}
              style={{ backgroundColor: "#6440FB", minWidth: "200px" }}
            >
              {loading ? (
                <CircularProgress size={24} color="inherit" />
              ) : (
                "Create Account"
              )}
            </Button>
          </Box>
        </form>
      </Paper>
    </Container>
  );
}