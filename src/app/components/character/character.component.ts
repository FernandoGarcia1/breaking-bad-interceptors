import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup } from '@angular/forms';
import { debounceTime, Observable, tap } from 'rxjs';
import { ApiService } from 'src/app/service/api.service';

@Component({
  selector: 'app-character',
  templateUrl: './character.component.html',
  styleUrls: ['./character.component.scss']
})
export class CharacterComponent implements OnInit {

  public character$ : Observable<any>;
  public characterName : string ='';
  public searchCharacter: FormControl = new FormControl('');



  constructor(public apiService: ApiService) {
    this.onSearchCharacter();
    this.character$ = apiService.searchCharacter('Walter White').pipe(
      tap(console.log)
    )
  }

  ngOnInit(): void {
    
  }  
      
  onSearchCharacter(){
    this.searchCharacter.valueChanges
        .pipe(          
          debounceTime(500) // tiempo de espera
        )
        .subscribe(res => {                    
          console.log(res);
          this.character$ = this.apiService.searchCharacter(res).pipe(

            )
       });
  }
}

  



