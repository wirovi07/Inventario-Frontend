<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>

  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">T. Doc</CTableHeaderCell>
        <CTableHeaderCell scope="col">Documento</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
        <CTableHeaderCell scope="col">Empresa</CTableHeaderCell>
        <CTableHeaderCell scope="col">Sexo</CTableHeaderCell>
        <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
        <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
        <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell>{{ row.id }}</CTableDataCell> <!-- Mostrar consecutivo -->
        <CTableDataCell>{{ row.type_document }}</CTableDataCell>
        <CTableDataCell>{{ row.document }}</CTableDataCell>
        <CTableDataCell>{{ row.name }}</CTableDataCell>
        <CTableDataCell>{{ row.name_company }}</CTableDataCell>
        <CTableDataCell>{{ row.sex }}</CTableDataCell>
        <CTableDataCell>{{ row.address }}</CTableDataCell>
        <CTableDataCell>{{ row.phone }}</CTableDataCell>
        <CTableDataCell>{{ row.email }}</CTableDataCell>
        <CTableDataCell>
          <CButton color="primary" size="sm" class="m-1" style="color: white;" @click="viewCustomer(row.realId)">Editar
          </CButton>
          <CButton color="danger" size="sm" @click="deleteCustomer(row.realId)">Eliminar</CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- CREAR CLIENTE -->
  <CModal alignment="center" size="lg" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Cliente</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- TIPO DOCUMENTO -->
              <div id="inventario-type_document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Tipo de Documento</label>
                <select v-model="formData.type_document" class="form-control" tabindex="1">
                  <option value="" disabled selected>Tipo de Documento</option>
                  <option value="CC">CC</option>
                  <option value="EX">EX</option>
                </select>
                <template v-if="errors.type_document.length > 0">
                  <b :key="e" v-for="e in errors.type_document" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- NOMBRE -->
              <div id="inventario-type_document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre</label>
                <input v-model="formData.first_name" type="text" class="form-control" tabindex="3" />
                <template v-if="errors.first_name.length > 0">
                  <b :key="e" v-for="e in errors.first_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="formData.company_id" class="form-select" tabindex="5">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}</option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CORREO -->
              <div id="inventario-email" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
                <input v-model="formData.email" type="email" class="form-control" tabindex="7" />
                <template v-if="errors.email.length > 0">
                  <b :key="e" v-for="e in errors.email" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DIRECCION -->
              <div id="inventario-address" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Direccion</label>
                <input v-model="formData.address" type="text" class="form-control" tabindex="9" />
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
              <!-- DOCUMENTO -->
              <div id="inventario-document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Documento</label>
                <input v-model="formData.document" type="text" class="form-control" tabindex="2" />
                <template v-if="errors.document.length > 0">
                  <b :key="e" v-for="e in errors.document" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- APELLIDO -->
              <div id="inventario-last_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Apellido</label>
                <input v-model="formData.last_name" type="text" class="form-control" tabindex="4" />
                <template v-if="errors.last_name.length > 0">
                  <b :key="e" v-for="e in errors.last_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- SEXO -->
              <div id="inventario-sex" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Sexo</label>
                <select v-model="formData.sex" class="form-control" tabindex="6">
                  <option value="" disabled selected>Genero</option>
                  <option value="1">Masculino</option>
                  <option value="2">Femenino</option>
                </select>
                <template v-if="errors.sex.length > 0">
                  <b :key="e" v-for="e in errors.sex" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- TELEFONO -->
              <div id="inventario-phone" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
                <input v-model="formData.phone" type="text" class="form-control" tabindex="8" />
                <template v-if="errors.phone.length > 0">
                  <b :key="e" v-for="e in errors.phone" class="text-danger">
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
      <CButton color="primary" @click="createCustomer" tabindex="12">Crear</CButton>
    </CModalFooter>
  </CModal>

  <!-- EDITAR CLIENTE -->
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemoEdit"
    @close="closeModalAndResetFormDataEdit" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Editar Cliente</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <div class="row">
        <div class="col-md-6">
          <form class="text-start">
            <div class="form">
              <!-- TIPO DOCUMENTO -->
              <div id="inventario-type_document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Tipo de Documento</label>
                <select v-model="selectedCustomer.type_document" class="form-control" tabindex="1">
                  <option value="" disabled selected>Tipo de Documento</option>
                  <option value="cc">CC</option>
                  <option value="ex">EX</option>
                </select>
                <template v-if="errors.type_document.length > 0">
                  <b :key="e" v-for="e in errors.type_document" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- NOMBRE -->
              <div id="inventario-type_document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre</label>
                <input v-model="selectedCustomer.first_name" type="text" class="form-control" tabindex="3" />
                <template v-if="errors.first_name.length > 0">
                  <b :key="e" v-for="e in errors.first_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- EMPRESA -->
              <div id="inventario-company_id" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Empresa</label>
                <select v-model="selectedCustomer.company_id" class="form-select" tabindex="2">
                  <option style="margin: 1px" value="" disabled selected>Empresas</option>
                  <option :value="company.id" :key="company.id" v-for="company in companiesList">{{ company.name }}</option>
                </select>
                <template v-if="errors.company_id.length > 0">
                  <b :key="e" v-for="e in errors.company_id" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- CORREO -->
              <div id="inventario-email" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
                <input v-model="selectedCustomer.email" type="email" class="form-control" tabindex="9" />
                <template v-if="errors.email.length > 0">
                  <b :key="e" v-for="e in errors.email" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- DIRECCION -->
              <div id="inventario-address" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Direccion</label>
                <input v-model="selectedCustomer.address" type="text" class="form-control" tabindex="11" />
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
              <!-- DOCUMENTO -->
              <div id="inventario-document" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Documento</label>
                <input v-model="selectedCustomer.document" type="text" class="form-control" tabindex="2" />
                <template v-if="errors.document.length > 0">
                  <b :key="e" v-for="e in errors.document" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- APELLIDO -->
              <div id="inventario-last_name" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Apellido</label>
                <input v-model="selectedCustomer.last_name" type="text" class="form-control" tabindex="4" />
                <template v-if="errors.last_name.length > 0">
                  <b :key="e" v-for="e in errors.last_name" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- SEXO -->
              <div id="inventario-sex" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Sexo</label>
                <select v-model="selectedCustomer.sex" class="form-control" tabindex="10">
                  <option value="" disabled selected>Genero</option>
                  <option value="masculino">Masculino</option>
                  <option value="femenino">Femenino</option>
                </select>
                <template v-if="errors.sex.length > 0">
                  <b :key="e" v-for="e in errors.sex" class="text-danger">
                    {{ e }}
                  </b>
                </template>
              </div>
              <!-- TELEFONO -->
              <div id="inventario-phone" class="field-wrapper input mt-2">
                <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
                <input v-model="selectedCustomer.phone" type="text" class="form-control" tabindex="12" />
                <template v-if="errors.phone.length > 0">
                  <b :key="e" v-for="e in errors.phone" class="text-danger">
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
      <CButton color="primary" @click="editCustomer">Editar</CButton>
    </CModalFooter>
  </CModal>
