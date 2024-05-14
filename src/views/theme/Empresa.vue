<template>
  <CButton color="primary" class="mb-4" @click="() => { visibleVerticallyCenteredScrollableDemo = true }">
    Crear
  </CButton>
  <CModal alignment="center" scrollable :visible="visibleVerticallyCenteredScrollableDemo"
    @close="() => { visibleVerticallyCenteredScrollableDemo = false }" aria-labelledby="VerticallyCenteredExample2">
    <CModalHeader>
      <CModalTitle id="VerticallyCenteredExample2">Crear Empresa</CModalTitle>
    </CModalHeader>
    <CModalBody>
      <form class="text-start">
        <div class="form">
          <!-- NIT -->
          <div id="inventario-nit" class="field-wrapper input mt-2">
            <label for="fullname" class="col-form-label p-1 fs-6 fw-bold">NIT</label>
            <input v-model="formData.nit" type="number" class="form-control" tabindex="1" />
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
            <input v-model="formData.phone" type="number" class="form-control" tabindex="3" />
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
      <CButton color="secondary" @click="() => { visibleVerticallyCenteredScrollableDemo = false }">
        Cerrar
      </CButton>
      <CButton color="primary" @click="CreateCompany">Crear</CButton>
    </CModalFooter>
  </CModal>
  <CTable striped>
    <CTableHead>
      <CTableRow>
        <CTableHeaderCell scope="col">#</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nit</CTableHeaderCell>
        <CTableHeaderCell scope="col">Nombre</CTableHeaderCell>
        <CTableHeaderCell scope="col">Dirección</CTableHeaderCell>
        <CTableHeaderCell scope="col">Telefono</CTableHeaderCell>
        <CTableHeaderCell scope="col">Correo</CTableHeaderCell>
      </CTableRow>
    </CTableHead>
    <CTableBody>
      <CTableRow v-for="(row, index) in tableData" :key="index">
        <CTableDataCell v-for="(cell, cellIndex) in row" :key="cellIndex">
          {{ cell }}
        </CTableDataCell>
      </CTableRow>
    </CTableBody>
  </CTable>



</template>

<script>
import { ref, onMounted } from 'vue';
import { useApi } from '../../composables/use-api';
import 'bootstrap/dist/css/bootstrap.min.css';

export default {
  name: 'Empresa',
  setup() {

    const formData = ref({
      nit: '',
      name: '',
      address: '',
      phone: '',
      email: '',
      user_id: '',
    });

    const errors = ref({
      nit: [],
      name: [],
      address: [],
      phone: [],
      email: [],
      user_id: [],
    });

    const errorsClear = () => {
      errors.value = {
        nit: [],
        name: [],
        address: [],
        phone: [],
        email: [],
        user_id: [],
      };
    };
    const visible = ref(false);

    const visibleVerticallyCenteredScrollableDemo = ref(false);
    const tableData = ref([]);

    const TableDataApi = async () => {
      try {
        const { data } = await useApi('company');

        const mappedData = data.map((item, index) => ({
          '#': index + 1,
          Nit: item.nit,
          Nombre: item.name,
          Dirección: item.address,
          Telefono: item.phone,
          Correo: item.email
        }));

        tableData.value = mappedData;
      } catch (error) {
        console.error('Error fetching data from API:', error);
      }
    };

    onMounted(TableDataApi);

    const CreateCompany = async () => {
      alert("si esta entrando")
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
          console.log("Enviando datos:", formData.value);
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

    return {
      tableData,
      CreateCompany,
      formData,
      errors,
      errorsClear,
      visible,
      visibleVerticallyCenteredScrollableDemo,
    };
  }
}
</script>
