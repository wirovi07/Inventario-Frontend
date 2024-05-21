<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>

  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Compañia Prov.</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre Prov.</CTableHeaderCell>
        <CTableHeaderCell scope="col">Empresa</CTableHeaderCell>
        <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
        <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
        <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell>{{ row.id }}</CTableDataCell> <!-- Mostrar consecutivo -->
        <CTableDataCell>{{ row.company_name }}</CTableDataCell>
        <CTableDataCell>{{ row.contact_name }}</CTableDataCell>
        <CTableDataCell>{{ row.name_company }}</CTableDataCell>
        <CTableDataCell>{{ row.address }}</CTableDataCell>
        <CTableDataCell>{{ row.phone }}</CTableDataCell>
        <CTableDataCell>{{ row.email }}</CTableDataCell>
        <CTableDataCell>
          <CButton color="primary" size="sm" class="m-1" style="color: white;" @click="viewSupplier(row.realId)">Editar
          </CButton>
          <CButton color="danger" size="sm" @click="deleteSupplier(row.realId)">Eliminar</CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- CREAR PROVEEDOR -->
  <CModal alignment="center" size="lg" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Proveedor</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- NOMBRE DE COMPAÑIA -->
              <div id="inventario-company_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre Compañia</label>
                <input v-model="formData.company_name" type="text" class="form-control" tabindex="1" />
                <template v-if="errors.company_name.length > 0">
                  <b :key="e" v-for="e in errors.company_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="formData.company_id" class="form-select" tabindex="3">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}</option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DIRECCION -->
              <div id="inventario-address" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Direccion</label>
                <input v-model="formData.address" type="text" class="form-control" tabindex="5" />
                <template v-if="errors.address.length > 0">
                  <b :key="e" v-for="e in errors.address" class="text-danger">
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
              <!-- NOMBRE CONTACTO -->
              <div id="inventario-contact_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre Contacto</label>
                <input v-model="formData.contact_name" type="text" class="form-control" tabindex="2" />
                <template v-if="errors.contact_name.length > 0">
                  <b :key="e" v-for="e in errors.contact_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- TELEFONO -->
              <div id="inventario-phone" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
                <input v-model="formData.phone" type="text" class="form-control" tabindex="6" />
                <template v-if="errors.phone.length > 0">
                  <b :key="e" v-for="e in errors.phone" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CORREO -->
              <div id="inventario-email" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
                <input v-model="formData.email" type="email" class="form-control" tabindex="8" />
                <template v-if="errors.email.length > 0">
                  <b :key="e" v-for="e in errors.email" class="text-danger">
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
      <CButton color="primary" @click="createSupplier" tabindex="12">Crear</CButton>
    </CModalFooter>
  </CModal>

  <!-- EDITAR PROVEEDOR -->
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemoEdit"
    @close="closeModalAndResetFormDataEdit" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Editar Proveedor</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- NOMBRE DE COMPAÑIA -->
              <div id="inventario-company_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Compañia del Proveedor</label>
                <input v-model="selectedSupplier.company_name" type="text" class="form-control" tabindex="1" />
                <template v-if="errors.company_name.length > 0">
                  <b :key="e" v-for="e in errors.company_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="selectedSupplier.company_id" class="form-select" tabindex="3">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}</option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DIRECCION -->
              <div id="inventario-address" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Direccion</label>
                <input v-model="selectedSupplier.address" type="text" class="form-control" tabindex="5" />
                <template v-if="errors.address.length > 0">
                  <b :key="e" v-for="e in errors.address" class="text-danger">
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
              <!-- NOMBRE CONTACTO -->
              <div id="inventario-contact_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre del Proveedor</label>
                <input v-model="selectedSupplier.contact_name" type="text" class="form-control" tabindex="2" />
                <template v-if="errors.contact_name.length > 0">
                  <b :key="e" v-for="e in errors.contact_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- TELEFONO -->
              <div id="inventario-phone" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
                <input v-model="selectedSupplier.phone" type="text" class="form-control" tabindex="6" />
                <template v-if="errors.phone.length > 0">
                  <b :key="e" v-for="e in errors.phone" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CORREO -->
              <div id="inventario-email" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
                <input v-model="selectedSupplier.email" type="email" class="form-control" tabindex="8" />
                <template v-if="errors.email.length > 0">
                  <b :key="e" v-for="e in errors.email" class="text-danger">
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
      <CButton color="primary" @click="editSupplier">Editar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default {
  name: 'Proveedor',
  setup() {

    const formData = ref({
      company_name: '',
      contact_name: '',
      address: '',
      email: '',
      phone: '',
      company_id: '',
    });

    const errors = ref({
      company_name: [],
      contact_name: [],
      address: [],
      email: [],
      phone: [],
      company_id: []
    });

    const errorsClear = () => {
      errors.value = {
        company_name: [],
        contact_name: [],
        address: [],
        email: [],
        phone: [],
        company_id: []
      };
    };

    const resetFormData = () => {
      formData.value = {
        company_name: '',
        contact_name: '',
        address: '',
        email: '',
        phone: '',
        company_id: '',
      };
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const visibleVerticallyCenteredScrollableDemoEdit = ref(false);

    const tableData = ref([]);

    const TableDataApi = async () => {
      try {
        const { data } = await useApi('supplier');

        const mappedData = data.map((item, index) => ({
          id: index + 1,
          realId: item.id,
          company_name: item.company_name,
          contact_name: item.contact_name,
          name_company: item.name_company,
          address: item.address,
          phone: item.phone,
          email: item.email,
        }));

        tableData.value = mappedData;
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };
    onMounted(TableDataApi);

    const createSupplier = async () => {
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
        await useApi('supplier', 'POST', formData.value);
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

      fetchDataFromApi();
    };

    const selectedSupplier = ref(null);

    const viewSupplier = async (customerId) => {
      try {
        const { data } = await useApi('supplier/' + customerId);
        selectedSupplier.value = data;
        console.log(data);
        visibleVerticallyCenteredScrollableDemoEdit.value = true;

      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const editSupplier = async () => {
      try {
        const datosActualizados = {
          company_name: selectedSupplier.value.company_name,
          contact_name: selectedSupplier.value.contact_name,
          address: selectedSupplier.value.address,
          email: selectedSupplier.value.email,
          phone: selectedSupplier.value.phone,
          company_id: selectedSupplier.value.company_id,
        };

        await useApi('supplier/' + selectedSupplier.value.id, 'PUT', datosActualizados);

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

    const deleteSupplier = async (customerId) => {
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
          await useApi('supplier/' + customerId, 'DELETE');

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
      viewSupplier,
      selectedSupplier,
      createSupplier,
      editSupplier,
      deleteSupplier,
      showCompanies,
      companiesList,
    };
  }
}
</script>
