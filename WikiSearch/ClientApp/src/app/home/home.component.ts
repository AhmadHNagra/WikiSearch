import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
})
export class HomeComponent {

  wikiUrl: string = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/w/api.php?action=query&format=json&list=search&srsearch=';
  pageUrl: string = 'https://cors-anywhere.herokuapp.com/https://en.wikipedia.org/?curid=';
  searchText: string = '';
  loadedPage: string = '';
  result = new Array<any>();
  loading: boolean = false;

  constructor(private http: HttpClient) { }

  public onClick() {
    this.loading = true;
    const tempUrl = this.wikiUrl + this.searchText;
    this.result = [];
    this.http.get(tempUrl).subscribe((data: any) => {
      data.query.search.forEach(element => {
        const tempUrl = this.pageUrl + element.pageid;
        this.http.get(tempUrl, { responseType: 'text' }).subscribe((data: any) => {
          element.loadedPage = data;
          this.result.push(element);
        });
      });
      this.loading = false;
    });
  }

  ngDoCheck() {
    if (!this.searchText) {
      this.result = [];
    }
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
