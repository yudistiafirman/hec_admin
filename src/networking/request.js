import axios from "axios";

function getContentType(dataToReceived) {
  let contentType = "application/json";
  if (dataToReceived instanceof FormData) {
    contentType = "multipart/form-data";
  }
  return contentType;
}

const getOptions = async (method, data) => {
  try {
    const options = {};
    options.method = method;
    options.headers = {
      Accept: "application/json",
      "Content-Type": getContentType(data),
    };

    if (data) {
      options.data = data;
    }

    options.timeoutInterval = 10000;
    return options;
  } catch (error) {
    console.log(error, "error/getOptions");
  }
};

const instance = axios.create({
  withCredentials: false,
});

export const apiRequest = async (request, method, data) => {
  // performance API log
  // metric = await perf().newHttpMetric(request, method);
  // await metric.start();

  return instance(request, await getOptions(method, data));
};
