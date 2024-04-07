// ForgotPasswordAPI.js

import axiosInstance from '../axiosInstance';

export const sendOTP = async (email) => {
  try {
    const response = await axiosInstance.post('/send-otp', {
      email: email,
      category: 'EMAIL',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post('/verify-otp', {
      email: email,
      category: 'EMAIL',
      otp: otp,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const resetPassword = async (email, password) => {
  try {
    const response = await axiosInstance.post("/forgot-password", {
      email,
      password,
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};
