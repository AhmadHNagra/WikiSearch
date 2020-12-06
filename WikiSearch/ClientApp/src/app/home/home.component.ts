import { Component, Inject } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  wikiUrl: string = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=';
  pageUrl: string = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/?curid=';
  backendUrl: string;
  searchText: string = '';
  loadedPage: string = '';
  result = new Array<any>();
  loading: boolean = false;
  showButton: boolean = false;
  nextPage: any;

  constructor(private http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    this.backendUrl = baseUrl;
  }

  public onClick() {
    this.loading = true;
    const tempUrl = this.wikiUrl + this.searchText;
    this.result = [];
    this.http.get(tempUrl).subscribe((data: any) => {
      this.nextPage = data.continue;
      data.query.search.forEach(element => {
        const tempUrl = this.pageUrl + element.pageid;
        this.http.get(tempUrl, { responseType: 'text' }).subscribe((data: any) => {
          element.loadedPage = data;
          this.result.push(element);
        });
      });
      this.loading = false;
      this.showButton = true;
    });
    const current = new SearchHistory(this.searchText, null);
    this.http.post(this.backendUrl + 'api/SearchHistories', current).subscribe(
      data => { },error => console.error(error));
  }

  ngDoCheck() {
    if (!this.searchText) {
      this.result = [];
      this.showButton = false;
    }
    if (!this.nextPage) {
      this.showButton = false;
    }
  }

  onNext() {
    const tempUrl = this.wikiUrl + this.searchText + '&continue=' + this.nextPage.continue + '&sroffset=' + this.nextPage.sroffset;
    this.http.get(tempUrl).subscribe((data: any) => {
      this.result = [];
      this.nextPage = data.continue;
      data.query.search.forEach(element => {
        const tempUrl = this.pageUrl + element.pageid;
        this.http.get(tempUrl, { responseType: 'text' }).subscribe((data: any) => {
          element.loadedPage = data;
          this.result.push(element);
        });
      });
      this.loading = false;
      this.showButton = true;
    });
  }

  public expandOrCollapseRow(index) {
    for (let i = 0; i < this.result.length; i++) {
      if (i == index) {
        this.result[i].expanded = !this.result[i].expanded;
      }
      else {
        this.result[i].expanded = false;
      }
    }
  }
}

class SearchHistory {
  SearchQuery: string;
  SearchResult: string;

  constructor(query, result) {
    this.SearchQuery = query;
    this.SearchResult = result;

  }
}
