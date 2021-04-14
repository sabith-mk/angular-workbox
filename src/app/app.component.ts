import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ServiceWorkerService } from './service-worker.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  constructor(private toastr: ToastrService, private sw: ServiceWorkerService) {
    sw.registerServiceWorker()
  }
  title = 'angular-workbox';
}
