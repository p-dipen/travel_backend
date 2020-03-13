const insert = (model, dataToInsert) => {
    return new Promise((resolve, reject) => {
        dataToInsert.isDeleted = false;
        dataToInsert.deletedAt = null;
        model.create(dataToInsert).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        });
    });
}

const update = async (model, objectToFind, attributesToUpdate) => {
    return new Promise((resolve, reject) => {
        objectToFind.isDeleted = false;
        attributesToUpdate.isDeleted = false;
        attributesToUpdate.deletedAt = null;
        model.update(attributesToUpdate, { where: objectToFind }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        });
    });
}

const destroy = async (model, objectToFind) => {
    return new Promise((resolve, reject) => {
        model.update({ isDeleted: true, deletedAt: new Date() }, { where: objectToFind }).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        });
    });
}

const get = async (model, options) => {
    return new Promise((resolve, reject) => {
        model.findAll(options).then((res) => {
            resolve(res);
        }).catch((err) => {
            reject(err)
        });
    });
}

module.exports = {
    insert,
    update,
    destroy,
    get
};