import React, { useContext, useRef, useState} from 'react';
import Modal from 'react-bootstrap/Modal';
// import Button from 'react-bootstrap/Button';
import Select from "react-select";
import { classNames } from 'primereact/utils';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { Toast } from 'primereact/toast';
import { Button } from 'primereact/button';
import { Toolbar } from 'primereact/toolbar';
import { InputTextarea } from 'primereact/inputtextarea';
import { RadioButton } from 'primereact/radiobutton';
import { InputNumber } from 'primereact/inputnumber';
import { Dialog } from 'primereact/dialog';
import { InputText } from 'primereact/inputtext';
import { Tag } from 'primereact/tag';
import DataContext from '../../../context/ItemMasterContext';
import ItemMasterSelectData from '../element/ItemMasterSelectData';
 

const ItemCombo = ({ itemCombo, handleitemComboClose, values,   handlItemComboformShow }) => {
  const {itemmasterdata} = useContext(DataContext)
 
  let initialItemCombo = {
    id: '',
    PartCode: '',
    Name: '',
    Qty: '0',
    Mandatory: 'false',
    Display: '',
};
const [posts, setPosts] = useState(null);
const [itemComboDialog, setItemComboDialog] = useState(false);
const [deletetemComboDialog, setDeletetemComboDialog] = useState(false);
const [deletetemCombosDialog, setDeletetemCombosDialog] = useState(false);
const [post , setPost ] = useState(initialItemCombo);
const [selecteditemCombo, setSelecteditemCombo] = useState(null);
  const [submitted, setSubmitted] = useState(false);
  const [globalFilter, setGlobalFilter] = useState(null);
  const toast = useRef(null);
  const dt = useRef(null);
   
   const data = [ {
    id: 1,
    PartCode: 'st_001',
    Name: 'rod_001',
    Qty: 2,
    Mandatory: 'false',
    Display: '',
  }]
 
 

  const openNew = () => {
    setPost(initialItemCombo);
    setSubmitted(false);
    setItemComboDialog(true);
};
const hideDialog = () => {
  setSubmitted(false);
  setItemComboDialog(false);
};
const hideDeleteProductDialog = () => {
  setDeletetemComboDialog(false);
};
const hideDeleteProductsDialog = () => {
  setDeletetemCombosDialog(false);
};
const editProduct = (post) => {
  setPost({ ...post });
  setItemComboDialog(true);
};
const confirmDeleteProduct = (post) => {
  setPost(post);
  setDeletetemComboDialog(true);
};
const deleteProduct = () => {
  let _posts = posts.filter((val) => val.id !== post.id);

  setPosts(_posts);
  setDeletetemComboDialog(false);
  setPost(initialItemCombo);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Deleted', life: 3000 });
};

const findIndexById = (id) => {
  let index = -1;

  for (let i = 0; i < posts.length; i++) {
      if (posts[i].id === id) {
          index = i;
          break;
      }
  }

  return index;
};
const createId = () => {
  let id = '';
  let chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';

  for (let i = 0; i < 5; i++) {
      id += chars.charAt(Math.floor(Math.random() * chars.length));
  }

  return id;
};
const exportCSV = () => {
  dt.current.exportCSV();
};

const confirmDeleteSelected = () => {
  setDeletetemCombosDialog(true);
};

const deleteSelectedProducts = () => {
  let _posts = posts.filter((val) => !selecteditemCombo.includes(val));

  setPosts(_posts);
  setDeletetemCombosDialog(false);
  setSelecteditemCombo(null);
  toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Products Deleted', life: 3000 });
};

const leftToolbarTemplate = () => {
  return (
      <div className="flex flex-wrap gap-2">
          <Button label="New" icon="pi pi-plus" severity="success" onClick={openNew} />
          <Button label="Delete" icon="pi pi-trash" severity="danger" onClick={confirmDeleteSelected} disabled={!selecteditemCombo || !selecteditemCombo.length} />
      </div>
  );
};

const rightToolbarTemplate = () => {
  return <Button label="Export" icon="pi pi-upload" className="p-button-help" onClick={exportCSV} />;
};

const actionBodyTemplate = (rowData) => {
  return (
      <React.Fragment>
          <Button icon="pi pi-pencil" rounded outlined className="mr-2" onClick={() => editProduct(rowData)} />
          <Button icon="pi pi-trash" rounded outlined severity="danger" onClick={() => confirmDeleteProduct(rowData)} />
      </React.Fragment>
  );
};

const header = (
  <div className="flex flex-wrap gap-2 align-items-center justify-content-between">
      <h4 className="m-0">Manage Products</h4>
      <span className="p-input-icon-left">
          <i className="pi pi-search" />
          <InputText type="search" onInput={(e) => setGlobalFilter(e.target.value)} placeholder="Search..." />
      </span>
  </div>
);
const saveProduct = () => {
  
  setSubmitted(true);
  console.log(post);
  console.log();
  if (post.PartCode) {
      // let _posts = [...posts];
      let _post = { ...post };
      

      // if (post.id) {
      //     const index = findIndexById(post.id);

      //     _posts[index] = _post;
      //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Updated', life: 3000 });
      // } else {
      //     _product.id = createId();
      //     _product.image = 'product-placeholder.svg';
      //     _products.push(_product);
      //     toast.current.show({ severity: 'success', summary: 'Successful', detail: 'Product Created', life: 3000 });
      // }

      // setProducts(_products);
      // setProductDialog(false);
      // setProduct(initialItemCombo);
  }
};

 

// const onInputChange = (e, name) => {
//   const val = (e.target && e.target.value) || '';
//   let _post = { ...post };

//   _post[`${name}`] = val;

//   setPost(_post);
// };
const onInputChange = (value, fieldName) => {
  setPost(prevState => ({
    ...prevState,
    [fieldName]: value
  }));
};
 
const productDialogFooter = (
  <React.Fragment>
      <Button label="Cancel" icon="pi pi-times" outlined onClick={hideDialog} />
      <Button label="Save" icon="pi pi-check" onClick={saveProduct} />
  </React.Fragment>
);
const deleteProductDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteProduct} />
  </React.Fragment>
);
const deleteProductsDialogFooter = (
  <React.Fragment>
      <Button label="No" icon="pi pi-times" outlined onClick={hideDeleteProductsDialog} />
      <Button label="Yes" icon="pi pi-check" severity="danger" onClick={deleteSelectedProducts} />
  </React.Fragment>
);

