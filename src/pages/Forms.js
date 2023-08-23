import React, { Component, useState, useEffect } from "react";
// import logo from "./logo.svg";
import Data from "./Data.js";
import Data2 from "./datacrops.js";
import { useGlobalContext } from "./context.js";
import Loading from "./Loading.js";
import axios from "axios";
import "./form.css";

// import './App.css';

function Forms({
  form,
  setForm,
  Submit,
  options,
  setOptions,
  showOptions,
  setShowOptions,
}) {
  const [value, setValue] = useState(null);
  const { req, setReq } = useGlobalContext();
  const { polygon_id } = useGlobalContext();
  const { goptions, setOptions2 } = useGlobalContext();
  const [loading, setLoading] = useState(0);
  const { name, email } = useGlobalContext();
  const [par1, setPar1] = useState('Andaman and Nicobar Islands')
  const [par2, setPar2] = useState('Kharif')
  const [par3, setPar3] = useState('Arecanut')
  const [par4, setPar4] = useState(0)
  const [production, setProduction] = useState(0)
  const [show, setShow] = useState(0)
  const states = ['Andaman and Nicobar Islands', 'Andhra Pradesh',
    'Arunachal Pradesh', 'Assam', 'Bihar', 'Chandigarh',
    'Chhattisgarh', 'Dadra and Nagar Haveli', 'Goa', 'Gujarat',
    'Haryana', 'Himachal Pradesh', 'Jammu and Kashmir ', 'Jharkhand',
    'Karnataka', 'Kerala', 'Madhya Pradesh', 'Maharashtra', 'Manipur',
    'Meghalaya', 'Mizoram', 'Nagaland', 'Odisha', 'Puducherry',
    'Punjab', 'Rajasthan', 'Sikkim', 'Tamil Nadu', 'Telangana ',
    'Tripura', 'Uttar Pradesh', 'Uttarakhand', 'West Bengal']
  const seasons = ['Kharif     ', 'Whole Year ', 'Autumn     ', 'Rabi       ',
    'Summer     ', 'Winter     ']
  const crops = ['Arecanut', 'Other Kharif pulses', 'Rice', 'Banana', 'Cashewnut',
    'Coconut ', 'Dry ginger', 'Sugarcane', 'Sweet potato', 'Tapioca',
    'Black pepper', 'Dry chillies', 'other oilseeds', 'Turmeric',
    'Maize', 'Moong(Green Gram)', 'Urad', 'Arhar/Tur', 'Groundnut',
    'Sunflower', 'Bajra', 'Castor seed', 'Cotton(lint)', 'Horse-gram',
    'Jowar', 'Korra', 'Ragi', 'Tobacco', 'Gram', 'Wheat', 'Masoor',
    'Sesamum', 'Linseed', 'Safflower', 'Onion', 'other misc. pulses',
    'Samai', 'Small millets', 'Coriander', 'Potato',
    'Other  Rabi pulses', 'Soyabean', 'Beans & Mutter(Vegetable)',
    'Bhindi', 'Brinjal', 'Citrus Fruit', 'Cucumber', 'Grapes', 'Mango',
    'Orange', 'other fibres', 'Other Fresh Fruits', 'Other Vegetables',
    'Papaya', 'Pome Fruit', 'Tomato', 'Rapeseed &Mustard', 'Mesta',
    'Cowpea(Lobia)', 'Lemon', 'Pome Granet', 'Sapota', 'Cabbage',
    'Peas  (vegetable)', 'Niger seed', 'Bottle Gourd', 'Sannhamp',
    'Varagu', 'Garlic', 'Ginger', 'Oilseeds total', 'Pulses total',
    'Jute', 'Peas & beans (Pulses)', 'Blackgram', 'Paddy', 'Pineapple',
    'Barley', 'Khesari', 'Guar seed', 'Moth',
    'Other Cereals & Millets', 'Cond-spcs other', 'Turnip', 'Carrot',
    'Redish', 'Arcanut (Processed)', 'Atcanut (Raw)',
    'Cashewnut Processed', 'Cashewnut Raw', 'Cardamom', 'Rubber',
    'Bitter Gourd', 'Drum Stick', 'Jack Fruit', 'Snak Guard',
    'Pump Kin', 'Tea', 'Coffee', 'Cauliflower', 'Other Citrus Fruit',
    'Water Melon', 'Total foodgrain', 'Kapas', 'Colocosia', 'Lentil',
    'Bean', 'Jobster', 'Perilla', 'Rajmash Kholar',
    'Ricebean (nagadal)', 'Ash Gourd', 'Beet Root', 'Lab-Lab',
    'Ribed Guard', 'Yam', 'Apple', 'Peach', 'Pear', 'Plums', 'Litchi',
    'Ber', 'Other Dry Fruit', 'Jute & mesta']
  const submitHandler = async () => {
    setLoading(1)
    let s1 = `https://agromlapi.onrender.com/`;
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
    }
    const requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
      },
    };
    let first = par1.replaceAll(" ", "")
    let second = par2.replaceAll(" ", "")
    let third = par3.replaceAll(" ", "")
    let fourth = par4.replaceAll(" ", "")
    console.log("this is it", first, second, third, fourth)
    const val = JSON.stringify({
      season: second,
      state: first,
      crop: third,
      area: fourth
    });

    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      setLoading(false);
      setProduction(d.data[0])
      setShow(1)
    } catch (err) {
      console.log(err);
      setLoading(false);
      setShow(1)
    }
  }
  const fetchData = async () => {
    setLoading(1);
    let s1 = `${process.env.REACT_APP_BACKEND}/user/crops`;
    const loggedInUser = localStorage.getItem("user");
    var accesstoken;
    if (loggedInUser) {
      const foundUser = JSON.parse(loggedInUser);
      accesstoken = foundUser.token;
    }
    const requestOptions = {
      method: "post",
      url: s1,
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accesstoken}`,
      },
    };
    console.log(options);
    const val = JSON.stringify({
      name: name,
      email: email,
      crops: options,
    });
    // console.log(val);
    setShowOptions(options);
    try {
      const d = await axios.post(s1, val, requestOptions);
      console.log(d);
      // setShow
      setLoading(false);
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  useEffect(() => {

  }, []);

  if (loading) {
    return <Loading />;
  }
  if (form == 0 && show == 0) {
    return (
      <div className="temp">
        <form>
          <label htmlFor="h1"> Fill the form to estimate your crop production </label>
          {/* <input type="text" id="h1" /> */}

          <label> Where do you live?</label>
          <select onChange={(e) => setPar1(e.target.value)}>
            {states.map((curr_val, curr_idx, curr_arr) => {
              return <option> {curr_val} </option>
            })}
          </select>
          <label> What season do you want to predict for?</label>
          <select onChange={(e) => setPar2(e.target.value)}>
            {seasons.map((curr_val, curr_idx, curr_arr) => {
              return <option> {curr_val} </option>
            })}
          </select>
          <label> What crop do you wish to predict for?</label>
          <select onChange={(e) => setPar3(e.target.value)}>
            {crops.map((curr_val, curr_idx, curr_arr) => {
              return <option> {curr_val} </option>
            })}
          </select>
          <label> Area of cultivation?</label>
          <input type='text' onChange={(e) => setPar4(e.target.value)} />

          <br></br>
        </form>

        <div className="selected">
          {options.map((curr_val, curr_idx, arr) => {
            return (
              <div className="spacing">
                <div className="new">{curr_val} </div>
                <button
                  className="del "
                  onClick={() => {
                    // console.log(curr_idx);
                    let h = options.filter((curr_val, curr_idx2, arr) => {
                      return curr_idx2 != curr_idx;
                    });
                    // console.log(h);
                    setOptions(h);
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              submitHandler();
              // setReq(1);
            }}
          />
        </div>


      </div>
    );
  }
  else if (form == 0 && show == 1) {
    return (<div className="temp">
      {production} in tonnes/hectare</div>)
  }
  else if (form == 1) {
    return (
      <div className="temp">
        <form>
          <label htmlFor="h1"> What type of crop do you wish to grow? </label>
          {/* <input type="text" id="h1" /> */}
          <select
            onChange={(e) => {
              let value = e.target.value;
              e.target.value = "";
              if (value === null) return;
              console.log("Changed");
              let h = options.find((val) => {
                if (val === value) {
                  return val;
                }
              });
              console.log(h);
              if (h) {
                return;
              } else {
                setOptions([...options, value]);
              }
            }}
          >
            <option hidden disable selected value></option>
            {Data2.map((curr_val, curr_idx, arr) => {
              let h = options.find((curr_val2, curr_idx, arr) => {
                return curr_val2 === curr_val.name;
              });
              // console.log(h);
              return (
                <option disabled={h ? 1 : 0}>
                  {" "}
                  {curr_val.name} {h ? "✔" : " "}{" "}
                </option>
              );
            })}
          </select>
          <br></br>
        </form>

        <div className="selected">
          {options.map((curr_val, curr_idx, arr) => {
            return (
              <div className="spacing">
                <div className="new">{curr_val} </div>
                <button
                  className="del "
                  onClick={() => {
                    console.log(curr_idx);
                    let h = options.filter((curr_val, curr_idx2, arr) => {
                      return curr_idx2 != curr_idx;
                    });
                    console.log(h);
                    setOptions(h);
                  }}
                >
                  {" "}
                  Delete{" "}
                </button>
              </div>
            );
          })}
        </div>

        <div>
          <input
            type="submit"
            onClick={(e) => {
              e.preventDefault();
              // calling an api here in order to create a cropUser tuples
              fetchData();

            }}
          />
        </div>


        {typeof showOptions === "object"
          ? showOptions.map((curr_val, curr_idx, arr) => {
            return <p style={{ color: "orange" }}> {curr_val}</p>;
          })
          : ""}
      </div>);
  }
}

export default Forms;

// “Fifty degrees is a good benchmark for cool-season crops,” Weston said. “And the soil should be 60 degrees or more for warm-weather plants like tomatoes, peppers and basil. In fact, for tomatoes it should ideally be 65 to 70.”
// https://eos.com/blog/soil-temperature/ What crop is optimal. And recommend changes to change the temperature of soil.
// I have to declare a global variable type context now;
// Next thing I wish to do is if submit is 0 then show all the options the person selected and keep modifiying it. So i will globally declare
// it 🏁
// I want to do the update operation of the crops schema later1
