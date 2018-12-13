const DEFAULT_API = 'https://api.unsplash.com';

export default class API {
  constructor({ accessKey, apiUrl, httpClient }) {
    this.http = httpClient.create({
      baseURL: apiUrl || DEFAULT_API,
      headers: {
        'Authorization': `Client-ID ${accessKey}`
      }
    });
  }

  async getResource(resource, params = {}) {
    // let queryString = Object.entries(params)
    //   .map(([key, value]) => key + '=' + value)
    //   .join('&');
  
    // queryString = queryString && '?' + queryString;
  
    // const route = resource + queryString;
    // const { data } = await this.http.get(route);
    const { data } = await this.http.get(resource, { params });
    return data && data.results ? data.results : data;
  }

  ping(link) {
    return this.http.get(link);
  }
}