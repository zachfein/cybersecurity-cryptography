const bcrypt = require('bcryptjs')
const users = []

module.exports = {
    login: (req, res) => {
      console.log('Logging In User')
      console.log(req.body)
      const { username, password } = req.body
      for (let i = 0; i < users.length; i++) {
        const existingPw = bcrypt.compareSync(password, users[i].pwHash)
        if (users[i].username === username && existingPw) {
          let existingSecuredPw = {...users[i]}
          delete existingSecuredPw.pwHash

          return res.status(200).send(existingSecuredPw)
        }
      }
      res.status(400).send("User not found.")
    },
    register: (req, res) => {
        const {password, email, firstName, lastName, username} = req.body

        const salt = bcrypt.genSaltSync(5)
        const pwHash = bcrypt.hashSync(password, salt)

        // console.log('password = ' + password)
        // console.log('salt = ' + salt)
        // console.log('pwhash = ' + pwHash)

        const user = {
          pwHash,
          email: email,
          firstName: firstName,
          lastName: lastName,
          username: username
        }
        
        users.push(user)
        
        console.log(`users are ${users[0]}`)

        console.log('Registering User')
        console.log(req.body)
        users.push(req.body)
        res.status(200).send(req.body)
    }
}