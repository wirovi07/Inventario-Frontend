<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="8">
          <CCardGroup>
            <CCard class="p-4">
              <CCardBody>
                <CForm @submit="loginUser">
                  <h1>Login</h1>
                  <p class="text-body-secondary">Iniciar sesión en su cuenta</p>
                  <CInputGroup class="mb-3">
                    <CInputGroupText>
                      <CIcon icon="cil-user" />
                    </CInputGroupText>
                    <CFormInput v-model="formData.email" placeholder="Usuario" autocomplete="username" />
                  </CInputGroup>
                  <CInputGroup class="mb-4">
                    <CInputGroupText>
                      <CIcon icon="cil-lock-locked" />
                    </CInputGroupText>
                    <CFormInput v-model="formData.password" type="password" placeholder="Constraseña" autocomplete="current-password" />
                  </CInputGroup>
                  <CRow>
                    <CCol :xs="6">
                      <CButton type="submit" color="primary" class="px-4"> Iniciar </CButton>
                    </CCol>
                  </CRow>
                </CForm>
              </CCardBody>
            </CCard>
            <CCard class="text-white bg-primary py-5" style="width: 44%">
              <CCardBody class="text-center">
                <div>
                  <h2>¡Únete a nosotros!</h2>
                  <p>
                    Regístrate ahora para empezar a gestionar tus existencias de manera eficiente y aprovechar al máximo
                    tu negocio.
                  </p>
                  <CButton color="light" variant="outline" class="mt-3">
                    <router-link to="/auth/register" class="text-decoration-none fs-6"
                      style="color: var(--cui-header-hover-color); margin-left: 5px;">Registrate!</router-link>
                  </CButton>
                </div>
              </CCardBody>
            </CCard>
          </CCardGroup>
        </CCol>
      </CRow>
    </CContainer>
  </div>
</template>

<script>
import { useRouter } from 'vue-router';
import { ref } from 'vue';
import Swal from 'sweetalert2';
import { useApi } from '../../composables/use-api';

export default {
  name: 'Login',
  setup() {
    const router = useRouter();
    const formData = ref({
      email: 'wirovi_0798@hotmail.com',
      password: '12345678',
    });

    const loginUser = async (event) => {
      event.preventDefault();
      if (!formData.value.email || !formData.value.password) {
        Swal.fire({
          title: 'Error!',
          text: 'Debe llenar todos los campos',
          icon: 'error',
          confirmButtonText: '¡Entendido!'
        });
        return;
      }

      try {
        const data = await useApi("login","POST", formData.value);

        const token = data.access_token;

        localStorage.setItem('token', token);

        router.push({ name: 'Dashboard' })
      } catch (error) {
        if (error.response && error.response.status) {
          Swal.fire({
            title: 'Error!',
            text: error.message,
            icon: 'error',
            confirmButtonText: '¡Entendido!'
          });
        } else {
          Swal.fire({
            title: 'Error!',
            text: 'Ocurrió un error al intentar iniciar sesión',
            icon: 'error',
            confirmButtonText: '¡Entendido!'
          });
        }
      }
    };

    return {
      formData,
      loginUser,
    };
  }
}


</script>
