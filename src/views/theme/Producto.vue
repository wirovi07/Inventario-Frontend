<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>

  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Empresa</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre Prov.</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre Producto</CTableHeaderCell>
        <CTableHeaderCell scope="col">Descripción</CTableHeaderCell>
        <CTableHeaderCell scope="col">Precio</CTableHeaderCell>
        <CTableHeaderCell scope="col">Cantidad</CTableHeaderCell>
        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell>{{ row.id }}</CTableDataCell> <!-- Mostrar consecutivo -->
        <CTableDataCell>{{ row.name_company }}</CTableDataCell>
        <CTableDataCell>{{ row.name_supplier }}</CTableDataCell>
        <CTableDataCell>{{ row.name }}</CTableDataCell>
        <CTableDataCell>{{ row.description }}</CTableDataCell>
        <CTableDataCell>{{ row.price }}</CTableDataCell>
        <CTableDataCell>{{ row.inventory_quantity }}</CTableDataCell>
        <CTableDataCell>
          <CButton color="primary" size="sm" class="m-1" style="color: white;" @click="viewProduct(row.realId)">Editar
          </CButton>
          <CButton color="danger" size="sm" @click="deleteProduct(row.realId)">Eliminar</CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- CREAR PRODUCTO -->
  <CModal alignment="center" size="lg" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Producto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="formData.company_id" class="form-select" tabindex="1">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}
                  </option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- NOMBRE -->
              <div id="inventario-name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre Producto</label>
                <input v-model="formData.name" type="text" class="form-control" tabindex="3" />
                <template v-if="errors.name.length > 0">
                  <b :key="e" v-for="e in errors.name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- PRECIO -->
              <div id="inventario-price" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Precio</label>
                <input v-model="formData.price" type="number" class="form-control" tabindex="5" />
                <template v-if="errors.price.length > 0">
                  <b :key="e" v-for="e in errors.price" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- PROVEEDOR -->
              <div id="inventario-supplier_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Proveedor</label>
                <select v-model="formData.supplier_id" class="form-select" tabindex="2">
                  <option style="margin: 1px" value="" disabled selected>Proveedor</option>
                  <option :value="supplier.id" :key="supplier.id" v-for="supplier in supplierList">{{ supplier.name }}
                  </option>
                </select>
                <template v-if="errors.supplier_id.length > 0">
                  <b :key="e" v-for="e in errors.supplier_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DESCRIPCION -->
              <div id="inventario-description" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Descripción</label>
                <input v-model="formData.description" type="text" class="form-control" tabindex="4" />
                <template v-if="errors.description.length > 0">
                  <b :key="e" v-for="e in errors.description" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CANTIDAD -->
              <div id="inventario-inventory_quantity" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Cantidad</label>
                <input v-model="formData.inventory_quantity" type="email" class="form-control" tabindex="6" />
                <template v-if="errors.inventory_quantity.length > 0">
                  <b :key="e" v-for="e in errors.inventory_quantity" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModalAndResetFormData">
        Descartar
      </CButton>
      <CButton color="primary" @click="createProduct" tabindex="12">Crear</CButton>
    </CModalFooter>
  </CModal>

  <!-- EDITAR PRODUCTO -->
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemoEdit"
    @close="closeModalAndResetFormDataEdit" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Editar Producto</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="selectedProduct.company_id" class="form-select" tabindex="1">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}
                  </option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- NOMBRE -->
              <div id="inventario-name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre Producto</label>
                <input v-model="selectedProduct.name" type="text" class="form-control" tabindex="3" />
                <template v-if="errors.name.length > 0">
                  <b :key="e" v-for="e in errors.name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- PRECIO -->
              <div id="inventario-price" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Precio</label>
                <input v-model="selectedProduct.price" type="number" class="form-control" tabindex="5" />
                <template v-if="errors.price.length > 0">
                  <b :key="e" v-for="e in errors.price" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- PROVEEDOR -->
              <div id="inventario-supplier_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Proveedor</label>
                <select v-model="selectedProduct.supplier_id" class="form-select" tabindex="2">
                  <option style="margin: 1px" value="" disabled selected>Proveedor</option>
                  <option :value="supplier.id" :key="supplier.id" v-for="supplier in supplierList">{{ supplier.name }}
                  </option>
                </select>
                <template v-if="errors.supplier_id.length > 0">
                  <b :key="e" v-for="e in errors.supplier_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DESCRIPCION -->
              <div id="inventario-description" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Descripción</label>
                <input v-model="selectedProduct.description" type="text" class="form-control" tabindex="4" />
                <template v-if="errors.description.length > 0">
                  <b :key="e" v-for="e in errors.description" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CANTIDAD -->
              <div id="inventario-inventory_quantity" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Cantidad</label>
                <input v-model="selectedProduct.inventory_quantity" type="email" class="form-control" tabindex="6" />
                <template v-if="errors.inventory_quantity.length > 0">
                  <b :key="e" v-for="e in errors.inventory_quantity" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModalAndResetFormDataEdit">Descartar</CButton>
      <CButton color="primary" @click="editProduct">Editar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default {
  name: 'Producto',
  setup() {

    const formData = ref({
      name: '',
      description: '',
      price: '',
      inventory_quantity: '',
      company_id: '',
      supplier_id: ''
    });

    const errors = ref({
      name: [],
      description: [],
      price: [],
      inventory_quantity: [],
      company_id: [],
      supplier_id: []
    });

    const errorsClear = () => {
      errors.value = {
        name: [],
        description: [],
        price: [],
        inventory_quantity: [],
        company_id: [],
        supplier_id: []
      };
    };

    const resetFormData = () => {
      formData.value = {
        name: '',
        description: '',
        price: '',
        inventory_quantity: '',
        company_id: '',
        supplier_id: ''
      };
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const visibleVerticallyCenteredScrollableDemoEdit = ref(false);

    const tableData = ref([]);

    const TableDataApi = async () => {
      try {
        const { data } = await useApi('product');

        const formatterPrice = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const formatterQuantity = new Intl.NumberFormat('es-CO', {
          style: 'decimal',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const mappedData = data.map((item, index) => ({
          id: index + 1,
          realId: item.id,
          name_company: item.name_company,
          name_supplier: item.name_supplier,
          name: item.name,
          description: item.description,
          price: formatterPrice.format(item.price),
          inventory_quantity: formatterQuantity.format(item.inventory_quantity),
        }));

        tableData.value = mappedData;
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    onMounted(TableDataApi);

    const createProduct = async () => {
      errorsClear();

      let has_error = false;
      Object.entries(formData.value).forEach((f) => {
        const elemento = f[0];
        const value = f[1];
        if (value == '') {
          has_error = true;
          errors.value[elemento] = 'Este campo es obligatorio';
        }
      });

      if (has_error) return;

      try {
        await useApi('product', 'POST', formData.value);
        Swal.fire({
          title: 'Éxito!',
          text: 'Proveedor creado correctamente!',
          icon: 'success',
          confirmButtonText: '¡Entendido!',
        });
        resetFormData();
        TableDataApi();
      } catch (error) {
        const errors_api = error.errors;
        Object.entries(errors_api).forEach((e) => {
          const elemento = e[0];
          const mensaje = e[1];
          errors.value[elemento] = mensaje;
        });
      }
    };

    const selectedProduct = ref(null);

    const viewProduct = async (customerId) => {
      try {
        const { data } = await useApi('product/' + customerId);
        selectedProduct.value = data;
        console.log(data);
        visibleVerticallyCenteredScrollableDemoEdit.value = true;

      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const editProduct = async () => {
      try {
        const datosActualizados = {
          company_name: selectedProduct.value.company_name,
          contact_name: selectedProduct.value.contact_name,
          address: selectedProduct.value.address,
          email: selectedProduct.value.email,
          phone: selectedProduct.value.phone,
          company_id: selectedProduct.value.company_id,
        };

        await useApi('product/' + selectedProduct.value.id, 'PUT', datosActualizados);

        Swal.fire({
          title: 'Éxito!',
          text: 'Proveedor editada correctamente!',
          icon: 'success',
          confirmButtonText: '¡Entendido!',
        });
        resetFormData();
        TableDataApi();
      } catch (error) {
        console.error('Error al actualizar el proveedor:', error);
      }
    };

    const deleteProduct = async (customerId) => {
      const result = await Swal.fire({
        title: 'Estas seguro?',
        text: '¡No podrás revertir esto!',
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borralo!',
      });

      if (result.isConfirmed) {
        try {
          await useApi('product/' + customerId, 'DELETE');

          tableData.value = tableData.value.filter((row) => row.customerId != customerId);

          Swal.fire('Eliminar!', 'El proveedor ha sido eliminado!.', 'success');

          TableDataApi();
        } catch (error) {
          Swal.fire('Error!', 'Debes eliminar la empresa y depues el proveedor.', 'error');
        }
      }
    };

    const companiesList = ref([]);

    const showCompanies = async () => {
      try {
        const { data } = await useApi('companyAll');
        companiesList.value = data;
      } catch (error) {
        console.error('Error al obtener las empresas', error);
      }
    };
    onMounted(showCompanies);

    const supplierList = ref([]);

    const showSuppliers = async () => {
      try {
        const { data } = await useApi('supplierAll');
        supplierList.value = data;
      } catch (error) {
        console.error('Error al obtener los proveedores', error);
      }
    };
    onMounted(showSuppliers);

    const closeModalAndResetFormData = () => {
      visibleVerticallyCenteredScrollableDemo.value = false;
      resetFormData();
    };

    const closeModalAndResetFormDataEdit = () => {
      visibleVerticallyCenteredScrollableDemoEdit.value = false;
    };

    return {
      tableData,
      formData,
      errors,
      errorsClear,
      visible,
      visibleVerticallyCenteredScrollableDemo,
      visibleVerticallyCenteredScrollableDemoEdit,
      closeModalAndResetFormData,
      closeModalAndResetFormDataEdit,
      viewProduct,
      selectedProduct,
      createProduct,
      editProduct,
      deleteProduct,
      showCompanies,
      companiesList,
      showSuppliers,
      supplierList,
    };
  }
}
</script>
