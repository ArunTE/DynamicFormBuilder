import { Component, OnInit } from '@angular/core';
import { DndDropEvent,DropEffect} from 'ngx-drag-drop';
import { field, value } from '../global.model';
import { ActivatedRoute, Router } from '@angular/router';
import swal from 'sweetalert2';

import { Service } from './services/edit-app.service';

@Component({
  selector: 'app-edit-app',
  templateUrl: './edit-app.component.html',
  styleUrls: ['./edit-app.component.css']
})
export class EditAppComponent implements OnInit {

  value:value={
    label:"",
    value:""
  };
  success = false;

  fieldModels:Array<field>=[
    {
      "type": "text",
      "icon": "fa-font",
      "label": "Text",
      "description": "Enter your name",
      "placeholder": "Enter your name",
      "className": "form-control",
      "subtype": "text",
      "handle":true
    },
    {
      "type": "email",
      "icon": "fa-envelope",
      "required": true,
      "label": "Email",
      "description": "Enter your email",
      "placeholder": "Enter your email",
      "className": "form-control",
      "subtype": "text",
      "errorText": "Please enter a valid email",
      "handle":true
    },
    {
      "type": "phone",
      "icon": "fa-phone",
      "label": "Phone",
      "description": "Enter your phone",
      "placeholder": "Enter your phone",
      "className": "form-control",
      "subtype": "text",
      "errorText": "Please enter a valid phone number",
      "handle":true
    },
    {
      "type": "number",
      "label": "Number",
      "icon": "fa-html5",
      "description": "Age",
      "placeholder": "Enter your age",
      "className": "form-control",
      "value": "20",
      "min": 12,
      "max": 90
    },
    {
      "type": "date",
      "icon":"fa-calendar",
      "label": "Date",
      "placeholder": "Date",
      "className": "form-control"
    },
    {
      "type": "datetime-local",
      "icon":"fa-calendar",
      "label": "DateTime",
      "placeholder": "Date Time",
      "className": "form-control"
    },
    {
      "type": "textarea",
      "icon":"fa-text-width",
      "label": "Textarea" 
    },
    {
      "type": "paragraph",
      "icon": "fa-paragraph",
      "label": "Paragraph",
      "placeholder": "Type your text to display here only" 
    },
    {
      "type": "checkbox",
      "required": true,
      "label": "Checkbox",
      "icon":"fa-list",
      "description": "Checkbox",
      "inline": true,
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "radio",
      "icon":"fa-list-ul",
      "label": "Radio",
      "description": "Radio boxes",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        }
      ]
    },
    {
      "type": "autocomplete",
      "icon":"fa-bars",
      "label": "Select",
      "description": "Select",
      "placeholder": "Select",
      "className": "form-control",
      "values": [
        {
          "label": "Option 1",
          "value": "option-1"
        },
        {
          "label": "Option 2",
          "value": "option-2"
        },
        {
          "label": "Option 3",
          "value": "option-3"
        }
      ]
    },
    {
      "type": "file",
      "icon":"fa-file",
      "label": "File Upload",
      "className": "form-control",
      "subtype": "file"
    },
    {
      "type": "button",
      "icon":"fa-paper-plane",
      "subtype": "submit",
      "label": "Submit"
    }
  ];

  modelFields:Array<field>=[];
  model:any = {
    attributes:this.modelFields
  };

  constructor(
    private route:ActivatedRoute,
    private service: Service, 
    private router: Router
  ) { }

  ngOnInit() {

  }

  onDragStart(event:DragEvent) {
    // console.log("drag started", JSON.stringify(event, null, 2));
  }
  
  onDragEnd(event:DragEvent) {
    // console.log("drag ended", JSON.stringify(event, null, 2));
  }
  
  onDraggableCopied(event:DragEvent) {
    // console.log("draggable copied", JSON.stringify(event, null, 2));
  }
  
  onDraggableLinked(event:DragEvent) {
    // console.log("draggable linked", JSON.stringify(event, null, 2));
  }
    
   onDragged( item:any, list:any[], effect:DropEffect ) {
    if( effect === "move" ) {
      const index = list.indexOf( item );
      list.splice( index, 1 );
    }
  }
      
  onDragCanceled(event:DragEvent) {
    // console.log("drag cancelled", JSON.stringify(event, null, 2));
  }
  
  onDragover(event:DragEvent) {
    // console.log("dragover", JSON.stringify(event, null, 2));
  }
  
  onDrop( event:DndDropEvent, list?:any[] ) {
    if( list && (event.dropEffect === "copy" || event.dropEffect === "move") ) {
      
      if(event.dropEffect === "copy")
      event.data.name = event.data.type+'-'+new Date().getTime();
      let index = event.index;
      if( typeof index === "undefined" ) {
        index = list.length;
      }
      list.splice( index, 0, event.data );
    }
  }

  addValue(values){
    values.push(this.value);
    this.value={label:"",value:""};
  }

  removeField(i){
    swal({
      title: 'Are you sure?',
      text: "Do you want to remove this field?",
      type: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#00B96F',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Yes, remove!'
    }).then((result) => {
      if (result.value) {
        this.model.attributes.splice(i,1);
      }
    });

  }

  toggleValue(item){
    item.selected = !item.selected;
  }

  submit(){
    console.log('Save',this.model);
    this.service.create(this.model).subscribe(
      data => { 
        window.location.href = data['link']
      }, 
      error => { 
        console.log("error: ", error);
        alert(error) }
    );
  }

}
