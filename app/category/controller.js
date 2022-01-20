const Category = require('./model')

module.exports={
    index : async (req, res)=>{
        try {
            // panggil fungsi alert
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus}
            // tampilkan data
            const category = await Category.find()

            res.render('admin/category/view_category',{
                category,
                alert,
                name: req.session.user.name,
                title: 'Halaman Kategory'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },

    viewCreate : async (req, res)=>{
        try {
            res.render('admin/category/create',{
                name: req.session.user.name,
                title: 'Halaman Tambah Kategory'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },

    actionCreate : async (req, res)=>{
        try {
            const { name } = req.body
            
            let category = await Category({ name })
            await category.save()

            req.flash('alertMessage', "Data Kategory Berhasil Di Tambahkan")
            req.flash('alertStatus', `primary`)

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alerStatus', `denger`)
            res.redirect('/category')
        }
    },

    viewEdit : async (req, res)=>{
        try {
            const { id } = req.params

            const category = await Category.findOne({ _id : id })

            res.render('admin/category/edit', {
                category,
                name: req.session.user.name,
                title: 'Halaman Kategory'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertFlash', `danger`)
            res.redirect('/category')
        }
    },

    actionEdit : async (req, res)=>{
        try {
            const { id } = req.params
            const { name } = req.body
            
            const category = await Category.findByIdAndUpdate({
                _id: id
            }, {name});

            req.flash('alertMessage', "Berhasil Ubah Data Kategory")
            req.flash('alertStatus', `success`)

            res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    },

    actionDelete : async (req, res)=>{
        try {
        
        const { id } = req.params

        const category = await Category.findOneAndRemove({
            _id : id
        })

        req.flash('alertMessage', "Data Kategory Berhasil Dihapus")
        req.flash('alertStatus', `danger`)
         res.redirect('/category')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/category')
        }
    }
}