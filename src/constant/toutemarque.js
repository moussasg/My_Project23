import Opp from "./../assets/opp.jpg" // les images
import App from "./../assets/apple.png"
import Rea from "./../assets/rea.png"
import Xi from "./../assets/xi.png" // xiaomi
import Sam from "./../assets/sam.jpg" // samsung
import huita from "./../assets/8a.png" // 
import neufa from "./../assets/9a.jpg"
import treize from "./../assets/13.jpeg"
import qautorze from "./../assets/14.jpg"
import ultra from "./../assets/s21.jpeg"
import ultra2 from "./../assets/S22.jpeg"
import dixa from "../assets/dix10.png"
import renosept from "../assets/reno7.jpg"
export const MesSmartphones = [
    { //////////////
      id: "1",
      image: Xi,
      buttonText: "Our Products Xiaomi",
      produits:[
        {
          marque :"Xioami",
          imgp: huita,
          nom: "8a" ,
          caractér: "caractéristique: Ram : 4gb " ,
          prix : 21000 ,
          ram : "4gb",
          gb:"64gb",
          Ajouté:"Ajouté au panier" , 
        },
        {
          imgp:neufa,
          nom:"9a" ,
          caractér: "caractéristique : Ram : 2gb" ,
          prix : 22000,
          ram : "2gb",
          gb:"32gb",
          Ajouté:"Ajouté au panier",
        },
        {
          imgp:dixa,
          nom:"10a" ,
          caractér: "caractéristique : Ram : 2gb" ,
          prix : 24000,
          ram : "2gb",
          gb:"32gb",
          Ajouté:"Ajouté au panier",
        }
      ]
    }, //////////////
    { //////////////////
      id: "2",
      image: App,
      buttonText: "Our Products Apple",
      produits:[
        {
          marque :"Apple" ,
          imgp: treize ,
          nom:"13" ,
          caractér: "caractéristique : Ram : 6gb" ,
          prix : 220000 ,
          ram : "6gb",
          gb:"32gb",
          Ajouté:"Ajouté au panier",
        },
        {
          imgp: qautorze ,
          nom:"14" ,
          caractér: "caractéristique : Ram : 4gb" ,
          prix : 330000 ,
          ram : "4gb",
          gb:"64gb",
          Ajouté:"Ajouté au panier",

        }
      ]
    },
    ///////////////////
    {
      id: "3",
      image: Sam,
      buttonText: "Our Products Samsung",
      produits:[
        {
          marque :"Smasung",
          imgp: ultra , 
          nom:"s21" ,
          caractér: "caractéristique : Ram : 8gb" ,
          prix : 220000 ,
          ram : "8gb",
          gb:"128gb",
          Ajouté:"Ajouté au panier",

        },
        {
          imgp:ultra2, 
          nom:"s22" ,
          caractér: "caractéristique : Ram : 12gb" ,
          prix : 220000,
          ram : "12gb",
          gb:"256gb",
          Ajouté:"Ajouté au panier",
        }
      ]
    },
    ////////////////////
    {
      id: "4",
      image: Rea,
      buttonText: "Our Products Realme",
      produits:[
        {
          marque :"Realme" ,
          imgp: huita,
          Ajouté:"Ajouté au panier",

        }, // renosept
        {
          imgp: huita,
          Ajouté:"Ajouté au panier",
        },{
          imgp: renosept,
          Ajouté:"Ajouté au panier",
        }
      ]
    },
    /////////////////////
    {
      id: "5",
      image: Opp,
      buttonText: "Our Products Oppo",
      produits: [
        {
          marque :"Oppo" ,
          imgp: huita,
          gb:"256gb",
          Ajouté:"Ajouté au panier" ,

        },
        {
          imgp: huita,
          Ajouté:"Ajouté au panier",

        }
      ]
    }
    /////////////
  ];
export default MesSmartphones

