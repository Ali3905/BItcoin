export const getExploreData = async (category, period) => {
  let response;
  if (category == 'all') {
    response = await fetch(`https://api.chiatothemoon.com/get-projects?tag=&period=${period}`);
  }
  else {
    response = await fetch(`https://api.chiatothemoon.com/get-projects?tag=${category}&period=${period}`);
  }
  const data = await response.json();
  return data;
};

export const getExploreProject = async (project) => {
  // Make an API call to fetch data based on the parameter
  const response = await fetch(`https://api.chiatothemoon.com/get-project?id=${project}`);
  const data = await response.json();
  return data;
};
export const getDid = async (didid) => {
  // Make an API call to fetch data based on the parameter
  const response = await fetch(`https://api.spacescan.io/did/basic_info/${didid}`);
  const data = await response.json();
  return data;
};

export const getDIDInfo = async (teams) => {
  const response = await fetch("https://api.spacescan.io/did/basic_info", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({ "dids": [teams] }),
  });
  const data = await response.json();
  return data;
};
export const submitProject = async (formData) => {
  const response = await fetch('https://api.chiatothemoon.com/submit-project', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(formData),
  });
  console.log(formData);
  const data = await response.json();
  return data;
};