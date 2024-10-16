import axios from 'axios';
import { config } from "dotenv";

config()
// const PAYSTACK_TEST_SECRET_KEY = "pk_test_0bd610444a94559cabd929a39f79d29b5b55e668";

// const PAYSTACK_SECRET_KEY = PAYSTACK_TEST_SECRET_KEY;

const PAYSTACK_SECRET_KEY = process.env.PAYSTACK_TEST_SECRET_KEY;
const baseURL = 'https://api.paystack.co';

export const initializePayment = async (paymentData) => {
  const config = {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
      'Content-Type': 'application/json',
    },
  };
  
  try {
    const response = await axios.post(`${baseURL}/transaction/initialize`, paymentData, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};

export const verifyPayment = async (reference) => {
  const config = {
    headers: {
      Authorization: `Bearer ${PAYSTACK_SECRET_KEY}`,
    },
  };
  
  try {
    const response = await axios.get(`${baseURL}/transaction/verify/${reference}`, config);
    return response.data;
  } catch (error) {
    throw new Error(error.response ? error.response.data.message : error.message);
  }
};
