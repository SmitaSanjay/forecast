import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import { debounce } from 'lodash';
import './Style.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import { Weather } from './Weather';

export default function Home() {

    const [searchValue, setupSearch] = useState('')
    const [list, setList] = useState([])
    const [weatherval, setval] = useState('')
    const [data, getData] = useState([])
    const [temp, getTemp] = useState('')
    const [country, getCountry] = useState([])
    const [isVisible, setIsVisible] = useState(false);


    const debounceSearch = debounce((searchValue) => {
        axios({
            method: 'get',
            url: `https://api.weatherapi.com/v1/search.json?key=3bbe4d8a307e42f7b9e131513232210&q=${searchValue}`
        }).then(res => {
            setList(res.data)
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })
    }, 300);

    const UpdateVal = (e) => {
        setupSearch(e.target.value)
        debounceSearch(searchValue)
    }

    const getWeather = (val) => {
        setval(val)
        axios({
            method: 'get',
            url: `http://api.weatherapi.com/v1/forecast.json?key=3bbe4d8a307e42f7b9e131513232210&q=${val}&days=1&aqi=no&alerts=no`
        }).then(res => {
            getData(res.data.current.condition)
            getCountry(res.data.location)
            getTemp(res.data.current.temp_c)
            console.log(res.data)
        }).catch(e => {
            console.log(e)
        })
        setIsVisible(true);
    }

    const closeWindow = () => {
        setIsVisible(false)
    }

    return (
        <div>
            <div className='container-fluid container-height'>
                <div className='row'>
                    <div className={` ${isVisible ? 'col-3' : 'col-12'} container-height inputBack`}>
                        <div className='weatherHeading'>
                            <div className='heading1 h1 text-center'>World Weather forecast</div>
                            <input className="shadow rounded bg-white py-1 inputPadding border border-white" value={searchValue} onChange={UpdateVal}></input>
                            {
                                list.map(item => {
                                    return (<li className='listStyle' key={item.name}>
                                        <button className='shadow btn btn-sm btn-light' onClick={() => getWeather(item.name)}><strong>{item.name},</strong> {item.region}, {item.country}</button>
                                    </li>)
                                })
                            }
                        </div>

                    </div>
                    <Weather isVisible={isVisible} closeWindow={closeWindow} country={country} temp={temp} data={data}></Weather>
                </div>
            </div>


        </div>
    )
}
