const Nominal = require('./model')

module.exports={
    index : async (req, res)=>{
        try {
            // panggil fungsi alert
            const alertMessage = req.flash("alertMessage")
            const alertStatus = req.flash("alertStatus")

            const alert = { message: alertMessage, status: alertStatus}
            // tampilkan data
            const nominal = await Nominal.find()

            res.render('admin/nominal/view_nominal',{
                nominal,
                alert,
                name: req.session.user.name,
                title: 'Halaman Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/nominal')
        }
    },

    viewCreate : async (req, res)=>{
        try {
            res.render('admin/nominal/create',{
                name: req.session.user.name,
                title: 'Halaman Tambah Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/nominal')
        }
    },

    actionCreate : async (req, res)=>{
        try {
            const { coinQuantity, coinName, price } = req.body
            
            let nominal = await Nominal({ coinQuantity, coinName, price })
            await nominal.save()

            req.flash('alertMessage', "Data Nominal Berhasil Di Tambahkan")
            req.flash('alertStatus', `primary`)

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alerStatus', `denger`)
            res.redirect('/nominal')
        }
    },

    viewEdit : async (req, res)=>{
        try {
            const { id } = req.params

            const nominal = await Nominal.findOne({ _id : id })

            res.render('admin/nominal/edit', {
                nominal,
                name: req.session.user.name,
                title: 'Halaman Ubah Nominal'
            })
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertFlash', `danger`)
            res.redirect('/nominal')
        }
    },

    actionEdit : async (req, res)=>{
        try {
            const { id } = req.params
            const { coinQuantity, coinName, price } = req.body
            
            const nominal = await Nominal.findByIdAndUpdate({
                _id: id
            }, { coinQuantity, coinName, price});

            req.flash('alertMessage', "Berhasil Ubah Data Nominal")
            req.flash('alertStatus', `success`)

            res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/nominal')
        }
    },

    actionDelete : async (req, res)=>{
        try {
        
        const { id } = req.params

        const nominal = await Nominal.findOneAndRemove({
            _id : id
        })

        req.flash('alertMessage', "Data Nominal Berhasil Dihapus")
        req.flash('alertStatus', `danger`)
         res.redirect('/nominal')
        } catch (error) {
            req.flash('alertMessage', `${error.message}`)
            req.flash('alertStatus', `danger`)
            res.redirect('/nominal')
        }
    }
}