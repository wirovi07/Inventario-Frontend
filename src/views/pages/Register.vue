<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1 class="text-center display-1 fw-semibold">Register</h1>
                <div class="text-center">
                    <a class="text-primary text-body-secondary text-decoration-none fs-6 fw-bold">Crea tu cuenta!</a>
                </div>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-description" />
                      </CInputGroupText>
                      <CFormInput placeholder="Tipo Documento" type="text" tabindex="1"  />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-contact"/>
                      </CInputGroupText>
                      <CFormInput placeholder="Nombres" type="text" tabindex="3"  />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-wc" />
                      </CInputGroupText>
                      <CFormInput placeholder="Sexo" type="text" tabindex="5"  />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-phone"/>
                      </CInputGroupText>
                      <CFormInput placeholder="Telefono" type="text" tabindex="7" />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Contraseña" tabindex="9" />
                    </CInputGroup>
                  </div>
                  <div class="col-md-6">
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput placeholder="Documento" type="text" tabindex="2" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-contact"/>
                      </CInputGroupText>
                      <CFormInput placeholder="Apellido" type="text" tabindex="4"  />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-address-book" />
                      </CInputGroupText>
                      <CFormInput placeholder="Dirección" type="text" tabindex="6"  />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-at"/>
                      </CInputGroupText>
                      <CFormInput placeholder="Email" type="email" tabindex="8" />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-unlocked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Confirmar contraseña" tabindex="10"  />
                    </CInputGroup>
                  </div>
                </div>

                <div class="d-grid">
                  <CButton color="success">Create Account</CButton>
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
export default {
  name: 'Register',
}
</script>
