import { AfterViewInit, Component, ElementRef, OnInit, QueryList, ViewChildren } from '@angular/core';
import { concat } from 'rxjs';

@Component({
  selector: 'app-valid-card',
  templateUrl: './valid-card.component.html',
  
  styleUrls: ['./valid-card.component.css']
})
export class ValidCardComponent  implements OnInit {

 ngOnInit(): void {
  const inputElement = document.querySelector(`input.code:nth-child(${1})`) as HTMLInputElement;
  inputElement.focus();
 }
  email: string = 'cool_guy@email.com';
  codes: string[] = ['', '', '', '', '', ''];
  code!:string;
  isValidKey(event: KeyboardEvent): boolean {
    const key = event.key;
    return (key >= '0' && key <= '9') || key === 'Backspace';
  }
  onKeyDown(event: KeyboardEvent, index: number) {
    console.log(event)
    if (!this.isValidKey(event)) {
          event.preventDefault();
          return;
        }
 
    if (event.key >= '0' && event.key <= '9') {
      this.codes[index] = '';
      setTimeout(() => {
        const nextIndex = index + 1;
        if (nextIndex < this.codes.length) {
          const inputElement = document.querySelector(`input.code:nth-child(${nextIndex + 1})`) as HTMLInputElement;
          inputElement.focus();
        }
      }, 10);
    } else if (event.key === 'Backspace' && index > 0) {
      setTimeout(() => {
        const previousIndex = index - 1;
        const inputElement = document.querySelector(`input.code:nth-child(${previousIndex + 1})`) as HTMLInputElement;
        inputElement.focus();
      }, 10);

    }}
    send(x1:string,x2:string,x3:string,x4:string,x5:string,x6:string){
      this.code=(x1+x2+x3+x4+x5+x6)
      console.log(this.code)
    }
  //   email: string = 'cool_guy@email.com';
  //   codes: HTMLInputElement[] = [];
  
  //   onKeyDown(event: KeyboardEvent, input: HTMLInputElement) {
  //     console.log(this.codes.indexOf(input))
  //     console.log(event)
  //     if (!this.isValidKey(event)) {
  //       event.preventDefault();
  //       return;
  //     }
  
  //     const currentIndex = 0
  //     if (  event.key >= '0' && event.key <= '9') {
  //       console.log("aaaaaaaaaaaa1")


  //       setTimeout(() => this.codes[currentIndex + 1].focus(), 10);
  //     } else if ( event.key === 'Backspace') {
  //       console.log("aaaaaaaaaaaa2")

  //       setTimeout(() => this.codes[currentIndex - 1].focus(), 10);
  //     }
  //   }
  
  //   isValidKey(event: KeyboardEvent): boolean {
  //     const key = event.key;
  //     return (key >= '0' && key <= '9') || key === 'Backspace';
  //   }
  // }
  

}



//   @ViewChildren('codeElement') codeElements!: QueryList<ElementRef<HTMLInputElement>>;

//   codes: string[] = ['code1', 'code2', 'code3']; // Replace with your desired codes

//   ngAfterViewInit() {
//     this.codeElements.first.nativeElement.focus();
//   }

//   onKeyDown(event: KeyboardEvent, currentCode: ElementRef<HTMLInputElement>) {
//     const currentIndex = this.codeElements.toArray().indexOf(currentCode);

//     if (event.key >= '0' && event.key <= '9') {
//       currentCode.nativeElement.value = '';
//       setTimeout(() => this.focusNextCode(currentIndex + 1), 10);
//     } else if (event.key === 'Backspace') {
//       setTimeout(() => this.focusPreviousCode(currentIndex - 1), 10);
//     }
//   }

//   focusNextCode(index: number) {
//     if (index < this.codeElements.length) {
//       this.codeElements.toArray()[index].nativeElement.focus();
//     }
//   }

//   focusPreviousCode(index: number) {
//     if (index >= 0) {
//       this.codeElements.toArray()[index].nativeElement.focus();
//     }
//   }
// }
