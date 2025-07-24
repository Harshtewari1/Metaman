import { createContext, useContext, useState } from "react";
import alphaImg from "../assets/ProductImage/alpha.jpg";
import alpha2Img from "../assets/ProductImage/alpha_2.jpg";
import alpha3 from "../assets/ProductImage/alpha1.png";
import alpha4 from "../assets/ProductImage/alpha3.jpg";

import sportsImg from "../assets/ProductImage/sports.jpg";
import sports2Img from "../assets/ProductImage/sports_2.jpg";
import sports3 from "../assets/ProductImage/sports_4.jpg";
import sports4 from "../assets/ProductImage/sport_3.jpg";

import nightImg from "../assets/ProductImage/night.jpg";
import night3 from "../assets/ProductImage/night_3.jpg";
import night2Img from "../assets/ProductImage/night_2.jpg";
import night4 from "../assets/ProductImage/night.png";

import dayImg from "../assets/ProductImage/day.jpg";
import day2Img from "../assets/ProductImage/day_2.jpg";
import day3 from "../assets/ProductImage/day_3.jpg";
import day4 from "../assets/ProductImage/day.png";

import dateImg from "../assets/ProductImage/date.jpg";
import date3 from "../assets/ProductImage/date_2.png";
import date2Img from "../assets/ProductImage/date_2.jpg";
// PNG imports
import alphaPng from "../assets/ProductImage/alpha.png";
import sportsPng from "../assets/ProductImage/sports.png";
import nightPng from "../assets/ProductImage/night.png";
import dayPng from "../assets/ProductImage/day.png";
import date2Png from "../assets/ProductImage/date_2.png";
import PRA from "../assets/ProductImage/PRA_0668.jpg";
import PRA2 from "../assets/FeatureImage/f2.jpg";
import f1 from "../assets/FeatureImage/f1.png";
import f3 from "../assets/FeatureImage/f3.png";
import f4 from "../assets/FeatureImage/f4.png";
import f5 from "../assets/FeatureImage/f5.png";




const GlobalContext = createContext();

export const GlobalProvider = ({ children }) => {
    const [cart, setCart] = useState([]);
    const [menuOpen, setMenuOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);
    const [name,setName] = useState("")
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const products = [
        {
            id: 1,
            name: "Oud Noir",
            images:[alphaImg,alpha2Img,alpha3,alpha4],
            image1: alphaImg,
            pngImage: alphaPng,
            price: 2999,
            description:
                "Ha1o Alpha by Metaman is the ultimate embodiment of strength and sophistication. This luxurious fragrance captures the essence of a modern alpha male, housed in an elegant glass bottle that exudes masculinity and style.",
            link: "#"
        },
        {
            id: 2,
            name: "Sports Edition",
            images: [sportsImg, sports2Img, sports3, sports4 , f1],
            image1: sportsImg,
            pngImage: sportsPng,
            price: 2999,
            description:
                "Ha1o Sports by Metaman is the embodiment of energy and freshness. This invigorating fragrance captures the essence of athleticism and dynamism, housed in a sleek glass bottle that exudes vitality and style.",
            link: "#"
        },
        {
            id: 3,
            name: "Night Storm",
            images: [nightImg, night2Img, night3, f5, night4 ],
            image1: nightImg,
            pngImage: nightPng,
            price: 2999,
            description: 'Ha1o Party by Metaman is the ultimate fragrance for the life of the Night.This energetic scent captures the essence of celebration and spontaneity, housed in an eye- catching glass bottle that exudes fun and excitement.',
            link: "#"
        },
        {
            id: 4,
            name: "Day Fresh",
            images: [dayImg, day2Img, day3, day4 ,f4],
            image1: dayImg,
            image2: day2Img,
            image3: day3,
            image4: day4,
            pngImage: dayPng,
            price: 2999,
            description:
                "Ha1o Day by Metaman is the quintessential fragrance for the modern professional. This sophisticated scent captures the essence of ambition and elegance, housed in a sleek glass bottle that exudes confidence and style.",
            link: "#"
        },
        {
            id: 5,
            name: "Date Special",
            images: [dateImg, date2Img, date3, f3],
            image1: dateImg,
            pngImage: date2Png,
            price: 2999,
            description:
                "Ha1o Date by Metaman is the epitome of passion and allure. This captivating fragrance embodies the essence of romantic evenings and unforgettable moments, housed in an elegant glass bottle that exudes charm and sophistication.",
            link: "#"
        },
        {
            id: 6,
            name: "Special",
            name2: "Trial Pack (Bundle of 5)",
            images: [PRA, PRA2],
            image1: PRA2,
            pngImage: PRA,
            price: 2999,
            description:
                "Ha1o Special by Metaman is the epitome of passion and allure. This captivating fragrance embodies the essence of romantic evenings and unforgettable moments, housed in an elegant glass bottle that exudes charm. ",
            link: "#"
        },
    ];


    return (
        <GlobalContext.Provider value={{ cart, setCart, menuOpen, setMenuOpen, products, selectedProduct, setSelectedProduct, name , setName, email, setEmail, password, setPassword }}>
            {children}
        </GlobalContext.Provider>
    );
};

export const useGlobal = () => useContext(GlobalContext);
