- ![sciencehub.png](./assets/sciencehub_1652346620872_0.png)
	- ## What is Scientific literature ?
	  ![sci-publication.png](./assets/sci-publication_1652346666026_0.png){:height 364, :width 554}
- # Context of our project
	- ## Paid data
	  ![paid_data.png](./assets/paid_data_1652346687986_0.png) 
	  Consult scientific documents without paying
	- Depending on the scientific disciplines, between 60% and 80% of scientific articles are only available on paid subscriptions on publishers' websites.
	- Insufficient access to subscription articles that encourage the use of illegal means
- ## Complicated data to find (Where to look)
  ![wheretolook.png](./assets/wheretolook_1652346769606_0.png)
- ## How scientific publications works
  Publicly funded
  Peer review managed by editors (ex: Elsevier)
  Lack of funding
	- ![doi.png](./assets/doi_1652346711207_0.png){:height 236, :width 467}
	  Permanent identification mechanism for digital resources.
	  Used for research reports and official publications
	- H-Index
	  ![h-index.png](./assets/h-index_1652346720453_0.png)
	  Measures the productivity and citation impact of a scientist
- ## Scientific publishing site
	- ![google_scholar.png](./assets/google_scholar_1652346811890_0.png)
	  Scholarly literature
	- ![google_patents.png](./assets/google_patents_1652346836535_0.png)
	  Patents
	- ![HAL.png](./assets/HAL_1652346849186_0.png){:height 215, :width 470}
	  Open archive for scholarly documents
	  Offers an open API for querying documents
	- ![IEEEXplore.png](./assets/IEEEXplore_1652346859699_0.png)
	- ![sci-hub.png](./assets/sci-hub_1652347159897_0.png){:height 255, :width 419}
	  Illegal website provinding free access to millions of research papers.
	  Alexandra Elbakyan
	- ![elsevier.png](./assets/elsevier_1652346867490_0.png)
	- ![sciencedirect.png](./assets/sciencedirect_1652346875620_0.png)
- ## Our solution
  **Science Hub** web-app
  Web app to easily access to scientific articles
    Uses data from HAL
  - ### How to use it?
    1) Type key-words
    2) Displays related articles
    3) Browse article on HAL, download PDF, get
- ## API or Scraping?
  - ### Difference
    **API** => Easy way to request specific data
    **Scraping** => Complex search in HTML code for specific data
  - ### Uses
    **Google Scholar**: closed to scraping
    **HAL**: offers a free API

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
    buildUrl(): string {
      return (
        entryPoints.root +
        '?' +
        Object.entries(this.state.apiMaker)
          .map((
            [key, value]) => {
            return key + '=' + value
          }).
          join('&'));
      // Output : http://api.archives-ouvertes.fr/search?q=car&wt=json&rows=100&fl=[...]
    }
    ```
  - ### 2 - Request the source
    HTTP GET request with `fetch` method
    ```ts
    export function httpService(url: string, func: Function): void {
      console.warn(url);
      fetch(url, { method: 'GET', mode: 'cors' }).then(res => {
          res.json().then(data => {
              func(data);
          });
      })
    }
    ```
  - ### 3 - Process response
    `HTML` and `SCSS` display using `React`
    ![sciencedirect.png](./assets/science_hub_demo.png)