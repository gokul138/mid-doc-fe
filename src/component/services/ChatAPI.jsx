import axios from 'axios';

const fetchSheets = async (sessionId) => {
  try {
    const response = await axios.get(`http://ec2-15-207-169-254.ap-south-1.compute.amazonaws.com:8081/list-sheets?id=${sessionId}`);

    return response.data;
  } catch (error) {
    console.error('Error fetching sheets:', error);
    throw new Error('Failed to fetch sheets');
  }
};

export default fetchSheets;
