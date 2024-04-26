// ForgotPasswordAPI.js

import axiosInstance from '../axiosInstance';

export const sendOTP = async (email) => {
  try {
    const response = await axiosInstance.post('doc-genie/send-otp', {
      email: email,
      category: 'PASSWORD',
    });
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const verifyOTP = async (email, otp) => {
  try {
    const response = await axiosInstance.post('doc-genie/verify-otp', {
      email: email,
      category: 'PASSWORD',
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
