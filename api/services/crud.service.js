const { Validator } = require('node-input-validator');

const validate = (reqBody, schemas) => {
    return new Promise((resolve, reject) => {
        const niv = require('node-input-validator');
        const v = new Validator(reqBody, schemas.validator);
        niv.niceNames(schemas.niceNames || {});
        v.check().then((matched) => {
            if (!matched) {
                reject(v.errors);
            } else {
                resolve(reqBody)
            }
        });
    });
}

const insert = (model, dataToInsert) => {
    return new Promise((resolve, reject) => {
        dataToInsert.isDeleted = false;
        dataToInsert.deletedAt = null;
        model.create(dataToInsert).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

const update = async (model, objectToFind, attributesToUpdate, checkNonDeletedDataOnly = true) => {
    return new Promise((resolve, reject) => {
        if (checkNonDeletedDataOnly) {
            objectToFind.isDeleted = false;
        }
        attributesToUpdate.isDeleted = false;
        attributesToUpdate.deletedAt = null;
        model.update(attributesToUpdate, { where: objectToFind }).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

const destroy = async (model, objectToFind) => {
    return new Promise((resolve, reject) => {
        model.update({ isDeleted: true, deletedAt: new Date() }, { where: objectToFind }).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

const destroyHard = async (model, objectToFind) => {
    return new Promise((resolve, reject) => {
        model.destroy({ where: objectToFind }).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

const get = async (model, options) => {
    return new Promise((resolve, reject) => {
        model.findAll(options).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

const getOne = async (model, options) => {
    return new Promise((resolve, reject) => {
        model.findOne(options).then((res) => {
            resolve(JSON.parse(JSON.stringify(res)));
        }).catch((err) => {
            reject(err)
        });
    });
}

module.exports = {
    validate,
    insert,
    update,
    destroy,
    destroyHard,
    get,
    getOne
};