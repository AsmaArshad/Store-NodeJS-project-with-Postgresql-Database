const db = require('../generics/db/db.js')

exports.login = async (req, page_res) => {
    if (req.session.already_logged === 'true') {    
        page_res.redirect('/SetUp')      
    }
    else {
        console.log('Controller: Login Page Loaded');
        page_res.render('login', {
            title: req.session.already_logged
        })
    }
}


exports.login.auth = async (req, page_res) => {
    const { email, password } = req.body
    const filter = { Email: email, Password: password }
    await db.select('Email', 'Password').from('users').where(filter).then(async (res) => {
        if (res.length > 0) {
            req.session.already_logged = 'true'        
                page_res.send('<script>alert("User Login Successfully!");window.location.href = "/SetUp" </script>')
        }
        else page_res.render('login', {
            message: 'Wrong email or password'
        })
    })
    .catch(err => {
        page_res.render('login', { message: err.message })
    })
}



exports.logout = (req, res) => {
    req.session.already_logged = 'false';
    res.redirect('/')
}