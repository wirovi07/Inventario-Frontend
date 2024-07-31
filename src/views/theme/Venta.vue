<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>

  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Empresa</CTableHeaderCell>
        <CTableHeaderCell scope="col">Empleado</CTableHeaderCell>
        <CTableHeaderCell scope="col">Cliente</CTableHeaderCell>
        <CTableHeaderCell scope="col">Fecha Venta</CTableHeaderCell>
        <CTableHeaderCell scope="col">Total</CTableHeaderCell>
        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell>{{ row.id }}</CTableDataCell>
        <CTableDataCell>{{ row.company }}</CTableDataCell>
        <CTableDataCell>{{ row.employ }}</CTableDataCell>
        <CTableDataCell>{{ row.customer }}</CTableDataCell>
        <CTableDataCell>{{ row.date }}</CTableDataCell>
        <CTableDataCell>{{ row.total }}</CTableDataCell>
        <CTableDataCell>
          <CButton color="primary" class="mb-4" @click="handleEdit(row.realId)">
            Editar
          </CButton>
          <CButton color="danger" size="sm" @click="deleteSale(row.realId)">Eliminar</CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- CREAR PRODUCTO -->
  <CModal alignment="center" size="lg" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Detalle de la Venta</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- CLIENTE -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Cliente</label>
                <select class="form-control" v-model="formData.customer_id">
                  <option value="" selected disabled>Seleccione un cliente</option>
                  <option v-for="customer in customerList" :value="customer.id" :key="customer.id">{{ customer.name }}
                  </option>
                </select>
                <template v-if="errors.customer_id.length > 0">
                  <b :key="e" v-for="e in errors.customer_id" class="text-danger">{{ e }}</b>
                </template>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- PRODUCTO -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Producto</label>
                <select class="form-control" v-model="formData.product_id" @change="addProductDetailRow">
                  <option value="" selected disabled>Seleccione un producto</option>
                  <option v-for="product in productList" :value="product.id" :key="product.id">{{ product.name }}
                  </option>
                </select>
                <template v-if="errors.product_id.length > 0">
                  <b :key="e" v-for="e in errors.product_id" class="text-danger">{{ e }}</b>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- MODAL DETALLE DE VENTAS -->
      <div class="container mt-5">
        <h5>Detalle de Venta</h5>
        <table class="table table-hover mt-4">
          <thead class="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col">Producto</th>
              <th scope="col" class="text-center">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody class="text-secondary">
            <tr v-for="(row, index) in productRows" :key="index" style="margin-top: 10px;">
              <td class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" @click="removeProductRow(index)" class="icon icon-xxl w-75"
                  viewBox="0 0 512 512" role="img">
                  <polygon fill="var(--ci-primary-color, currentColor)"
                    points="348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302"
                    class="ci-primary"></polygon>
                  <path fill="var(--ci-primary-color, currentColor)"
                    d="M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z"
                    class="ci-primary"></path>
                </svg>
              </td>
              <td class="p-2">
                <select v-model="row.product_id" @change="selectPriceUniProduct(index)"
                  class="form-select w-100 form-control mb-1 p-2 fs-6 fw-bold" :disabled="row.product_id !== ''">
                  <option style="margin: 1px" disabled selected value="">Productos</option>
                  <option v-for="product in productList" :value="product.id" :key="product.id"
                    :disabled="isProductSelected(product)">
                    {{ product.name }}
                  </option>
                </select>
                <input v-model="row.product_unit_price" type="text" class="form-control mb-1 p-2 fs-6 fw-bold"
                  placeholder="Precio unitario" readonly />
              </td>
              <td class="text-center p-2">
                <div class="d-flex justify-content-center">
                  <input v-model="row.amount" type="number" class="form-control mb-1 p-1 fs-6 fw-bold w-50"
                    placeholder="0" />
                </div>
              </td>
              <td class="p-2">
                <input v-model="row.subtotal" type="number" class="form-control mb-1 p-1 fs-6 fw-bold"
                  placeholder="Subtotal" readonly />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="">
          <div class="d-flex justify-content-end">
            <h1 class="fs-4 me-3">Total</h1>
            <input v-model="formData.total" type="number" style="width: 250px;"
              class="form-control mb-1 p-1 fs-6 fw-bold" placeholder="0" readonly />
          </div>
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
  <CModal alignment="center" size="lg" scrollable :visible="visibleEdit" @close="closeModalAndResetFormData"
    aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Editar Detalle de la Venta</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- CLIENTE -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Cliente</label>
                <select class="form-control" v-model="formData.customer_id">
                  <option value="" selected disabled>Seleccione un cliente</option>
                  <option v-for="customer in customerList" :value="customer.id" :key="customer.id">
                    {{ customer.name }}
                  </option>
                </select>
                <template v-if="errors.customer_id.length > 0">
                  <b :key="e" v-for="e in errors.customer_id" class="text-danger">{{ e }}</b>
                </template>
              </div>
            </div>
          </form>
        </div>
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- PRODUCTO -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Producto</label>
                <select class="form-control" v-model="formData.product_id" @change="addProductDetailRow">
                  <option value="" selected disabled>Seleccione un producto</option>
                  <option v-for="product in productList" :value="product.id" :key="product.id">{{ product.name }}
                  </option>
                </select>
                <template v-if="errors.product_id.length > 0">
                  <b :key="e" v-for="e in errors.product_id" class="text-danger">{{ e }}</b>
                </template>
              </div>
            </div>
          </form>
        </div>
      </div>
      <!-- MODAL DETALLE DE VENTAS -->
      <div class="container mt-5">
        <h5>Detalle de Venta</h5>
        <table class="table table-hover mt-4">
          <thead class="thead-light">
            <tr>
              <th scope="col"></th>
              <th scope="col">Producto</th>
              <th scope="col" class="text-center">Cantidad</th>
              <th scope="col">Subtotal</th>
            </tr>
          </thead>
          <tbody class="text-secondary">
            <tr v-for="(row, index) in productEdit" :key="index" style="margin-top: 10px;">
              <td class="p-2">
                <svg xmlns="http://www.w3.org/2000/svg" @click="removeProductRow(index)" class="icon icon-xxl w-75"
                  viewBox="0 0 512 512" role="img">
                  <polygon fill="var(--ci-primary-color, currentColor)"
                    points="348.071 141.302 260.308 229.065 172.545 141.302 149.917 163.929 237.681 251.692 149.917 339.456 172.545 362.083 260.308 274.32 348.071 362.083 370.699 339.456 282.935 251.692 370.699 163.929 348.071 141.302"
                    class="ci-primary"></polygon>
                  <path fill="var(--ci-primary-color, currentColor)"
                    d="M425.706,86.294A240,240,0,0,0,86.294,425.706,240,240,0,0,0,425.706,86.294ZM256,464C141.309,464,48,370.691,48,256S141.309,48,256,48s208,93.309,208,208S370.691,464,256,464Z"
                    class="ci-primary"></path>
                </svg>
              </td>
              <td class="p-2">
                <select v-model="row.product_id" @change="selectPriceUniProduct(index)"
                  class="form-select w-100 form-control mb-1 p-2 fs-6 fw-bold" :disabled="row.product_id !== ''">
                  <option style="margin: 1px" disabled selected value="">Productos</option>
                  <option v-for="product in productList" :value="product.id" :key="product.id"
                    :disabled="isProductSelected(product)">
                    {{ product.name }}
                  </option>
                </select>
                <input v-model="row.unit_price" type="text" class="form-control mb-1 p-2 fs-6 fw-bold"
                  placeholder="Precio unitario" readonly />
              </td>
              <td class="text-center p-2">
                <div class="d-flex justify-content-center">
                  <input v-model="row.amount" type="number" class="form-control mb-1 p-1 fs-6 fw-bold w-50"
                    placeholder="0" />
                </div>
              </td>
              <td class="p-2">
                <input v-model="row.subtotal" type="number" class="form-control mb-1 p-1 fs-6 fw-bold"
                  placeholder="Subtotal" readonly />
              </td>
            </tr>
          </tbody>
        </table>
        <div class="">
          <div class="d-flex justify-content-end">
            <h1 class="fs-4 me-3">Total</h1>
            <input v-model="formData.total" type="number" style="width: 250px;"
              class="form-control mb-1 p-1 fs-6 fw-bold" placeholder="0" readonly />
          </div>
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
</template>

