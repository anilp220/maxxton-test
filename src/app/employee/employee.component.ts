import { Component, OnInit } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import * as moment from 'moment';

export interface Candidate {
  id: number;
  name: string;
  department: string;
  joining_date: string;
}

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})
export class EmployeeComponent implements OnInit {

  candidate_data: Candidate[] = [
    { "id": 11, "name": "Ash", "department": "Finance", "joining_date": "8/10/2016" },
    { "id": 12, "name": "John", "department": "HR", "joining_date": "18/1/2011" },
    { "id": 13, "name": "Zuri", "department": "Operations", "joining_date": "28/11/2019" },
    { "id": 14, "name": "Vish", "department": "Development", "joining_date": "7/7/2017" },
    { "id": 15, "name": "Barry", "department": "Operations", "joining_date": "19/8/2014" },
    { "id": 16, "name": "Ady", "department": "Finance", "joining_date": "5/10/2014" },
    { "id": 17, "name": "Gare", "department": "Development", "joining_date": "6/4/2014" },
    { "id": 18, "name": "Hola", "department": "Development", "joining_date": "8/12/2010" },
    { "id": 19, "name": "Ola", "department": "HR", "joining_date": "7/5/2011" },
    { "id": 20, "name": "Kim", "department": "Finance", "joining_date": "20/10/2010" }
  ]
  displayedColumns: string[] = ['index', 'id', 'name', 'department', 'joining_date'];
  dataSource = new MatTableDataSource(this.candidate_data);
  nameSorted = false;
  tempCandidate: Candidate[] = [...this.candidate_data];
  distinctDept: {
    dept: string,
    count: number
  }[] = [];
  constructor() { }

  ngOnInit(): void {
  }

  sortByName() {
    this.candidate_data = this.candidate_data.sort((a, b) => {
      return a.name.localeCompare(b.name)
    })
    this.dataSource = new MatTableDataSource(this.candidate_data)
  }

  sortByDate() {
    // DD/MM/YYYY is incorrect format for javascript that is
    // why im using momentjs to get the correct date
    this.candidate_data = this.candidate_data.sort((a, b) => {
      let dateA = moment(a.joining_date, 'DD/MM/YYYY').toString();
      let dateB = moment(b.joining_date, 'DD/MM/YYYY').toString();
      return new Date(dateA).getTime() - new Date(dateB).getTime();
    })
    this.dataSource = new MatTableDataSource(this.candidate_data)
  }

  applyFilter(event) {
    let value = event.target.value
    value = value.trim();
    value = value.toLowerCase();
    this.dataSource.filter = value;
  }

  findCandidate() {
    // this.candidate_data.forEach(element => {
    //   console.log(moment(element.joining_date, 'DD/MM/YYY').get('year'))
    // });
    this.candidate_data = this.tempCandidate.filter((candidate => {
      let year = moment(candidate.joining_date, 'DD/MM/YYYY').get('year')
      let currentYear = moment().get('year')
      return currentYear - year > 2
    }))
    this.dataSource = new MatTableDataSource(this.candidate_data)
  }

  getDistinct() {
    const dept = [...new Set(this.tempCandidate.map(obj => obj.department))]
    if (dept.length) {
      dept.forEach(d => {
        let count = 0
        this.tempCandidate.map(candidate => {
          if (candidate.department == d) {
            count++
          }
        })
        this.distinctDept.push({
          dept: d,
          count: count
        })
      })
    }
    console.log(this.distinctDept)
  }

  removeCandidate() {
    this.candidate_data = this.candidate_data.filter(candidate => {
      return candidate.department != 'Development';
    })
    this.dataSource = new MatTableDataSource(this.candidate_data)
  }

  reset() {
    this.dataSource = new MatTableDataSource(this.tempCandidate)
    this.distinctDept = [];
  }
}
