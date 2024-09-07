import axios from './axios';

// Fetches NEO data from the NASA API for a given date range
export const getNeoData = (startDate, endDate) => {
  return axios.get('feed', {
    params: {
      start_date: startDate,  
      end_date: endDate       
    }
  });
};
