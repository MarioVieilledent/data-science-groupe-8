- ## Our solution
  **Science Hub** web-app
  Web app to resolve complexity to search for scientific articles
  - ### How to use it?
    1) Type key-words
    2) Displays related articles
    3) Browse articles on HAL, download PDF, get
- ## API or Scraping?
  - ### Difference
    **API** => Easy way to request specific data
    **Scraping** => Complex search in HTML code for specific data
  - ### Uses
    **Google Scholar**: closed to scraping
    **HAL**: offers a free API

- ## Programming language
  - ### `React` web-app
    To learn a new framework
    Programming languages `HTML`, `TS`, `TSX`, `SCSS`
    Web => effective to __quickly__ build complex apps and nice display
    Web => handles HTTP requests easily and __asynchronously__

- ## Process of querying
  - ### Learn about HAL API
    [HAL API](https://api.archives-ouvertes.fr/docs/search)
    ![sciencedirect.png](./assets/hal_api.png)
  - ### 1 - Build url
    Retrieve parameters
    ```ts
    apiMaker: {
      q: 'car', // Query (key-words for title, authors, country, etc.)
      wt: 'json', // Format of response
      rows: '100', // Number of results
      fl: fl.join(',') // Elements I want to fetch
    }
    ```
  - ### 1 - Build url
    Builds the URL to query the HAL API
    ```ts
      entryPoints.root + '?' +
      Object.entries(this.state.apiMaker)
        .map((
          [key, value]) => {
          return key + '=' + value
        }).
        join('&');
      // Output : http://api.archives-ouvertes.fr/search?q=car&wt=json&rows=100&fl=[...]
    ```
  - ### 2 - Request the source
    HTTP GET request with `fetch` method
    ```ts
    export function httpService(url: string, func: Function): void {
      fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
          res.json().then(data => {
              func(data);
          });
      })
    }
    ```
  - ### 3 - Wait and process response
    The web-app asynchronously waits for response
    `wt` param to specify type of response (json, XML, CSV, etc.)
    We use `json` (native to `JavaScript`)
  - ### 4 - Display documents
    Use of `React TSX Elements` and `SCSS` for displaying
    ![sciencedirect.png](./assets/science_hub_demo.png)

- ## Give more options
  - ### `React` web-app
    HAL => link to the HAL details page
    PDF => link to a pdf file if exists
    DOI => URI redirecting to official page

- ## Conclusion
    The web is perfect for building apps quickly
    Scientific articles are difficult to find
    But it's worth looking into
