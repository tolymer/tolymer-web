export default accessToken => {
  return {
    headers: {
      Authorization: `Bearer ${accessToken}`
    }
  };
};
