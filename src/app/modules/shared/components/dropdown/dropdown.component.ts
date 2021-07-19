import { Output, Component, EventEmitter, Input } from '@angular/core';


@Component({
  selector: 'app-dropdown',
  templateUrl: './dropdown.component.html',
  styleUrls: ['./dropdown.component.scss']
})
export class DropdownComponent {

  @Input() info: any;
  @Output() updateInfo: EventEmitter<any> = new EventEmitter();

  dataChange: any = {
    id: '',
    name: '',
    description: '',
    tenant_id: '',
    status: '',
    key: '',
    _status: false,
    btnColor: '',
    btnIcon: '',
    btnIconTwo: '',
    btnName: '',
    iconColor: ''
  };

  changePropertiesItem(item: any){
    if (item.btnName === 'Active'){
      this.dataChange.btnName = 'Inactive';
      this.dataChange.btnIcon = item.btnIcon;
      this.dataChange.iconColor = 'text-danger';
    }else{
      this.dataChange.btnName = 'Active';
      this.dataChange.btnIcon = item.btnIcon;
      this.dataChange.iconColor = 'text-success';
    }

  }

  changeOperation(item: any){
    this.updateInfo.emit(item);

  }
}
