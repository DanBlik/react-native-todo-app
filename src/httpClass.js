export class Http {
  static HEADERS = {
    "Content-Type": "application/json",
  };

  static async get(url) {
    try {
      return request(url);
    } catch (error) {
      console.log(error);
    }
  }

  static async post(url, data = {}) {
    try {
      return request(url, "POST", data);
    } catch (error) {
      console.log(error);
    }
  }

  static async patch(url, data = {}) {
    try {
      return request(url, "PATCH", data);
    } catch (error) {
      console.log(error);
    }
  }

  static async delete(url) {
    try {
      return request(url, "DELETE");
    } catch (error) {
      console.log(error);
    }
  }
}

async function request(url, method = "GET", data) {
  let config = {
    method,
    headers: Http.HEADERS,
  };

  if (method === "POST" || method === "PATCH") {
    config = {
      ...config,
      body: JSON.stringify(data),
    };
  }

  const response = await fetch(url, config);

  return response.json();
}
