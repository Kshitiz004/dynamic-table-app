import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-dynamic-table',
  templateUrl: './dynamic-table.component.html',
  styleUrls: ['./dynamic-table.component.scss']
})
export class DynamicTableComponent implements OnInit { 

  public users: any[] = [];
  public filteredData: any[] = [];
  public loading: boolean = true;
  public searchQuery: string = '';

  constructor(private http: HttpClient) {}

  ngOnInit(): void {

    this.fetchUsers();
  }


  fetchUsers(): void {
    this.http.get<any[]>('https://jsonplaceholder.typicode.com/users')

      .subscribe(response => {
        this.users = response;
        this.filteredData = response;
        this.loading = false;
      });
  }


  filterGlobal() {
    const query = this.searchQuery.toLowerCase();
    this.filteredData = this.users.filter(item =>
      Object.keys(item).some(key =>
        item[key]?.toString().toLowerCase().includes(query)
      )
    );
  }

}
