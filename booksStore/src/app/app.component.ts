import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { FixedHeaderComponent } from "./components/fixed-header/fixed-header.component";

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [CommonModule, RouterOutlet, FixedHeaderComponent]
})
export class AppComponent {
  title = 'booksStore';
}
