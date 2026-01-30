import React, { useState, useEffect } from "react";
import { Button, CircularProgress } from "@mui/material";
import Modal from "react-responsive-modal";
import "react-responsive-modal/styles.css";
import { API } from "@/utils/AxiosInstance";
import { showToast } from "@/utils/toastService";

const AddCategoryModal = ({ open, onClose, onCategoryCreated }) => {
  const [categoryForm, setCategoryForm] = useState({
    title: "",
    parent_id: 0,
    description: "",
    slug: "",
    status: 1,
    show_menu: 1,
    is_parent_id: 0,
    is_show_home: 0
  });
  const [parentCategories, setParentCategories] = useState([]);
  const [isCategoryLoading, setIsCategoryLoading] = useState(false);
  const [isLoadingParentCategories, setIsLoadingParentCategories] = useState(false);

  const token = localStorage.getItem("token");
  const org = JSON.parse(localStorage?.getItem("org")) || "";

  // Fetch parent categories when modal opens
  useEffect(() => {
    if (open) {
      fetchParentCategories();
    }
  }, [open]);

  const fetchParentCategories = async () => {
    try {
      setIsLoadingParentCategories(true);
      const response = await API.get('/api/category/parent/categories', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      
      if (response.data) {
        setParentCategories(response.data);
      }
    } catch (error) {
      console.error('Error fetching parent categories:', error);
      showToast('error', 'Failed to load parent categories');
    } finally {
      setIsLoadingParentCategories(false);
    }
  };

  const handleCategoryFormChange = (e) => {
    const { name, value } = e.target;
    setCategoryForm(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Auto-generate slug from title
    if (name === 'title') {
      const slug = value.toLowerCase().replace(/\s+/g, '-').replace(/[^\w\-]+/g, '');
      setCategoryForm(prev => ({
        ...prev,
        slug: slug
      }));
    }
  };

  const handleCategorySubmit = async (e) => {
    e.preventDefault();
    
    if (!categoryForm.title.trim()) {
      showToast('error', 'Category title is required!');
      return;
    }

    try {
      setIsCategoryLoading(true);
      
      const categoryData = {
        org_id: org.id || 0,
        parent_id: parseInt(categoryForm.parent_id) || 0,
        title: categoryForm.title.trim(),
        description: categoryForm.description.trim() || "",
        meta_title: categoryForm.title.trim(),
        slug: categoryForm.slug.trim() || categoryForm.title.toLowerCase().replace(/\s+/g, '-'),
        meta_keyword: categoryForm.title.trim(),
        meta_description: categoryForm.description.trim() || "",
        status: parseInt(categoryForm.status),
        show_menu: parseInt(categoryForm.show_menu),
        is_parent_id: parseInt(categoryForm.parent_id) === 0 ? 1 : 0,
        is_show_home: parseInt(categoryForm.is_show_home),
        icon: "",
        position: 0
      };

      const response = await API.post('/api/category', categoryData, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      if (response.status === 200 || response.status === 201) {
        showToast('success', 'Category created successfully!');
        
        // Reset form
        setCategoryForm({
          title: "",
          parent_id: 0,
          description: "",
          slug: "",
          status: 1,
          show_menu: 1,
          is_parent_id: 0,
          is_show_home: 0
        });
        
        // Notify parent component
        if (onCategoryCreated) {
          onCategoryCreated(response.data);
        }
        
        // Close modal
        onClose();
      }
    } catch (error) {
      console.error('Error creating category:', error);
      showToast('error', error.response?.data?.message || 'Failed to create category');
    } finally {
      setIsCategoryLoading(false);
    }
  };

  const handleClose = () => {
    // Reset form when closing
    setCategoryForm({
      title: "",
      parent_id: 0,
      description: "",
      slug: "",
      status: 1,
      show_menu: 1,
      is_parent_id: 0,
      is_show_home: 0
    });
    onClose();
  };

  const getModalWidth = () => {
    const screenWidth = window.innerWidth;
    if (screenWidth > 1024) return "500px";
    if (screenWidth > 768) return "450px";
    return "90%";
  };

  return (
    <Modal
      open={open}
      showCloseIcon={true}
      onClose={handleClose}
      center
      styles={{
        modal: {
          width: getModalWidth(),
          maxWidth: '550px',
          borderRadius: '12px',
          padding: '0',
        },
      }}
    >
      <div className="col-12 rounded px-4 pt-4 pb-3" style={{ overflowX: 'hidden' }}>
        <div className="d-flex align-items-center mb-20">
          <i className="icon-folder text-purple-1 text-24 mr-10"></i>
          <h3 className="text-22 fw-600 mb-0">Create New Category</h3>
        </div>
        
        <form onSubmit={handleCategorySubmit}>
          {/* Category Title */}
          <div className="mb-20">
            <label
              htmlFor="categoryTitle"
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
                display: "block"
              }}
            >
              Category Name <span style={{ color: '#ff6b6b' }}>*</span>
            </label>
            <input
              required
              type="text"
              name="title"
              id="categoryTitle"
              placeholder="e.g., Web Development, Cloud Computing"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#fff",
                transition: "border-color 0.2s",
              }}
              value={categoryForm.title}
              onChange={handleCategoryFormChange}
              onFocus={(e) => e.target.style.borderColor = "#6440FB"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
          </div>

          {/* Parent Category Dropdown */}
          <div className="mb-20">
            <label
              htmlFor="parentCategory"
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
                display: "block"
              }}
            >
              Parent Category
            </label>
            {isLoadingParentCategories ? (
              <div style={{ 
                padding: "12px", 
                textAlign: "center",
                backgroundColor: "#f8f9fa",
                borderRadius: "8px"
              }}>
                <CircularProgress size={20} />
                <span className="ml-10" style={{ fontSize: "14px", color: "#666" }}>
                  Loading categories...
                </span>
              </div>
            ) : (
              <>
                <select
                  name="parent_id"
                  id="parentCategory"
                  style={{
                    width: "100%",
                    padding: "12px",
                    border: "1px solid #ced4da",
                    borderRadius: "8px",
                    fontSize: "14px",
                    outline: "none",
                    backgroundColor: "#fff",
                    cursor: "pointer",
                    transition: "border-color 0.2s",
                  }}
                  value={categoryForm.parent_id}
                  onChange={handleCategoryFormChange}
                  onFocus={(e) => e.target.style.borderColor = "#6440FB"}
                  onBlur={(e) => e.target.style.borderColor = "#ced4da"}
                >
                  <option value="0">None (Root Category)</option>
                  {parentCategories.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.title}
                    </option>
                  ))}
                </select>
                <small style={{ 
                  color: '#666', 
                  fontSize: '12px', 
                  marginTop: '5px', 
                  display: 'block',
                  fontStyle: 'italic'
                }}>
                  Select a parent to create a subcategory, or leave as "None" for a root category
                </small>
              </>
            )}
          </div>

          {/* Description */}
          <div className="mb-20">
            <label
              htmlFor="categoryDescription"
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
                display: "block"
              }}
            >
              Description
            </label>
            <textarea
              name="description"
              id="categoryDescription"
              placeholder="Brief description of this category (optional)"
              rows="3"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#fff",
                resize: "vertical",
                fontFamily: "inherit",
                transition: "border-color 0.2s",
              }}
              value={categoryForm.description}
              onChange={handleCategoryFormChange}
              onFocus={(e) => e.target.style.borderColor = "#6440FB"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
          </div>

          {/* Slug */}
          <div className="mb-20">
            <label
              htmlFor="categorySlug"
              style={{
                marginBottom: "8px",
                fontWeight: "600",
                color: "#333",
                fontSize: "14px",
                display: "block"
              }}
            >
              URL Slug
            </label>
            <input
              type="text"
              name="slug"
              id="categorySlug"
              placeholder="auto-generated-from-title"
              style={{
                width: "100%",
                padding: "12px",
                border: "1px solid #ced4da",
                borderRadius: "8px",
                fontSize: "14px",
                outline: "none",
                backgroundColor: "#f8f9fa",
                transition: "border-color 0.2s",
              }}
              value={categoryForm.slug}
              onChange={handleCategoryFormChange}
              onFocus={(e) => e.target.style.borderColor = "#6440FB"}
              onBlur={(e) => e.target.style.borderColor = "#ced4da"}
            />
            <small style={{ 
              color: '#666', 
              fontSize: '12px', 
              marginTop: '5px', 
              display: 'block',
              fontStyle: 'italic'
            }}>
              Auto-generated from title, edit if needed
            </small>
          </div>

          {/* Status, Show in Menu, Show on Home - Grid Layout */}
          <div className="row mb-20">
            <div className="col-md-4 mb-15">
              <label
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                  fontSize: "14px",
                  display: "block"
                }}
              >
                Status
              </label>
              <select
                name="status"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                value={categoryForm.status}
                onChange={handleCategoryFormChange}
              >
                <option value="1">✓ Active</option>
                <option value="0">✕ Inactive</option>
              </select>
            </div>
            
            <div className="col-md-4 mb-15">
              <label
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                  fontSize: "14px",
                  display: "block"
                }}
              >
                Show in Menu
              </label>
              <select
                name="show_menu"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                value={categoryForm.show_menu}
                onChange={handleCategoryFormChange}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
            
            <div className="col-md-4 mb-15">
              <label
                style={{
                  marginBottom: "8px",
                  fontWeight: "600",
                  color: "#333",
                  fontSize: "14px",
                  display: "block"
                }}
              >
                Show on Home
              </label>
              <select
                name="is_show_home"
                style={{
                  width: "100%",
                  padding: "12px",
                  border: "1px solid #ced4da",
                  borderRadius: "8px",
                  fontSize: "14px",
                  outline: "none",
                  backgroundColor: "#fff",
                  cursor: "pointer",
                }}
                value={categoryForm.is_show_home}
                onChange={handleCategoryFormChange}
              >
                <option value="1">Yes</option>
                <option value="0">No</option>
              </select>
            </div>
          </div>

          {/* Action Buttons */}
          <div 
            className="d-flex justify-content-end gap-10 pt-20 mt-20" 
            style={{ 
              borderTop: '1px solid #e9ecef',
              gap: '10px'
            }}
          >
            <Button
              variant="outlined"
              style={{ 
                borderColor: "#6440FB", 
                color: "#6440FB",
                textTransform: "none",
                fontWeight: "600",
                padding: "10px 24px"
              }}
              onClick={handleClose}
              type="button"
              disabled={isCategoryLoading}
            >
              Cancel
            </Button>
            <Button
              variant="contained"
              style={{ 
                backgroundColor: "#6440FB",
                textTransform: "none",
                fontWeight: "600",
                padding: "10px 24px"
              }}
              type="submit"
              disabled={isCategoryLoading || !categoryForm.title.trim()}
            >
              {isCategoryLoading ? (
                <>
                  <CircularProgress size={18} sx={{ color: "inherit", mr: 1 }} />
                  Creating...
                </>
              ) : (
                <>
                  <i className="icon-plus mr-8"></i>
                  Create Category
                </>
              )}
            </Button>
          </div>
        </form>
      </div>
    </Modal>
  );
};

export default AddCategoryModal;