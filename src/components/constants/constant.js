

export const options = {
  method: 'GET',
  url: 'https://twitter154.p.rapidapi.com/trends/',
  params: {woeid: '23424969'},
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
  }
};

export const follower = {
  method: 'GET',
  url: 'https://twitter154.p.rapidapi.com/user/followers',
  params: {
    user_id: '908795279008288768',
    limit: '10'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
  }
};
export const following = {
  method: 'GET',
  url: 'https://twitter154.p.rapidapi.com/user/following',
  params: {
    user_id: '908795279008288768',
    limit: '10'
  },
  headers: {
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'twitter154.p.rapidapi.com'
  }
};

const encodedParams = new URLSearchParams();
encodedParams.set('woeid', '1');

export const global = {
  method: 'POST',
  url: 'https://twitter-trends5.p.rapidapi.com/twitter/request.php',
  headers: {
    'content-type': 'application/x-www-form-urlencoded',
    'X-RapidAPI-Key': import.meta.env.VITE_API_KEY,
    'X-RapidAPI-Host': 'twitter-trends5.p.rapidapi.com'
  },
  data: encodedParams,
};