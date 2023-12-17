const fetchData = async (url, options) => {
  try {
    const response = await fetch(url, options);
    const data = await response.json();
    if (!response.ok) {
      const errorMessage = `Request failed with status ${response.status}: ${data.errors[0].message}`;
      throw new Error(errorMessage);
    }
    return data;
  } catch (error) {
    console.error(error);
  }
};

export default fetchData;
