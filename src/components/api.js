import axios from "../api/axios";

const API_BASE_URL = "http://localhost:8000/api";
const fetchCsrfToken = async () => {
  try {
    await axios.get("/sanctum/csrf-cookie"); // Fetch the CSRF token
  } catch (error) {
    console.error("Error fetching CSRF token:", error);
  }
};

export const fetchCategories = () => axios.get(`${API_BASE_URL}/categories`);

export const createCategory = async (categoryData) => {
  await fetchCsrfToken();
  axios.post(`${API_BASE_URL}/categories`, categoryData);
};

export const updateCategory = (categoryId, categoryData) =>
  axios.put(`${API_BASE_URL}/categories/${categoryId}`, categoryData);

export const deleteCategory = (categoryId) =>
  axios.delete(`${API_BASE_URL}/categories/${categoryId}`);

export const fetchCategory = (categoryId) =>
  axios.get(`${API_BASE_URL}/categories/${categoryId}`);

export const fetchSubcategories = (categoryId) =>
  axios.get(`${API_BASE_URL}/categories/${categoryId}/subcategories`);

export const createSubcategory = (categoryId, subcategoryData) =>
  axios.post(
    `${API_BASE_URL}/categories/${categoryId}/subcategories`,
    subcategoryData
  );

export const updateSubcategory = (categoryId, subcategoryId, subcategoryData) =>
  axios.put(
    `${API_BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}`,
    subcategoryData
  );

export const deleteSubcategory = (categoryId, subcategoryId) =>
  axios.delete(
    `${API_BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}`
  );

export const fetchSubCategory = (categoryId, subcategoryId) =>
  axios.get(
    `${API_BASE_URL}/categories/${categoryId}/subcategories/${subcategoryId}`
  );
