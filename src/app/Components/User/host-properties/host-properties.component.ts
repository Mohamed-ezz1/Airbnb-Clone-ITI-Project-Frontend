import { Component, OnInit } from '@angular/core';
import { HostService } from 'src/app/Services/Host/host.service';

@Component({
  selector: 'app-host-properties',
  templateUrl: './host-properties.component.html',
  styleUrls: ['./host-properties.component.css']
})
export class HostPropertiesComponent implements OnInit {

  private hostProperties: any;

  constructor(private hostService: HostService) {

  }

  ngOnInit(): void {
    this.hostService.GetPropertyByUserId().subscribe({
      next: (data) => { this.hostProperties = data; },
      error: (error) => { console.log(error) },
      complete: () => { console.log("complete") }
    })
  }
}