</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';
import Swal from 'sweetalert2';

export default {
  name: 'Empresa',
  setup() {

    const formData = ref({
      type_document: '',
      document: '',
      first_name: '',
      last_name: '',
      sex: '',
      address: '',
      phone: '',
      email: '',
      company_id: ''
    });

    const errors = ref({
      type_document: [],
      document: [],
      first_name: [],
      last_name: [],
      sex: [],
      address: [],
      phone: [],
      email: [],
      company_id: []
    });

    const errorsClear = () => {
      errors.value = {
        type_document: [],
        document: [],
        first_name: [],
        last_name: [],
        sex: [],
        address: [],
        phone: [],
        email: [],
        company_id: []
      };
    };

    const resetFormData = () => {
      formData.value = {
        type_document: '',
        document: '',
        first_name: '',
        last_name: '',
        sex: '',
        address: '',
        phone: '',
        email: '',
        company_id: ''
      };
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const visibleVerticallyCenteredScrollableDemoEdit = ref(false);

    const tableData = ref([]);

    const TableDataApi = async () => {
      try {
        const { data } = await useApi('customer');

        const mappedData = data.map((item, index) => ({
          id: index + 1,
          realId: item.id,
          type_document: item.type_document,
          document: item.document,
          name: item.name,
          name_company: item.name_company,
          sex: item.sex,
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

    const createCustomer = async () => {
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
        await useApi('customer', 'POST', formData.value);
        Swal.fire({
          title: 'Éxito!',
          text: 'Cliente creado correctamente!',
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

    const selectedCustomer = ref(null);

    const viewCustomer = async (customerId) => {
      try {
        const { data } = await useApi('customer/' + customerId);
        selectedCustomer.value = data;
        console.log(data);
        visibleVerticallyCenteredScrollableDemoEdit.value = true;

      } catch (error) {
        console.error('Error fetching customer data:', error);
      }
    };

    const editCustomer = async () => {
      try {
        const datosActualizados = {
          type_document: selectedCustomer.value.type_document,
          document: selectedCustomer.value.document,
          first_name: selectedCustomer.value.first_name,
          last_name: selectedCustomer.value.last_name,
          sex: selectedCustomer.value.sex,
          address: selectedCustomer.value.address,
          phone: selectedCustomer.value.phone,
          email: selectedCustomer.value.email,
          company_id: selectedCustomer.value.company_id,
        };

        await useApi('employ/' + selectedCustomer.value.id, 'PUT', datosActualizados);

        Swal.fire({
          title: 'Éxito!',
          text: 'Empresa editada correctamente!',
          icon: 'success',
          confirmButtonText: '¡Entendido!',
        });
        resetFormData();
        TableDataApi();
      } catch (error) {
        console.error('Error al actualizar el cliente:', error);
      }
    };

    const deleteCustomer = async (customerId) => {
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
          await useApi('company/' + customerId, 'DELETE');

          tableData.value = tableData.value.filter((row) => row.customerId != customerId);

          Swal.fire('Eliminar!', 'El cliente ha sido eliminado!.', 'success');

          TableDataApi();
        } catch (error) {
          Swal.fire('Error!', 'Debes eliminar la empresa y depues el cliente.', 'error');
        }
      }
    };

    const companiesList = ref([]);

    const showCompanies = async () => {
      try {
        const { data } = await useApi('companyAll');
        companiesList.value = data;
      } catch (error) {
        console.error('Error al obtener los clientes', error);
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
      viewCustomer,
      selectedCustomer,
      createCustomer,
      editCustomer,
      deleteCustomer,
      showCompanies,
      companiesList,
    };
  }
}
</script>
