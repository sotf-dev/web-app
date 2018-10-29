(() => {
  // Variables
  const form = document.querySelector('form')
  const validate_form = document.getElementById('validate-form')
  const icon = document.querySelector('#add-contact i')
  const btn_add = document.getElementById('add-contact')
  const btn_cancel = document.getElementById('cancel-contact')
  const contact_list = document.getElementById('contact-list')

  //Form variables
  const first_name = document.getElementById('first_name')
  const last_name = document.getElementById('last_name')
  const email = document.getElementById('email')
  const address = document.getElementById('address')
  const city = document.getElementById('city')
  const phone = document.getElementById('phone')

  // JSON Contact Array
  const contactDOM = []

  /**
   * CREATE Contact *************************************************************************************
   */
  btn_add.addEventListener('click', () => {
    if (form.classList.contains('d-none') && form.classList.contains('add-contact-form')) {
      showFormView()
    }
    else {
      if (validateForm()) {
        validate_form.classList.add('d-none')

        contactDOM.push({
          first_name: first_name.value,
          last_name: last_name.value,
          email: email.value,
          city: city.value,
          address: address.value,
          phone: phone.value
        })

        const position = contactDOM.length - 1
        createContact(first_name.value, last_name.value, email.value, city.value, address.value, phone.value, position)
        hideFormView()
      } else {
        validate_form.classList.remove('d-none')
      }
    }
  })

  /**
   * Cancel Contact *************************************************************************************
   */
  btn_cancel.addEventListener('click', () => {
    hideFormView()
  })

  /**
   * Validate Form Field ********************************************************************************
   */
  const validateForm = () => {
    let _return = 0
    document.querySelectorAll('input.form-control').forEach((value) => {
      if (value.value !== '') {
        _return += 1
      }
    })

    return (_return === 6)
  }

  /**
   * Animate btn ****************************************************************************************
   */
  const showFormView = () => {
    form.classList.remove('d-none')
    form.classList.add('d-block')
    icon.classList.remove('fa-plus')
    icon.classList.add('fa-check')
    btn_add.classList.remove('btn-primary')
    btn_add.classList.add('btn-success')
    btn_cancel.classList.remove('d-none')
    contact_list.classList.add('d-none')
  }

  const hideFormView = () => {
    form.classList.remove('d-block')
    form.classList.add('d-none')
    form.classList.remove('update-contact')
    form.classList.add('add-contact-form')
    icon.classList.remove('fa-check')
    icon.classList.add('fa-plus')
    btn_add.classList.remove('btn-success')
    btn_add.classList.add('btn-primary')
    btn_cancel.classList.add('d-none')
    contact_list.classList.remove('d-none')
    validate_form.classList.add('d-none')
  }

  /**
   * Function Create Contact ***************************************************************************
   */
  const createContact = (first_name, last_name, email, city, address, phone, position) => {
    const markup = '<div class="col-md-6 mt-3">' +
      '<div class="card shadow">' +
      '<div class="card-body">' +
      '<h5 class="card-title font-weight-bold text-center name">' + first_name + ' ' + last_name + '</h5>' +
      '<h6 class="card-subtitle mb-3 text-muted text-center font-weight-bold"><i class="fas fa-phone"></i> ' + phone + '</h6>' +
      '<h6 class="card-subtitle mb-2 text-primary text-center font-weight-bold"><i class="fas fa-envelope-open-text"></i> ' + email + '</h6>' +
      '<h6 class="card-subtitle mb-2 text-muted text-center font-weight-bold "><i class="fas fa-map-marker-alt"></i> ' + city + '</h6>' +
      '<p class="card-text text-center mt-4"><i class="fas fa-map-marked-alt"></i> ' + address + '</p>' +
      '<hr/>' +
      '<a href="#" class="card-link edit-contact font-weight-bold" id="' + position + '"><i class="fas fa-edit"></i> Editar</a>' +
      '<a href="#" class="card-link delete-contact font-weight-bold" id="' + position + '"><i class="fas fa-trash"></i> Eliminar</a>' +
      '</div>' +
      '</div>' +
      '</div>'

    contact_list.innerHTML += markup
    clearForm()
  }

  /**
   * Clear Contact *************************************************************************************
   */
  const clearForm = () => {
    document.querySelectorAll('input.form-control').forEach((value) => {
      value.value = ''
    })
  }

})()

