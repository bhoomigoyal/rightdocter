import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-list',
  standalone: true,
  imports: [CommonModule, RouterModule],
  template: `
    <div class="list-container">
      <div class="list-header">
        <h2 class="list-title">People List</h2>
        <a [routerLink]="['/create']" class="btn-add">
          <span class="btn-icon">+</span> Add Person
        </a>
      </div>
      
      <div class="table-responsive">
        <table class="data-table">
          <thead>
            <tr>
              <th>Name</th>
              <th>Age</th>
              <th>Gender</th>
              <th>Mobile</th>
              <th class="actions-column">Actions</th>
            </tr>
          </thead>
          <tbody>
            <tr *ngFor="let person of people">
              <td>{{person.name}}</td>
              <td>{{person.age}}</td>
              <td>
                <span class="badge" [ngClass]="getGenderClass(person.gender)">
                  {{person.gender}}
                </span>
              </td>
              <td>{{person.mobileNumber}}</td>
              <td class="actions-cell">
                <a [routerLink]="['/edit', person._id]" class="action-btn edit-btn">
                  Edit
                </a>
                <button (click)="deletePerson(person._id)" class="action-btn delete-btn">
                  Delete
                </button>
              </td>
            </tr>
            <tr *ngIf="people.length === 0">
              <td colspan="5" class="empty-table">
                No people found. Click "Add Person" to create one.
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  `,
  styles: [`
    .list-container {
      max-width: 1200px;
      margin: 0 auto;
      padding: 30px 20px;
      background-color: #f5f5f5;
      min-height: 100vh;
    }
    
    .list-header {
      display: flex;
      justify-content: space-between;
      align-items: center;
      margin-bottom: 25px;
    }
    
    .list-title {
      color: #333;
      font-size: 28px;
      margin: 0;
    }
    
    .btn-add {
      display: inline-flex;
      align-items: center;
      background-color: #4a90e2;
      color: white;
      padding: 10px 20px;
      border-radius: 4px;
      text-decoration: none;
      font-weight: 500;
      transition: background-color 0.3s;
    }
    
    .btn-add:hover {
      background-color: #3a7bc8;
    }
    
    .btn-icon {
      margin-right: 8px;
      font-weight: bold;
      font-size: 18px;
    }
    
    .table-responsive {
      overflow-x: auto;
      background: white;
      border-radius: 8px;
      box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    }
    
    .data-table {
      width: 100%;
      border-collapse: collapse;
      border-radius: 8px;
      overflow: hidden;
    }
    
    .data-table th {
      background-color: #f8f9fa;
      color: #495057;
      font-weight: 600;
      text-align: left;
      padding: 15px;
      border-bottom: 2px solid #e9ecef;
    }
    
    .data-table td {
      padding: 14px 15px;
      border-bottom: 1px solid #e9ecef;
      color: #495057;
    }
    
    .data-table tbody tr:hover {
      background-color: #f8f9fa;
    }
    
    .data-table tbody tr:last-child td {
      border-bottom: none;
    }
    
    .actions-column {
      width: 180px;
      text-align: center;
    }
    
    .actions-cell {
      display: flex;
      gap: 10px;
      justify-content: flex-start;
    }
    
    .action-btn {
      padding: 8px 12px;
      border-radius: 4px;
      font-size: 14px;
      font-weight: 500;
      cursor: pointer;
      border: none;
      transition: background-color 0.2s;
    }
    
    .edit-btn {
      background-color: #4a90e2;
      color: white;
      text-decoration: none;
    }
    
    .edit-btn:hover {
      background-color: #3a7bc8;
    }
    
    .delete-btn {
      background-color: #ff5252;
      color: white;
    }
    
    .delete-btn:hover {
      background-color: #e03e3e;
    }
    
    .badge {
      display: inline-block;
      padding: 4px 10px;
      border-radius: 20px;
      font-size: 12px;
      font-weight: 500;
      text-transform: capitalize;
    }
    
    .badge-male {
      background-color: #e6f4ff;
      color: #1890ff;
    }
    
    .badge-female {
      background-color: #fff0f6;
      color: #eb2f96;
    }
    
    .badge-other {
      background-color: #f6ffed;
      color: #52c41a;
    }
    
    .empty-table {
      padding: 30px;
      text-align: center;
      color: #6c757d;
      font-style: italic;
    }
    
    @media (max-width: 768px) {
      .list-header {
        flex-direction: column;
        align-items: flex-start;
        gap: 15px;
      }
      
      .actions-cell {
        flex-direction: column;
        gap: 8px;
      }
      
      .action-btn {
        width: 80px;
        text-align: center;
      }
    }
  `]
})
export class PersonListComponent implements OnInit {
  people: Person[] = [];

  constructor(private personService: PersonService) {}

  ngOnInit() {
    this.loadPeople();
  }

  loadPeople() {
    this.personService.getAll().subscribe(data => {
      this.people = data;
    });
  }

  deletePerson(id: string | undefined) {
    if (!id) return;
    if (confirm('Are you sure you want to delete this person?')) {
      this.personService.delete(id).subscribe(() => {
        this.loadPeople();
      });
    }
  }
  
  getGenderClass(gender: string): string {
    switch(gender.toLowerCase()) {
      case 'male': return 'badge-male';
      case 'female': return 'badge-female';
      default: return 'badge-other';
    }
  }
}