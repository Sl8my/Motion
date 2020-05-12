let baseUrl = '';

if (process.env.NODE_ENV === 'development') {
  baseUrl = 'http://0.0.0.0:8000/backend/api/'
} else {
  baseUrl = 'http://motion.propulsion-home.ch/backend/api/'
}

baseUrl = 'https://motion.propulsion-home.ch/backend/api/';  // TODO remove before this line before pushing


// Background image for the user profile in case user has not specified a custom one.
export const defaultUserProfileBanner = 'https://via.placeholder.com/1200x300';

export default baseUrl;