<script>
import { ref, onMounted, watch, computed } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

export default {
  name: 'Venta',

  setup() {
    const formData = ref({
      date: '',
      total: '',
      company_id: '',
      employee_id: '',
      customer_id: '',
      customer: '',
      product_id: '',
      sale_id: ''
    });

    const paramsProducts = ref({
      date: [],
      total: [],
      company_id: [],
      employee_id: [],
      customer_id: [],
      customer: [],
      product_id: [],
      products: [],
      sale_id: []
    });

    const errors = ref({
      date: [],
      total: [],
      company_id: [],
      employee_id: [],
      customer_id: [],
      customer: [],
      product_id: [],
      products: [],
      sale_id: []
    });

    const errorsClear = () => {
      errors.value = {
        date: [],
        total: [],
        company_id: [],
        employee_id: [],
        customer_id: [],
        customer: [],
        product_id: [],
        sale_id: []
      };
    };

    const resetFormData = () => {
      formData.value = {
        date: '',
        total: '',
        company_id: '',
        employee_id: '',
        customer_id: '',
        customer: '',
        product_id: '',
        sale_id: ''
      };
      productRows.value = [];
      total.value = 0;
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const visibleVerticallyCenteredScrollableDemoEdit = ref(false);

    const visibleEdit = ref(false);
    const visibleCenterEdit = ref(false);

    const tableData = ref([]);

    //MOSTRAR DATOS EN LA TABLA 
    const TableDataApi = async () => {
      try {
        const { data } = await useApi('sale');

        const formatterTotal = new Intl.NumberFormat('es-CO', {
          style: 'currency',
          currency: 'COP',
          minimumFractionDigits: 0,
          maximumFractionDigits: 0,
        });

        const mappedData = data.map((item, index) => ({
          id: index + 1,
          realId: item.id,
          company: item.company,
          employ: item.employ,
          customer: item.customer,
          date: item.date,
          total: formatterTotal.format(item.total),
        }));

        console.log("ID de SALE", mappedData)

        tableData.value = mappedData;
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    onMounted(TableDataApi);

    // //CREAR VENTA Y DETALLE DE VENTA
    const createProduct = async () => {
      try {
        const calculatedTotal = productRows.value.reduce((acc, row) => acc + (row.subtotal || 0), 0);

        const data = {
          total: calculatedTotal,
          customer_id: formData.value.customer_id,
          products: productRows.value.map(row => ({
            product_id: row.product_id,
            amount: row.amount,
            unit_price: row.product_unit_price,
            subtotal: row.subtotal,
          })),
        };

        const saleResponse = await useApi('sales', 'POST', data);

        Swal.fire({
          title: '¡Éxito!',
          text: 'Detalle de venta creada correctamente.',
          icon: 'success',
          confirmButtonText: '¡Entendido!',
        }).then((result) => {
          if (result.isConfirmed) {
            document.querySelector('[data-bs-dismiss="modal"]').click();
            resetFormData();
            window.location.reload();
          }
        });
      } catch (error) {
        console.error('Error en createProduct:', error);
        Swal.fire('¡Error!', 'Ocurrió un error al crear el detalle de venta.', 'error');
      }
    };

    //VISUALIZAR DATOS
    const selectedProduct = ref(null);
    const viewSale = async (customerId) => {
      try {
        const { data } = await useApi('product/' + customerId);
        selectedProduct.value = data;
        visibleVerticallyCenteredScrollableDemoEdit.value = true;
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    // EDITAR
    const productEdit = ref([]);
    const saleViewEdit = async (sale) => {
      const { data, message } = await useApi('salesShowForEdit/' + sale);

      if (message == 'Sale found') {
        formData.value.total = data.detail.total;
        formData.value.customer_id = data.sale.customer_id;
        formData.value.amount = data.detail.amount;
        formData.value.unit_price = data.detail.unit_price;
        formData.value.subtotal = data.detail.observation;
        formData.value.sale_id = data.sale.sale_id;
      }
      console.log("salesShowForEdit: ", data);
      productEdit.value = data.detail;
    };

    const handleEdit = (row) => {
      visibleEdit.value = true;
      saleViewEdit(row);
    }

    //ELIMINAR 
    const deleteSale = async (customerId) => {
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

    const customerList = ref([]);
    const showCustomer = async () => {
      try {
        const { data } = await useApi('customerAll');
        customerList.value = data;
      } catch (error) {
        console.error('Error al obtener los clientes', error);
      }
    };
    onMounted(showCustomer);

    const productList = ref([]);
    const showProducts = async () => {
      try {
        const { data } = await useApi('productAll');
        productList.value = data;
      } catch (error) {
        console.error('Error al obtener los productos', error);
      }
    };
    onMounted(showProducts);

    //ABRIR Y CERRAR EL MODAL
    const closeModalAndResetFormData = () => {
      visibleVerticallyCenteredScrollableDemo.value = false;
      visibleEdit.value = false;
      resetFormData();
    };

    const closeModalAndResetFormDataEdit = () => {
      visibleVerticallyCenteredScrollableDemoEdit.value = false;
      visibleCenterEdit.value = false;
    };

    const productRows = ref([]);
    const total = ref(0);

    const calculateSubtotal = (row) => {
      row.subtotal = row.amount * row.product_unit_price;
      calculateTotal();
    };

    const calculateTotal = () => {
      formData.value.total = productRows.value.reduce((acc, row) => acc + (row.subtotal || 0), 0);
    };

    watch(() => productRows.value, () => {
      productRows.value.forEach(row => {
        watch(() => row.amount, () => calculateSubtotal(row), { immediate: true });
        watch(() => row.product_unit_price, () => calculateSubtotal(row), { immediate: true });
      });
    }, { deep: true });

    const addProductDetailRow = () => {
      const productId = formData.value.product_id;
      const selectedProduct = productList.value.find(p => p.id === productId);
      console.log("seleccion producto: ", selectedProduct);

      const productExists = productRows.value.some(row => row.product_id === productId);
      console.log("Existente producto: ", productExists);

      if (productExists) {
        let productItem = productRows.value.find(p => p.product_id === productId);
        productItem.amount = productItem.amount + 1;
        return;
      }

      const newRow = {
        product_id: selectedProduct.id,
        product_name: selectedProduct.name,
        product_unit_price: selectedProduct.price,
        amount: 1,
        subtotal: selectedProduct.price,
      };

      productRows.value.push(newRow);

      watch(() => newRow.amount, () => calculateSubtotal(newRow));
      calculateTotal();
    };

    const removeProductRow = (index) => {
      if (productRows.value.length > 0) {
        productRows.value.splice(index, 1);
      }
      calculateTotal();
    };

    //PRODUCTO SELECCIONADA
    const isProductSelected = (product) => {
      return productRows.value.some(selectedProduct => selectedProduct.product_id === product.id);
    };

    const selectPriceUniProduct = (index) => {
      const id = productRows.value[index].product_id;
      const result = productList.value.find(product => product.id === id);

      productRows.value[index].product_name = result[0].name;
      productRows.value[index].product_unit_price = result[0].price;
    }

    return {
      tableData,
      formData,
      errors,
      errorsClear,
      visible,
      visibleVerticallyCenteredScrollableDemo,
      visibleVerticallyCenteredScrollableDemoEdit,
      visibleEdit,
      visibleCenterEdit,
      closeModalAndResetFormData,
      closeModalAndResetFormDataEdit,
      viewSale,
      selectedProduct,
      createProduct,
      deleteSale,
      showCustomer,
      customerList,
      showProducts,
      productList,
      productRows,
      addProductDetailRow,
      removeProductRow,
      isProductSelected,
      selectPriceUniProduct,
      calculateSubtotal,
      calculateTotal,
      paramsProducts,
      resetFormData,
      handleEdit,
      productEdit
    };
  }
}
</script>
