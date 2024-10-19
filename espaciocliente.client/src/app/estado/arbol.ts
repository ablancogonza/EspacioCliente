import { signal } from "@angular/core";
import { TreeNode } from "primeng/api";
import { ArbolService } from "../servicios/arbol.service";
import { TreeNodeExpandEvent, TreeNodeSelectEvent } from "primeng/tree";

export class Arbol {
  arbol = signal<TreeNode[]>([]);

  constructor(private arbolService: ArbolService) {
    this.arbol.set([{
      key: '0',
      label: 'Documents',
      data: 'Documents Folder',
      icon: 'pi pi-fw pi-inbox',
      children: [
        {
          key: '0-0',
          label: 'Work',
          data: 'Work Folder',
          icon: 'pi pi-fw pi-cog',
          children: [
            { key: '0-0-0', label: 'Expenses.doc', icon: 'pi pi-fw pi-file', data: 'Expenses Document' },
            { key: '0-0-1', label: 'Resume.doc', icon: 'pi pi-fw pi-file', data: 'Resume Document' }
          ]
        },
        {
          key: '0-1',
          label: 'Home',
          data: 'Home Folder',
          icon: 'pi pi-fw pi-home',
          children: [{ key: '0-1-0', label: 'Invoices.txt', icon: 'pi pi-fw pi-file', data: 'Invoices for this month' }]
        }
      ]
    }]);
  }

  nodoSeleccionado(): TreeNode | undefined {
    return undefined;
  }

  nodoExpandido(e: TreeNodeExpandEvent) {

  }

  nodeSelect(e: TreeNodeSelectEvent) {

  }

}
