import axios from 'axios';

const DEFAULT_API = 'https://api.unsplash.com';

export default class API {
  constructor({ accessKey, apiUrl }) {
    this.http = axios.create({
      baseURL: apiUrl || DEFAULT_API,
      headers: {
        'Authorization': `Client-ID ${accessKey}`
      }
    });
  }

  async getResource(resource, params = {}) {
    let queryString = Object.entries(params)
      .map(([key, value]) => key + '=' + value)
      .join('&');
  
    queryString = queryString && '?' + queryString;
  
    const route = resource + queryString;
    const { data } = await this.http.get(route);
  
    return data && data.results ? data.results : data;
  }
}