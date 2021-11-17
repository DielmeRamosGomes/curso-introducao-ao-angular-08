import { CourseService } from './course.service';
import { Component, OnInit } from "@angular/core";
import { Course } from "./course";

@Component({
  templateUrl: './course-list.component.html'
})
export class CourseListComponent implements OnInit{
  filteredCourse: Course[] = []

  _courses: Course[] = []


  _filterBy: string = ''

  constructor(private courseService: CourseService) { }

  ngOnInit() : void {
    this.retrieveAll()
  }

  retrieveAll(): void {
    this.courseService.retrieveAll().subscribe({
      next: courses => {
        this._courses = courses
        this.filteredCourse = this._courses
      },
      error: err => console.log('Error', err)
    })
  }

  deleteById(courseId: number): void {
    this.courseService.deleteById(courseId).subscribe({
      next: () => {
        console.log('Deleted with success')
        this.retrieveAll()
      }
    })
  }

  set filter(value: string) {
    this._filterBy = value
    this.filteredCourse = this._courses.filter((course: Course) => course.name.toLowerCase().indexOf(this._filterBy.toLowerCase()) > -1)

  }

  get filter() {
    return this._filterBy
  }


}
