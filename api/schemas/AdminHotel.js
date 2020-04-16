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
            'facilities.*.facilityId': 'required|integer',
            'facilities.*.description': 'string',
        }
    },
    saveRoom: {
        validator: {
            'name': 'required|string',
            'description': 'string',
            'room_type': 'required|integer',
            'total_room': 'required|integer',
            'max_capacity': 'required|integer',
            'total_bedroom_per_unit': 'required|integer',
            'max_child': 'required|integer',
            'max_adult': 'required|integer',
            'max_infant': 'required|integer',
            'buffer_room': 'required|integer',
            'available_room': 'required|integer',
            'images': 'array',
            'images.*': 'base64',

            'bedding': 'required|array',
            'bedding.*.bedding_config': 'integer',
            'bedding.*.bedding_type': 'string',

            'inclusions': 'required|array',
            'inclusions.*': 'string',

            'facilities': 'required|array',
            'facilities.*': 'string'
        }
    },
    saveRoomRates: {
        validator: {
            "date_from": "required|date",
            "date_to": "required|date",
            "commission_type": "required|string",
            "commission_weekday": "required|integer",
            "commission_weekend": "required|integer",
            "net_rate_weekday": "required|integer",
            "net_rate_weekend": "required|integer",
            "cost_rate_weekday": "required|integer",
            "cost_rate_weekend": "required|integer",
            "no_of_adult": "required|integer",
            "no_of_child": "required|integer",
            "no_of_infant": "required|integer",
            "customize_net_rate_weekday": "required|integer",
            "customize_net_rate_weekend": "required|integer",
            "customize_cost_rate_weekday": "required|integer",
            "customize_cost_rate_weekend": "required|integer",
            "extra_adult_weekday": "required|integer",
            "extra_adult_weekend": "required|integer",
            "extra_child_weekday": "required|integer",
            "extra_child_weekend": "required|integer",
            "extra_infant_weekday": "required|integer",
            "extra_infant_weekend": "required|integer",
            "allocation_weekday": "required|integer",
            "allocation_weekend": "required|integer",
            "min_stay": "required|integer",
            "max_room_per_booking": "required|integer",
            "notification_after_units": "required|integer",
            "cut_of_day": "required|integer"
        }
    }
}

module.exports = adminHotelSchemas;