import API from "./api";

const AUTH_STORAGE_KEY = "matisi_admin_auth";

/**
 * Login admin via backend API.
 * @param {{ username: string, password: string }} credentials
 * @returns {Promise<{ success: boolean, message?: string, data?: any }>}
 */
export const loginAdmin = async ({ username, password }) => {
  try {
    const response = await API.post("/post/login", { username, password });

    // Extract token from response (prioritizing 'token' as per API response schema)
    const token = response.data?.token || 
                  response.data?.accessToken || 
                  response.data?.jwt || 
                  response.data?.data?.token || 
                  null;

    // Store auth state in localStorage for persistence
    const authData = {
      isAuthenticated: true,
      username,
      token,
      loginTime: new Date().toISOString(),
    };
    localStorage.setItem(AUTH_STORAGE_KEY, JSON.stringify(authData));

    // Also store token separately as requested
    if (token) {
      localStorage.setItem("token", token);
      localStorage.setItem("jwt", token);
      localStorage.setItem("jwt_token", token);
    }

    return { success: true, data: response.data };
  } catch (error) {
    // Extract error message, checking both 'message' and potential typo 'massage' from response
    const message =
      error.response?.data?.message ||
      error.response?.data?.massage ||
      error.response?.data?.error ||
      "Login gagal. Periksa username dan password Anda.";
    return { success: false, message };
  }
};

/**
 * Check if admin is currently authenticated.
 * @returns {boolean}
 */
export const isAuthenticated = () => {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    if (!authData) return false;
    const parsed = JSON.parse(authData);
    return parsed.isAuthenticated === true;
  } catch {
    return false;
  }
};

/**
 * Get stored auth data.
 * @returns {object|null}
 */
export const getStoredAuth = () => {
  try {
    const authData = localStorage.getItem(AUTH_STORAGE_KEY);
    return authData ? JSON.parse(authData) : null;
  } catch {
    return null;
  }
};

/**
 * Logout admin — clear stored auth.
 */
export const logoutAdmin = () => {
  localStorage.removeItem(AUTH_STORAGE_KEY);
  localStorage.removeItem("token");
  localStorage.removeItem("jwt");
  localStorage.removeItem("jwt_token");
};
