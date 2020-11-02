const CountrySchemas = {
    save: {
        validator: {
            'name': 'required|string'
        }
    }
}

const TimezoneSchemas = {
    save: {
        validator: {
            'timezone': 'required|regex:[+-][0-9]{2}:[0-9]{2}\b'
        }
    }
}

const ProvinceSchemas = {
    save: {
        validator: {
            'name': 'required|string'
        }
    }
}

const BeddingTypeSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

const InclusionsSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

const MealTypeSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}


const PolicyTypeSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}


const PromotionTypeSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}


const PropertyFacilitiesSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

const RoomFacilitiesSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

const RoomTypeSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

const ServiceSchemas = {
    save: {
        validator: {
            'name': 'required|string',
            'description': 'string',
        }
    }
}

module.exports = {
    CountrySchemas,
    TimezoneSchemas,
    ProvinceSchemas,
    BeddingTypeSchemas,
    InclusionsSchemas,
    MealTypeSchemas,
    PolicyTypeSchemas,
    PromotionTypeSchemas,
    PropertyFacilitiesSchemas,
    RoomFacilitiesSchemas,
    RoomTypeSchemas,
    ServiceSchemas
};