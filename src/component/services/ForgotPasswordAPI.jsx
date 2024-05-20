// ForgotPasswordAPI.js

import axiosInstance from '../axiosInstance';

export const sendOTP = async (email, type) => {
  try {
    const response = await axiosInstance.post('doc-genie/send-otp', {
      email: email,
      category: type,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email, otp, type) => {
  try {
    const response = await axiosInstance.post('doc-genie/verify-otp', {
      email: email,
      category: type,
      otp: otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await axiosInstance.post("doc-genie/forgot-password", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
