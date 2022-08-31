import axios from 'axios';

const ORIGIN_URL = 'https://pixabay.com/api/';
export const config = {
  params: {
    key: '29626198-326b5aa7fac3f0cf23894dd64',
    image_type: 'photo',
    orientation: 'horizontal',
    safesearch: 'true',
    page: 1,
    per_page: 40,
  },
};

export async function getImages(value) {
  try {
    const response = await axios.get(`${ORIGIN_URL}?q=${value}`, config);

    return response;
  } catch (error) {
    console.error(error);
  }
}
