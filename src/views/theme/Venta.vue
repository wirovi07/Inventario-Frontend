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
        <CTableDataCell>{{ row.id }}</CTableDataCell> <!-- Mostrar consecutivo -->
        <CTableDataCell>{{ row.company }}</CTableDataCell>
        <CTableDataCell>{{ row.employ }}</CTableDataCell>
        <CTableDataCell>{{ row.customer }}</CTableDataCell>
        <CTableDataCell>{{ row.date }}</CTableDataCell>
        <CTableDataCell>{{ row.total }}</CTableDataCell>
        <CTableDataCell>
          <CButton color="primary" size="sm" class="m-1" style="color: white;" @click="viewSale(row.realId)">Editar
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
                <multiselect v-model="formData.customer_id" :options="customerList" :placeholder="'Seleccionar cliente'"
                  label="name" track-by="id">
                </multiselect>
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
                <multiselect v-model="formData.product_id" :options="productList" :placeholder="'Seleccionar producto'"
                  label="name" track-by="id" @select="addProductDetailRow">
                </multiselect>
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
                  placeholder="Precio unitario" />
              </td>
              <td class="text-center p-2">
                <div class="d-flex justify-content-center">
                  <input v-model="row.amount" type="number" class="form-control mb-1 p-1 fs-6 fw-bold w-50"
                    placeholder="Cant" />
                </div>
              </td>
              <td class="p-2">
                <input v-model="row.subtotal" type="number" class="form-control mb-1 p-1 fs-6 fw-bold"
                  placeholder="Subtotal" />
              </td>
            </tr>
          </tbody>
        </table>
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
import { ref, onMounted, watch } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';
import Multiselect from 'vue-multiselect';
import 'vue-multiselect/dist/vue-multiselect.css';

export default {
  name: 'Venta',

  components: {
    Multiselect,
  },
  setup() {

    const formData = ref({
      date: '',
      total: '',
      company_id: '',
      employee_id: '',
      customer_id: '',
      product_id: ''
    });

    const errors = ref({
      date: [],
      total: [],
      company_id: [],
      employee_id: [],
      customer_id: [],
      product_id: [],
      products: [],
    });

    const errorsClear = () => {
      errors.value = {
        date: [],
        total: [],
        company_id: [],
        employee_id: [],
        customer_id: [],
        product_id: []
      };
    };

    const resetFormData = () => {
      formData.value = {
        date: '',
        total: '',
        company_id: '',
        employee_id: '',
        customer_id: '',
        product_id: ''
      };
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const visibleVerticallyCenteredScrollableDemoEdit = ref(false);

    const tableData = ref([]);

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

    const viewSale = async (customerId) => {
      try {
        const { data } = await useApi('product/' + customerId);
        selectedProduct.value = data;
        visibleVerticallyCenteredScrollableDemoEdit.value = true;
      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

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

    const closeModalAndResetFormData = () => {
      visibleVerticallyCenteredScrollableDemo.value = false;
      resetFormData();
    };

    const closeModalAndResetFormDataEdit = () => {
      visibleVerticallyCenteredScrollableDemoEdit.value = false;
    };

    const productRows = ref([]);

    const calculateSubtotal = (row) => {
      row.subtotal = row.amount * row.product_unit_price;
    };

    watch(productRows, (newRows) => {
      newRows.forEach(row => {
        watch(() => row.amount, () => calculateSubtotal(row));
      });
    }, { deep: true });

    const addProductDetailRow = (product) => {
      const productId = product.id;
      const selectedProduct = productList.value.find(p => p.id === productId);

      const productExists = productRows.value.some(row => row.product_id === productId);
      if (productExists) return;

      const newRow = {
        product_id: selectedProduct.id,
        product_name: selectedProduct.name,
        product_unit_price: selectedProduct.price,
        amount: 1,
        subtotal: selectedProduct.price,
      };

      productRows.value.push(newRow);

      watch(() => newRow.amount, () => calculateSubtotal(newRow));
    };

    const removeProductRow = (index) => {
      if (productRows.value.length > 0) {
        productRows.value.splice(index, 1);
      }
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
      calculateSubtotal
    };
  }
}
</script>
