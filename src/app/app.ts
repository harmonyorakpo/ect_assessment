import { CommonModule } from '@angular/common';
import { Component, ContentChild, Input, TemplateRef } from '@angular/core';


@Component({
  selector: 'app-root',
  imports: [ CommonModule],
  templateUrl: './app.html',
  styleUrl: './app.scss',
})
export class App {
  protected title = 'ect_assessment';

  @Input() option: any[] = [];
  @ContentChild(TemplateRef) templateRef!: TemplateRef<any>;
}
