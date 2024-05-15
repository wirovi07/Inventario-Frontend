<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>

  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nit</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
        <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
        <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
        <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
        <CTableHeaderCell scope="col">Acciones</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell v-for="(cell, cellIndex) in row" :key="cellIndex">
          {{ cell }}
        </CTableDataCell>

        <CTableDataCell>
          <CButton color="primary" size="sm" class="m-1" style="color: white;" @click="viewCompany(row.id)">Editar
          </CButton>
          <CButton color="danger" size="sm" @click="deleteRow(index)">Eliminar</CButton>
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>

  <!-- CREAR EMPRESA -->
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Empresa</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <form class="text-start">
        <div class="form">
          <!-- NIT -->
          <div id="inventario-nit" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">NIT</label>
            <input v-model="formData.nit" type="text" class="form-control" tabindex="1" />
            <template v-if="errors.nit.length > 0">
              <b :key="e" v-for="e in errors.nit" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- NOMBRE -->
          <div id="inventario-name" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre</label>
            <input v-model="formData.name" type="text" class="form-control" tabindex="2" />
            <template v-if="errors.name.length > 0">
              <b :key="e" v-for="e in errors.name" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- DIRECCION -->
          <div id="inventario-address" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Dirección</label>
            <input v-model="formData.address" type="text" class="form-control" tabindex="3" />
            <template v-if="errors.address.length > 0">
              <b :key="e" v-for="e in errors.address" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- TELEFONO -->
          <div id="inventario-phone" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
            <input v-model="formData.phone" type="text" class="form-control" tabindex="3" />
            <template v-if="errors.phone.length > 0">
              <b :key="e" v-for="e in errors.phone" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- CORREO -->
          <div id="inventario-email" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
            <input v-model="formData.email" type="email" class="form-control" tabindex="3" />
            <template v-if="errors.email.length > 0">
              <b :key="e" v-for="e in errors.email" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
        </div>
      </form>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModalAndResetFormData">
        Descartar
      </CButton>
      <CButton color="primary" @click="CreateCompany">Crear</CButton>
    </CModalFooter>
  </CModal>

  <!-- EDITAR EMPRESA -->
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="closeModalAndResetFormData" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Editar Empresa</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <form class="text-start">
        <div class="form">
          <!-- NIT -->
          <div id="inventario-nit" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">NIT</label>
            <input v-model="selectedCompany.nit" type="text" class="form-control" tabindex="1" />
            <template v-if="errors.nit.length > 0">
              <b :key="e" v-for="e in errors.nit" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- NOMBRE -->
          <div id="inventario-name" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Nombre</label>
            <input v-model="selectedCompany.name" type="text" class="form-control" tabindex="2" />
            <template v-if="errors.name.length > 0">
              <b :key="e" v-for="e in errors.name" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- DIRECCION -->
          <div id="inventario-address" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Dirección</label>
            <input v-model="selectedCompany.address" type="text" class="form-control" tabindex="3" />
            <template v-if="errors.address.length > 0">
              <b :key="e" v-for="e in errors.address" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- TELEFONO -->
          <div id="inventario-phone" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Telefono</label>
            <input v-model="selectedCompany.phone" type="text" class="form-control" tabindex="3" />
            <template v-if="errors.phone.length > 0">
              <b :key="e" v-for="e in errors.phone" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
          <!-- CORREO -->
          <div id="inventario-email" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">Correo</label>
            <input v-model="selectedCompany.email" type="email" class="form-control" tabindex="3" />
            <template v-if="errors.email.length > 0">
              <b :key="e" v-for="e in errors.email" class="text-danger">
                {{ e }}
              </b>
            </template>
          </div>
        </div>
      </form>
    </CModalBody>
    <CModalFooter>
      <CButton color="secondary" @click="closeModalAndResetFormData">Descartar</CButton>
      <CButton color="primary" @click="editCompany">Editar</CButton>
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
      nit: '',
      name: '',
      address: '',
      phone: '',
      email: '',
    });

    const errors = ref({
      nit: [],
      name: [],
      address: [],
      phone: [],
      email: [],
    });

    const errorsClear = () => {
      errors.value = {
        nit: [],
        name: [],
        address: [],
        phone: [],
        email: [],
      };
    };

    const resetFormData = () => {
      formData.value = {
        nit: '',
        name: '',
        address: '',
        phone: '',
        email: '',
      };
    };

    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const tableData = ref([]);

    const TableDataApi = async () => {
      try {
        const { data } = await useApi('company');

        const mappedData = data.map((item, index) => ({
          id: index + 1,
          nit: item.nit,
          name: item.name,
          address: item.address,
          phone: item.phone,
          email: item.email
        }));

        tableData.value = mappedData;
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    onMounted(TableDataApi);

    const CreateCompany = async () => {
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
        await useApi('company', 'POST', formData.value);
        Swal.fire({
          title: 'Éxito!',
          text: 'Empresa creada correctamente!',
          icon: 'success',
          confirmButtonText: '¡Entendido!',
        }).then(() => {
          if (discardButton.value) {
            discardButton.value.click();
          }
          resetFormData();
        });
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

    const selectedCompany = ref(null);
    let id;

    const viewCompany = async (companyId) => {
      try {
        const { data } = await useApi('company/' + companyId);
        selectedCompany.value = data;
        visibleVerticallyCenteredScrollableDemo.value = true;

      } catch (error) {
        console.error('Error fetching company data:', error);
      }
    };

    const editCompany = async () => {
      console.log("entrar")
      try {
            const datosActualizados = {
                nit: selectedCompany.value.nit,
                name: selectedCompany.value.name,
                address: selectedCompany.value.address,
                phone: selectedCompany.value.phone,
                email: selectedCompany.value.email,
            };

            console.log(datosActualizados)

            await useApi('company/' + id, 'PUT', datosActualizados);

            Swal.fire({
                title: 'Éxito!',
                text: 'Empresa editada correctamente!',
                icon: 'success',
                confirmButtonText: '¡Entendido!',
            }).then(() => {
                if (discardButton.value) {
                    discardButton.value.click();
                }
                resetFormData();
            });
        } catch (error) {
            console.error('Error al actualizar la empresa:', error);
        }

        fetchDataFromApi();
    };

    const closeModalAndResetFormData = () => {
      visibleVerticallyCenteredScrollableDemo.value = false;
      resetFormData();
    };

    return {
      tableData,
      CreateCompany,
      formData,
      errors,
      errorsClear,
      visible,
      visibleVerticallyCenteredScrollableDemo,
      closeModalAndResetFormData,
      viewCompany,
      selectedCompany,
      editCompany,
    };
  }
}
</script>
