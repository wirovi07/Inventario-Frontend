<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1 class="text-center fw-semibold">Registrate ó Crea tu cuenta</h1>
                <div class="text-center">
                  <span class="text-primary text-body-secondary fs-6 fw-medium hover-effect">Ya tienes una cuenta? <a
                      href="" class="primary fst-normal text-decoration-none">Ingresar</a></span>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-description" />
                      </CInputGroupText>
                      <select v-model="formData.type_document" class="form-control">
                        <option value="" disabled selected>Tipo de Documento</option>
                        <option value="RC">RC</option>
                        <option value="TI">TI</option>
                        <option value="CC">CC</option>
                        <option value="EX">EX</option>
                      </select>
                    </CInputGroup>
                    <template v-if="errors.type_document.length > 0">
                      <b :key="e" v-for="e in errors.type_document" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-contact" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.first_name" placeholder="Nombres" type="text" tabindex="3" />
                    </CInputGroup>
                    <template v-if="errors.first_name.length > 0">
                      <b :key="e" v-for="e in errors.first_name" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-wc" />
                      </CInputGroupText>
                      <select v-model="formData.sex" class="form-control">
                        <option value="" disabled selected>Genero
                        </option>
                        <option value="1">Masculino</option>
                        <option value="2">Femenino</option>
                      </select>
                    </CInputGroup>
                    <template v-if="errors.sex.length > 0">
                      <b :key="e" v-for="e in errors.sex" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-phone" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.phone" placeholder="Telefono" type="numeric" tabindex="7" />
                    </CInputGroup>
                    <template v-if="errors.phone.length > 0">
                      <b :key="e" v-for="e in errors.phone" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.password" type="password" placeholder="Contraseña" tabindex="9" />
                    </CInputGroup>
                    <template v-if="errors.password.length > 0">
                      <b :key="e" v-for="e in errors.password" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                  </div>
                  <div class="col-md-6">
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.document" placeholder="Documento" type="numeric" tabindex="2" />
                    </CInputGroup>
                    <template v-if="errors.document.length > 0">
                      <b :key="e" v-for="e in errors.document" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-contact" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.last_name" placeholder="Apellido" type="text" tabindex="4" />
                    </CInputGroup>
                    <template v-if="errors.last_name.length > 0">
                      <b :key="e" v-for="e in errors.last_name" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.address" placeholder="Dirección" type="text" tabindex="6" />
                    </CInputGroup>
                    <template v-if="errors.address.length > 0">
                      <b :key="e" v-for="e in errors.address" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-at" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.email" placeholder="Email" type="email" tabindex="8" />
                    </CInputGroup>
                    <template v-if="errors.email.length > 0">
                      <b :key="e" v-for="e in errors.email" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                    <CInputGroup class="mt-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-unlocked" />
                      </CInputGroupText>
                      <CFormInput v-model="formData.password_confirmed" type="password"
                        placeholder="Confirmar contraseña" tabindex="10" />
                    </CInputGroup>
                    <template v-if="errors.password_confirmed.length > 0">
                      <b :key="e" v-for="e in errors.password_confirmed" class="text-danger">
                        {{ e }}
                      </b>
                    </template>
                  </div>
                </div>
                <div class="d-grid mt-3">
                  <CButton @click="registerUser" color="success">Registrate!</CButton>
                </div>
              </CForm>
            </CCardBody>
          </CCard>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
const router = useRouter();

import { ref, onBeforeMount } from 'vue';
import axios from 'axios';
import Swal from 'sweetalert2';

export default {
  name: 'Register',
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
      password: '',
      password_confirmed: '',
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
      password: [],
      password_confirmed: [],
    });

    const epsList = ref([]);

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
        password: [],
        password_confirmed: [],
      }
    }

    const registerUser = async () => {
      errorsClear()

      let has_error = false;
      Object.entries(formData.value).forEach(f => {
        const elemento = f[0]
        const value = f[1]
        if (value == "") {
          has_error = true
          errors.value[elemento] = "Este campo es obligatorio"
        }
      });

      if (has_error) return;

      try {
        const response = await axios.post('http://inventario-backend.test/api/register', formData.value);

        Swal.fire({
          title: 'Éxito!',
          text: 'Usuario registrado correctamente!',
          icon: 'success',
          confirmButtonText: '¡Entendido!'
        });

        formData.value = {
            type_document: '',
            document: '',
            first_name: '',
            last_name: '',
            sex: '',
            address: '',
            phone: '',
            email: '',
            password: '',
            password_confirmed: '',
        };

        router.push({ name: 'login' })

      } catch (error) {
        if (error.response && error.response.data && error.response.data.errors) {
          const errors_api = error.response.data.errors;
          Object.entries(errors_api).forEach(e => {
            const elemento = e[0]
            const mensaje = e[1]
            errors.value[elemento] = mensaje
          });
        } 
      }
    };

    return {
      formData,
      errors,
      epsList,
      errorsClear,
      registerUser
    };
  }
}
</script>
