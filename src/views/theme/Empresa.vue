<template>
  <!-- <div class="card flex justify-content-center">
    <Button label="Show" @click="visible = true" />
    <Dialog v-model:visible="visible" modal header="Edit Profile" :style="{ width: '25rem' }">
        <span class="p-text-secondary block mb-5">Update your information.</span>
        <div class="flex align-items-center gap-3 mb-3">
            <label for="username" class="font-semibold w-6rem">Username</label>
            <InputText id="username" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex align-items-center gap-3 mb-5">
            <label for="email" class="font-semibold w-6rem">Email</label>
            <InputText id="email" class="flex-auto" autocomplete="off" />
        </div>
        <div class="flex justify-content-end gap-2">
            <Button type="button" label="Cancel" severity="secondary" @click="visible = false"></Button>
            <Button type="button" label="Save" @click="visible = false"></Button>
        </div>
    </Dialog>
  </div> -->
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

    return {
      tableData,
      formData,
      errors,
      errorsClear,
      visible
    };
  }
}
</script>
