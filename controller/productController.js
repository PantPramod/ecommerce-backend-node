const asyncHandler = require('express-async-handler')
const product = require('../model/product')
const orderItem = require('../model/orderItem')
const storage = require('../firebase/config')
const { ref, getDownloadURL, uploadBytes } = require("firebase/storage");
const { getStorage, deleteObject } = require("firebase/storage");

const createProduct = asyncHandler(async (req, res) => {

    const { title, price, description, stock, discount } = req.body
    if (!title && !price && !description && !stock && !discount) {
        res.status(400)
        throw new Error('please fill all the fields ')
    }
    const images = []
    for (f in req.files) {
        const file = req.files[f];
        const timeStamp = Date.now();
        const nt = file.originalname.split(".");
        const name = nt[0];
        const type = nt[1];

        const filename = name + "_" + timeStamp + "." + type;
        const imageRef = ref(storage, "/" + filename);
        const metaData = {
            contentType: file.mimetype
        }

        try {
            const snapshot = await uploadBytes(imageRef, file.buffer, metaData);
            const url = await getDownloadURL(snapshot.ref);
            images.push(url);
        } catch (e) {
            res.status(400).send({
                error: e
            })
        };

    }

    const newProduct = await product.create({
        title,
        price,
        description,
        images,
        stock,
        ...(discount && { discount })
    })
    res.send(newProduct)
})

const getProducts = asyncHandler(async (req, res) => {
    const allProducts = await product.find({});
    res.send(allProducts)
})

const getProductById = asyncHandler(async (req, res) => {
    const deatiledProduct = await product.findById(req.params.id)
    res.send(deatiledProduct)
})

const deleteProduct = asyncHandler(async (req, res) => {
    const del = await product.findOneAndDelete(req.params.id)
    res.send(del)
})

const updateProduct = asyncHandler(async (req, res) => {
    const { id, title, description, price, discount, stock } = req.body
    const resp = await product.findByIdAndUpdate(id, { title, description, price, stock, discount }, {
        returnOriginal: false
    })
    res.send(resp)
})

const deleteImage = asyncHandler(async (req, res) => {
    const desertRef = ref(storage, req.params.id);
    await deleteObject(desertRef)
    res.status(200).send("File deleted successfully")
})


const getDiscountItems = asyncHandler(async (req, res) => {
    const moreDiscountItems = await product.find({
        "discount": { $gt: 5 }
    })
    res.send(moreDiscountItems)
})


const bestSeller = asyncHandler(async (req, res) => {
    const bS = await orderItem.aggregate([
        {
            $group: {
                _id: '$productId',
                totalQuantity: { $sum: '$quantity' },
            },
        },
        {
            $sort: { totalQuantity: -1 },
        },
        {
            $limit: 10,
        },
        {
            $lookup: {
                from: 'products',
                localField: '_id',
                foreignField: '_id',
                as: 'productDetails',
            },
        },
        {
            $unwind: '$productDetails',
        },
        {
            $project: {
                _id: '$productDetails._id',
                title: '$productDetails.title',
                price: '$productDetails.price',
                images: '$productDetails.images',
                description: '$productDetails.description'
            },
        },
    ])
    res.send(bS)
})

const getAllCategories=asyncHandler(async(req, res)=>{
  const categories =await product.distinct('category')
  res.send(categories)   
})


module.exports = {
    createProduct,
    getProducts,
    getProductById,
    updateProduct,
    deleteProduct,
    deleteImage,
    bestSeller,
    getDiscountItems,
    getAllCategories
}