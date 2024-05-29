import { HttpBackend, HttpClient } from '@angular/common/http';
import { Component,OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { FormBuilder,FormGroup } from '@angular/forms';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';


@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})

  export class HomeComponent implements OnInit{
  form!:FormGroup;
  router: any;
  filename: any;
  format: any;
  formfile: any;
  file:any;
  showLoader: boolean = false;

  constructor(
    private fb:FormBuilder,
    private _snackBar: MatSnackBar,
    private http: HttpClient
   
){}
  ngOnInit(): void {
    this.form=this.fb.group({
      file:[''],
      periodicity:[''],
      duration:['']
      
})
}

  
  submit()
  {
    console.log('submited')
    console.log(this.form.value);
    
    this.http.post<any>("http://localhost:5000/signup",this.form.value)
    .subscribe(res=>{
     
    },err=>{
      alert("something went wrong")
})
}
    step = 0;
  
    setStep(index: number) {
      this.step = index;
    }
  
    nextStep() {
      this.step++;
    }
  
    prevStep() {
      this.step--;
    }
    selected = 'option2';


    onFileSelect(event: any) {
      try {
         this.file = event.target.files[0];
        if (this.file) {
          this.filename = this.file.name;
          this.format = this.file.name.split('.');
          // this.format = this.format[1];
          if (this.format[1] != 'csv') {
            this._snackBar.open("Please select only CSV file", "Close", { duration: 3000 });
            this.deleteFile();
          } else {
            this.formfile = new FormData();
            this.formfile.append('file', this.file);
            console.log("🎯TC🎯 ~ file: file-upload.component.ts ~ line 41 ~ this.formfile", this.formfile);
          }
        }
      } catch (error) {
        this.deleteFile();
        console.log('no file was selected...');
      }
    }
    fileUpload(): void {
            // console.log(this.formfile)
            
              if (this.file) {
                this.showLoader = true;
                let url = "http://localhost:5000/file_upload"
                console.log("hiii")
                this.http.post<any>(url, this.formfile).subscribe((res) => {
                  this.showLoader = false;
                  this._snackBar.open("Predicted Successfully :) ", "Ok", { duration: 5000 });
                  // this.http.get("http://localhost:5000/file_upload").subscribe((res)=>{
                    // this.answer1=res
                    // console.log(this.answer1.data)
                    // this.fin="predicted value: "+this.answer1.data;
                  // })
                },
                  (error) => {
                    this.showLoader = false;
                    this._snackBar.open(error.message, "Close", { duration: 5000 });
                  });
              }else{
                this._snackBar.open("Please select the file", "Ok", { duration: 3000 });
            }
          }

    deleteFile(){
      this.file = null;
      this.format = null;
      this.filename = null;
      this.formfile.delete('file');
      // this.fileSelect
    }
  }