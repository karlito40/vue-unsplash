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
    const { data } = await this.http.get(resource, {
      validateStatus: () => true,
      params
    });
    
    return data && data.results ? data.results : data;
  }

  ping(link) {
    return this.http.get(link, { validateStatus: () => true });
  }
}