const [selectedOption, setSelectedOption] = useState(null); // State in the parent component

const handleOptionChange = selectedOption => {
  setSelectedOption(selectedOption);
  // You can perform any additional logic here if needed
};
  
  return (
    <>
      <Modal show={itemCombo} size="xl" onHide={() => {handleitemComboClose()
      values.Item_Combo =  false}}>
        <Modal.Header closeButton>
          <Modal.Title>Item Combo</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        
        <Toast ref={toast} />
            <div className="card">
                <Toolbar className="mb-4" left={leftToolbarTemplate}  ></Toolbar>

                <DataTable ref={dt} value={posts} selection={selecteditemCombo} onSelectionChange={(e) => setSelecteditemCombo(e.value)}
                        dataKey="id"   
                        paginatorTemplate="FirstPageLink PrevPageLink PageLinks NextPageLink LastPageLink CurrentPageReport RowsPerPageDropdown"
                        currentPageReportTemplate="Showing {first} to {last} of {totalRecords} posts"  >
                    <Column selectionMode="multiple" exportable={false}></Column>
                    <Column field="id" header="id" sortable hidden ></Column>
                    <Column field="PartCode" header="PartCode" sortable style={{ minWidth: '16rem' }}></Column>
                    <Column field="Name" header="Name" style={{ minWidth: '16rem' }} ></Column>
                    <Column field="Qty" header="Qty"   sortable style={{ minWidth: '8rem' }}></Column>
                    <Column field="Mandatory" header="Mandatory" sortable style={{ minWidth: '10rem' }}></Column>
                    <Column field="Display" header="Display"   sortable style={{ minWidth: '12rem' }}></Column>
                    
                    <Column body={actionBodyTemplate} exportable={false} style={{ minWidth: '12rem' }}></Column>
                    
                </DataTable>
            </div>
 


            <Modal show={itemComboDialog} onHide={hideDialog}>
        <Modal.Header closeButton>
          <Modal.Title>Modal heading</Modal.Title>
        </Modal.Header>
        <Modal.Body> 
        <div className="row">
             <div className="col-6">
                <label htmlFor="PartCode" className="font-bold">PartCode</label>
                <Select name="PartCode" id='PartCode' //  ref={itemGroupRef}  isSearchable
                options={itemmasterdata.map(item => ({ value: item.id, label: item.Item_PartCode }))}
                onChange={(option) => onInputChange(option ? option.value : null , 'PartCode')}
                 />
                 {submitted && !post.PartCode && <small className="p-error">PartCode is required.</small>}
              </div>
              <div className="col-6">
                <label htmlFor="Name" className="font-bold">Name</label>
                <Select name="Name" id='Name' //  ref={itemGroupRef}  isSearchable
                options={itemmasterdata.map(item => ({ value: item.id, label: item.Item_name }))}
                onChange={(option) => onInputChange(option ? option.value : null , 'Name')}
                 />
                 {submitted && !post.PartCode && <small className="p-error">Name is required.</small>}
              </div>
              <div className="col-6">
                  <label htmlFor="Qty" className="form-label">Qty</label>
                   
                    <input type="number" id="Qty" className='form-control' value={post.Qty} onChange={(e) => onInputChange(e.value, 'Qty')}    />
                    
              </div>
              <div className="col-6">
                <label htmlFor="Display" className="form-label">Display</label>
                <Select name="Display" id='Display' //  ref={itemGroupRef}  isSearchable
                // options={}
                onChange={(option) => onInputChange(option ? option.value : null , 'Display')}
                 />
                  
              </div>
              <div class="form-check  ms-2 mt-2">
                  {/* <input class="form-check-input" type="checkbox" value="" id="flexCheckDefault"> */}
                  <input type="checkbox" value={post.Mandatory}  class="form-check-input" id="Mandatory" onChange={(e) => onInputChange(e.value, 'Mandatory')} />
                  <label class="form-check-label" for="Mandatory">
                  Mandatory
                  </label>
              </div>
              
         </div>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={hideDialog}>
            Close
          </Button>
          <Button variant="primary" onClick={saveProduct}>
            Save Changes
          </Button>
          
        </Modal.Footer>
      </Modal>
         

        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => {handleitemComboClose()
      values.Item_Combo =  false}}>
            Close
          </Button>
          <Button variant="primary" onClick={handleitemComboClose}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
     
     
    </>
    
  );
};

export default ItemCombo;
