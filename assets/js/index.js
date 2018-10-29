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
  const contacts_uri = 'https://raw.githubusercontent.com/sotf-dev/web-app/dev/assets/contacts.json'
  const contactDOM = []
  let contactId

  /**
   * CREATE Contact *************************************************************************************
   */
  btn_add.addEventListener('click', () => {
    if (form.classList.contains('d-none') && form.classList.contains('add-contact-form') || form.classList.contains('d-none') && form.classList.contains('update-contact')) {
      showFormView()
    }
    else if (form.classList.contains('update-contact') ) {
      if (validateForm()) {
        validate_form.classList.add('d-none')

        contactDOM[contactId].first_name = first_name.value
        contactDOM[contactId].last_name = last_name.value
        contactDOM[contactId].email = email.value
        contactDOM[contactId].city = city.value
        contactDOM[contactId].address = address.value
        contactDOM[contactId].phone =phone.value
        contact_list.innerHTML = ''

        for (let i = 0; i < contactDOM.length; i++) {
          createContact(
            contactDOM[i].first_name,
            contactDOM[i].last_name,
            contactDOM[i].email,
            contactDOM[i].city,
            contactDOM[i].address,
            contactDOM[i].phone,
            i
          )
        }

        hideFormView()
        clearForm()
        query_update()
        query_delete()
      } else {
        validate_form.classList.remove('d-none')
      }
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
        query_update()
        query_delete()
      } else {
        validate_form.classList.remove('d-none')
      }
    }
  })

  /**
   * GET Contacts *************************************************************************************
   */
  window.fetch(`${ contacts_uri }`, {method: 'GET', mode: 'cors'})
    .then(response => response.json())
    .then((json) => {
      for (let i = 0; i < json.length; i++) {
        arrayAddContacts(
          json[i].first_name,
          json[i].last_name,
          json[i].email,
          json[i].city,
          json[i].address,
          json[i].phone,
          i
        )
      }
    })

  /**
   * UPDATE Contact *************************************************************************************
   */
  const query_update = () => {
    let time_update = setInterval(() => {
      const btn_update = document.querySelectorAll('a.edit-contact')
      if (btn_update.length) {
        btn_update.forEach((value) => {
          value.addEventListener('click', (e) => {
            form.classList.remove('add-contact-form')
            form.classList.add('update-contact')
            contactId = e.target.id

            first_name.value = contactDOM[contactId].first_name
            last_name.value = contactDOM[contactId].last_name
            email.value = contactDOM[contactId].email
            city.value = contactDOM[contactId].city
            address.value = contactDOM[contactId].address
            phone.value = contactDOM[contactId].phone
            showFormView()
          })
        })
        clearInterval(time_update)
      }
    }, 1000)
  }
  query_update()

  /**
   * DELETE Contact *************************************************************************************
   */
  const query_delete = () => {
    let time_delete = setInterval(() => {
      const btn_delete = document.querySelectorAll('a.delete-contact')
      if (btn_delete.length) {
        btn_delete.forEach((value) => {
          value.addEventListener('click', (e) => {
            contactDOM.splice(e.target.id, 1)
            contact_list.innerHTML = ''

            for (let i = 0; i < contactDOM.length; i++) {
              createContact(
                contactDOM[i].first_name,
                contactDOM[i].last_name,
                contactDOM[i].email,
                contactDOM[i].city,
                contactDOM[i].address,
                contactDOM[i].phone,
                i
              )
            }

            query_update()
            query_delete()
          })
        })
        clearInterval(time_delete)
      }
    }, 1000)
  }
  query_delete()

  /**
   * Array Push Contacts *************************************************************************************
   */
  const arrayAddContacts = (first_name, last_name, email, city, address, phone, position) => {
    contactDOM.push({
      first_name: first_name,
      last_name: last_name,
      email: email,
      city: city,
      address: address,
      phone: phone
    })

    createContact(first_name, last_name, email, city, address, phone, position)
  }

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

