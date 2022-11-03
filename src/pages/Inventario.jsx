import React from 'react';
import { GridComponent, ColumnsDirective, ColumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject } from '@syncfusion/ej2-react-grids';

import { ordersData, contextMenuItems, ordersGrid } from '../data/dummy';
import { Header } from '../components';

const Inventario = () => {
  const editing = { allowDeleting: true, allowEditing: true };
  return (
    <div className="md:m-10 mt-24 p-2 md:p-4 bg-white rounded-3xl">
      <Header category="Page" title="Orders" />
      hola
    </div>
  );
};
export default Inventario;
