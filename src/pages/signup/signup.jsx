import React from 'react'
import axios from 'axios' // pour envoyé les requette de front au back(node.js)
class Userfromul extends React.Component{
        constructor(props) {
            super(props) // super apelle le constuctor
            this.state = {
                email:'',/// ndéfini email + password a intér de handelsubmit
                password:'',// a intérieur de axios.post
            }
}
handelinpchange = (event) => { // name = email+password / value={this.state.email} + {this.state.password}
const {name , value} = event.target //name = [email et  password] défini dans le form au dessous
this.setState({
[name]:value// name = email+password name il devient this.setState t3e {this.state.email}
// password yweli this.setState t3e {this.state.password}
})
}
handelsubmit = (event) => { // j'ai pas ajouté [const] psq rani dayerha b this t3 classs react
  event.preventDefault()
  const {email,password} = this.state
  axios.post('http://localhost:3002/api/users/', {email, password})
  .then(response => { /// il faut le then + catch c trés trés important!!!!!!!
    console.log(response.data);
  })
  .catch(error => {
    console.error('Une erreur s est produite lors de la soumission du formulaire', error);
  });
  this.setState({
  email:'',
  password:'',
  })                                                                        
  } // fin de handelsubmit
render() { // il faut écrire js avant render
return ( /// il faut render de la class avant return 
  <div> {/*f handelsubmit npreventidefault + this.state tweli this.setState*/}
  <p>SignUp</p>
  <form onSubmit={this.handelsubmit}> 
    {/*f handelinpchange on vas targiti name+value tweli this.setState tweli ({[name]:value)} */}
     <h1>Email : </h1> <input type='email' name="email" value={this.state.email} onChange={this.handelinpchange}/>
                                            {/*f handelinpchange ntargiti biha name+value this.setState({[name]:value)}*/}
     <h1> Password :</h1> <input type='password' name='password' value={this.state.password} onChange={this.handelinpchange}/>
     <button type="submit">Submit</button>
  </form>
  </div>
)
}
}
export default Userfromul  