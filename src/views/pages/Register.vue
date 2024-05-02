<template>
  <div class="bg-body-tertiary min-vh-100 d-flex flex-row align-items-center">
    <CContainer>
      <CRow class="justify-content-center">
        <CCol :md="9" :lg="7" :xl="6">
          <CCard class="mx-4">
            <CCardBody class="p-4">
              <CForm>
                <h1>Register</h1>
                <a class="text-primary text-body-secondary text-decoration-none fs-6 fw-bold">Crea tu cuenta!</a>
                <div class="row mt-4">
                  <div class="col-md-6">
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autocomplete="username" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="Email" autocomplete="email" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" autocomplete="new-password" />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Repeat password" autocomplete="new-password" />
                    </CInputGroup>
                  </div>
                  <div class="col-md-6">
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-user" />
                      </CInputGroupText>
                      <CFormInput placeholder="Username" autocomplete="username" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>@</CInputGroupText>
                      <CFormInput placeholder="Email" autocomplete="email" />
                    </CInputGroup>
                    <CInputGroup class="mb-3">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Password" autocomplete="new-password" />
                    </CInputGroup>
                    <CInputGroup class="mb-4">
                      <CInputGroupText>
                        <CIcon icon="cil-lock-locked" />
                      </CInputGroupText>
                      <CFormInput type="password" placeholder="Repeat password" autocomplete="new-password" />
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
