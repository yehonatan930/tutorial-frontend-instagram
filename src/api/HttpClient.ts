import axios, { AxiosInstance, AxiosResponse } from "axios";

export default abstract class HttpClient {
  protected readonly instance: AxiosInstance;
  public controller: AbortController | null = new AbortController();

  public constructor(baseURL: string) {
    this.instance = axios.create({
      baseURL: `${process.env.REACT_APP_SERVER_URL}${baseURL}`,
    });

    this.instance.interceptors.response.use(
      this.handleResponse,
      this.handleError
    );
  }

  private handleResponse(response: AxiosResponse) {
    return response;
  }
  private handleError(error: any) {
    return Promise.reject(error);
  }
}
