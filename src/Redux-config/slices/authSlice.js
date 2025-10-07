import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import authService from "../apisModel/authService";
import { toast } from "react-hot-toast";

const handleApiError = (error, defaultMessage) => {
  const errorMessage =
    error.response?.data?.message || error.message || defaultMessage;
  toast.error(errorMessage);
  return error.response?.data || { message: errorMessage, error: true };
};

export const loginUser = createAsyncThunk(
  "auth/login",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.login(payload);

      console.log({ response }, "login response");

      if (response.data?.error) {
        toast.error(response?.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success("Login successful!");
      }

      return response.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Login failed. Please try again.")
      );
    }
  }
);

export const forgotPassword = createAsyncThunk(
  "auth/forgot",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.forgotPass(payload);

      if (response.data?.error) {
        toast.error(response?.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success(
          "OTP Sent!",
          response?.data?.message || "OTP Sent Successfully!"
        );
      }
      return response.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to send reset instructions")
      );
    }
  }
);
export const SendOTPRegister = createAsyncThunk(
  "auth/otpRegister",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.sendOTP(payload);
      console.log(response, "send otp response");
      if (response.data?.error) {
        toast.error(response.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success(response.data?.results?.otp);
      }
      return response.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to send reset instructions")
      );
    }
  }
);

export const VerifyOtp = createAsyncThunk(
  "auth/verify",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.verifyOTP(payload);
      console.log({ response });

      if (response.data?.error) {
        toast.error(response.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success(response.data?.message || "OTP Verified Successfully!");
      }
      return response.data || response;
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Failed to send reset instructions")
      );
    }
  }
);

export const signupUser = createAsyncThunk(
  "auth/signUp",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.signup(payload);
      console.log(response, "signup response");

      if (response.data?.error) {
        toast.error(response?.data?.message);
        console.log("dsd");

        return rejectWithValue(response);
      } else {
        toast.success("Registration Succesfull!");
      }

      return response.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed!"));
    }
  }
);

export const resetPassword = createAsyncThunk(
  "auth/reset",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.resetPasswords(payload);

      if (response.error) {
        toast.error(response.message);
        return rejectWithValue(response);
      }

      toast.success(response.message || "Password Reset Successfull!");
      return response.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed!"));
    }
  }
);
export const logoutUser = createAsyncThunk(
  "auth/logout",
  async ({ rejectWithValue }) => {
    try {
      authService.logout();
      toast.success("Logged out successfully!");
      return {};
    } catch (error) {
      return rejectWithValue(
        handleApiError(error, "Logout failed. Please try again.")
      );
    }
  }
);

export const verifyNafat = createAsyncThunk(
  "auth/nafat",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.verifyNafat(payload);

      if (response?.data?.error) {
        toast.error(response.data.message);
        return rejectWithValue(response);
      } else {
        // toast.success(response.data.message || "Code Sent Successfully!");
        return response.data || response;
      }
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed!"));
    }
  }
);

export const verifyNafatCode = createAsyncThunk(
  "auth/nafatCode",
  async (payload, { rejectWithValue }) => {
    try {
      const response = await authService.verifyNafatCode(payload);
      if (response.data?.error) {
        toast.error(response.data?.message);
        return rejectWithValue(response);
      } else {
        toast.success(response.data?.message || "OTP Verified Successfully!");
      }
      toast.success(response.message || "Verification successfully!");
      return response.data || response;
    } catch (error) {
      return rejectWithValue(handleApiError(error, "Failed!"));
    }
  }
);

const initialState = {
  user: null,
  token: null,
  loading: false,
  error: null,
  message: null,
  isEmailSent: false,
  isOTPVerified: false,
  isPasswordReset: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    logout: (state) => {
      state.user = null;
      state.token = null;
      state.loading = false;
      state.error = null;
      state.message = null;
    },
    clearError: (state) => {
      state.error = null;
    },
    clearMessage: (state) => {
      state.message = null;
    },
    resetFlags: (state) => {
      state.isEmailSent = false;
      state.isOTPVerified = false;
      state.isPasswordReset = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Login cases
      .addCase(loginUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.loading = false;
        state.user = action?.payload?.user;
        state.token = action?.payload?.token;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Login failed";
      })

      // Signup cases
      .addCase(signupUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(signupUser.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Signup successful";
      })
      .addCase(signupUser.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Signup failed";
      })

      // nafat cases
      .addCase(verifyNafat.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyNafat.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Nafat successful";
      })
      .addCase(verifyNafat.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Nafat failed";
      })

      // nafat code cases
      .addCase(verifyNafatCode.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(verifyNafatCode.fulfilled, (state, action) => {
        state.loading = false;
        state.message = action.payload.message || "Nafat Code successful";
      })
      .addCase(verifyNafatCode.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Nafat Code failed";
      })

      // Forgot password cases
      .addCase(forgotPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(forgotPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isEmailSent = true;
        state.message = action.payload?.message || "Password reset email sent";
      })
      .addCase(forgotPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Failed to send reset email";
      })

      // Reset password cases
      .addCase(resetPassword.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(resetPassword.fulfilled, (state, action) => {
        state.loading = false;
        state.isPasswordReset = true;
        state.message = action.payload.message || "Password reset successful";
      })
      .addCase(resetPassword.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "Password reset failed";
      })

      // OTP verification cases
      .addCase(VerifyOtp.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(VerifyOtp.fulfilled, (state, action) => {
        state.loading = false;
        state.isOTPVerified = true;
        state.message = action.payload.message || "OTP verified successfully";
      })
      .addCase(VerifyOtp.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload?.message || "OTP verification failed";
      });
  },
});

export const { logout, clearError, clearMessage, resetFlags } =
  authSlice.actions;
export default authSlice.reducer;
