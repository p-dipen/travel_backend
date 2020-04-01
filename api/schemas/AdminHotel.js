const adminHotelSchemas = {
    saveProperty: {
        validator: {
            'name': 'required|string',
            'member_name': 'required|string',
            'addressLine1': 'required|string',
            'addressLine2': 'string',
            'country': 'required|string|string',
            'city': 'required|string',
            'province': 'required|string',
            'pincode': 'required|string',
            'timezone': 'required|string',
            'telephone_num': 'phoneNumber|string',
            'contact_num': 'phoneNumber|string',
            'email': 'email',
            'contact_person_name': 'required|string',
            'website_link': 'url|string',
            'communication_address': 'boolean',
            'images': 'base64',
            'contactDetail': 'required|array',
            'contactDetail.*.id': 'string',
            'contactDetail.*.firstname': 'required|string',
            'contactDetail.*.lastname': 'required|string',
            'contactDetail.*.email': 'email',
            'contactDetail.*.mobile_num': 'string',
            'contactDetail.*.telephone_num': 'string',
            'contactDetail.*.fax_num': 'string',
            'contactDetail.*.website_link': 'string'
        }
    },
    saveFacilities: {
        validator: {
            'facilities': 'required|array',
            'facilities.*': 'string'
        }
    }
}

module.exports = adminHotelSchemas;