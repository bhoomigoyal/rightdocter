import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { PersonService } from '../../services/person.service';
import { Person } from '../../models/person.model';

@Component({
  selector: 'app-person-form',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <div class="form-container">
      <div class="form-card">
        <h2 class="form-title">{{isEditMode ? 'Edit' : 'Create'}} Person</h2>
        <form (ngSubmit)="onSubmit()">
          <div class="form-group">
            <label for="name">Name:</label>
            <input 
              type="text" 
              id="name" 
              [(ngModel)]="person.name" 
              name="name" 
              class="form-control" 
              required>
          </div>
          <div class="form-group">
            <label for="age">Age:</label>
            <input 
              type="number" 
              id="age" 
              [(ngModel)]="person.age" 
              name="age" 
              class="form-control" 
              required>
          </div>
          <div class="form-group">
            <label for="gender">Gender:</label>
            <select 
              id="gender" 
              [(ngModel)]="person.gender" 
              name="gender" 
              class="form-control" 
              required>
              <option value="" disabled selected>Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
              <option value="other">Other</option>
            </select>
          </div>
          <div class="form-group">
            <label for="mobile">Mobile Number:</label>
            <input 
              type="tel" 
              id="mobile" 
              [(ngModel)]="person.mobileNumber" 
              name="mobileNumber" 
              class="form-control" 
              required>
          </div>
          <div class="button-group">
            <button type="submit" class="btn btn-primary">{{isEditMode ? 'Update' : 'Create'}}</button>
            <button type="button" class="btn btn-secondary" (click)="cancel()">Cancel</button>
          </div>
        </form>
      </div>
    </div>
  `,
  styles: [`
    .form-container {
      display: flex;
      justify-content: center;
      align-items: center;
      min-height: 100vh;
      background-color: #f5f5f5;
      padding: 20px;
    }
    
    .form-card {
      background: white;
      border-radius: 8px;
      box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1), 0 1px 3px rgba(0, 0, 0, 0.08);
      width: 100%;
      max-width: 500px;
      padding: 30px;
    }
    
    .form-title {
      color: #333;
      font-size: 24px;
      margin-bottom: 25px;
      text-align: center;
    }
    
    .form-group {
      margin-bottom: 20px;
    }
    
    label {
      display: block;
      margin-bottom: 8px;
      font-weight: 500;
      color: #555;
    }
    
    .form-control {
      width: 100%;
      padding: 12px;
      border: 1px solid #ddd;
      border-radius: 4px;
      font-size: 16px;
      transition: border-color 0.3s, box-shadow 0.3s;
    }
    
    .form-control:focus {
      border-color: #4a90e2;
      box-shadow: 0 0 0 3px rgba(74, 144, 226, 0.2);
      outline: none;
    }
    
    .button-group {
      display: flex;
      justify-content: space-between;
      margin-top: 30px;
    }
    
    .btn {
      padding: 12px 20px;
      border: none;
      border-radius: 4px;
      font-size: 16px;
      font-weight: 500;
      cursor: pointer;
      transition: background-color 0.3s, transform 0.1s;
    }
    
    .btn:active {
      transform: translateY(1px);
    }
    
    .btn-primary {
      background-color: #4a90e2;
      color: white;
      flex: 1;
      margin-right: 10px;
    }
    
    .btn-primary:hover {
      background-color: #3a7bc8;
    }
    
    .btn-secondary {
      background-color: #f5f5f5;
      color: #555;
      border: 1px solid #ddd;
      flex: 1;
    }
    
    .btn-secondary:hover {
      background-color: #e8e8e8;
    }
    
    @media (max-width: 600px) {
      .form-card {
        padding: 20px;
      }
      
      .button-group {
        flex-direction: column;
      }
      
      .btn-primary {
        margin-right: 0;
        margin-bottom: 10px;
      }
    }
  `]
})
export class PersonFormComponent implements OnInit {
  person: Person = {
    name: '',
    age: 0,
    gender: '',
    mobileNumber: ''
  };
  isEditMode = false;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) {}

  ngOnInit() {
    const id = this.route.snapshot.params['id'];
    if (id) {
      this.isEditMode = true;
      this.personService.getById(id).subscribe(person => {
        this.person = person;
      });
    }
  }

  onSubmit() {
    if (this.isEditMode) {
      this.personService.update(this.person._id!, this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    } else {
      this.personService.create(this.person).subscribe(() => {
        this.router.navigate(['/']);
      });
    }
  }

  cancel() {
    this.router.navigate(['/']);
  }
}