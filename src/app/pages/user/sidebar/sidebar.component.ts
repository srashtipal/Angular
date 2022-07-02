import { Component, OnInit } from '@angular/core';
import { CategoryService } from 'src/app/services/category.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-sidebar-user',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.css']
})
export class SidebarComponent implements OnInit {

   categories: any;

  constructor(
    private categoryService : CategoryService,
  ) { }

  ngOnInit(): void {
    this.categoryService.categories().subscribe((data)=>{
      this.categories = data;
    },
    (error)=>{
      Swal.fire('error !!','Error in add question','error');
    })
  };

}
